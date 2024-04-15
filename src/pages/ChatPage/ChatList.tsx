import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CustomInput, InputContainer } from "../../components/input/style";
import {
  UserDetailsContext,
  UserDetailsDispatchContext,
} from "../../context/user-context";
import { SocketContext } from "../../context/socket-contex";
import { MessageServerConstants } from "../../constants";
import { IChatListRes, ILastChat } from "../../interfaces";
import Contact from "../../components/contact/Contact";

const Container = styled.div`
  padding: 2.8rem 1.2rem;
  height: 100%;
  width: 30rem;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 1rem;
`;

const StyledHeading = styled.p`
  font-size: 2.3rem;
  line-height: 2.3rem;
  font-weight: 500;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};
`;

const ChatList = () => {
  const [lastChats, setLastChats] = useState<ILastChat[]>([]);
  const { messageSocket } = useContext(SocketContext);
  const userDetails = useContext(UserDetailsContext);
  const [newLastChat, setNewLastChat] = useState<ILastChat | null>(null);
  const updateUserDetails = useContext(UserDetailsDispatchContext);

  const onChatListChange = (data: IChatListRes) => {
    const { lastMessage, users } = data;
    const lastChatUser = users
      // .filter((lc) => !!lc)
      .find((user) => user?.username !== userDetails?.username);

    if (!lastChatUser) {
      console.log("Couldn't find the sender");
      return;
    }

    const newLastChat = { lastMessage, user: lastChatUser };

    setNewLastChat(newLastChat);
  };

  const addToLastChat = (lastChatToAdd: ILastChat) => {
    const lastChatIndex = lastChats
      // .filter((lc) => !!lc)
      .findIndex((lastChat) => lastChat?.user.id === lastChatToAdd?.user.id);
    if (lastChatIndex === -1) {
      setLastChats((prev) => [lastChatToAdd, ...prev]);
    } else {
      const localLastChats = lastChats;
      delete localLastChats[lastChatIndex];
      setLastChats([lastChatToAdd, ...localLastChats]);
    }
  };

  useEffect(() => {
    if (newLastChat) {
      addToLastChat(newLastChat);
    }
  }, [newLastChat]);

  useEffect(() => {
    messageSocket.on(MessageServerConstants.CHAT_LISTS, onChatListChange);

    return () =>
      messageSocket.removeListener(
        MessageServerConstants.CHAT_LISTS,
        onChatListChange
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <StyledHeading>Recent chats</StyledHeading>
      <InputContainer width="100%">
        <CustomInput placeholder="Search..." />
        {lastChats
          .filter((lc) => !!lc)
          .map((lc) => (
            <Contact
              {...lc.user}
              key={lc.user.id}
              onClick={() => {
                updateUserDetails?.({ selectedContact: lc.user });
              }}
              message={lc.lastMessage.message}
            />
          ))}
      </InputContainer>
    </Container>
  );
};

export default ChatList;
