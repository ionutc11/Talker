/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import emptyHead from "../../assets/emptyhead.svg";
import dots from "../../assets/dots.svg";
import elipse from "../../assets/elipse.svg";
import send from "../../assets/send.svg";
import { CustomInput, InputContainer } from "../../components/input/style";
import { UserDetailsContext } from "../../context/user-context";
import { SocketContext } from "../../context/socket-contex";
import { MessageServerConstants } from "../../constants";
import { INewMessageRes } from "../../interfaces";
import Message from "../../components/message/Message";
import {
  MessagesContext,
  MessagesDispatchContext,
} from "../../context/message-context";

const StyledContainer = styled.div`
  width: 65%;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 1rem;
  min-height: 50rem;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 5rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};
`;

const Bottom = styled.div`
  height: 5rem;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.darkGray};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;

  margin-bottom: -0.4rem;
  display: flex;
`;

const MessageContainer = styled.div`
  height: 100%;
`;

const Name = styled.p`
  margin-left: 1rem;
  font-size: 1.6rem;
`;

const NoMessageSelected = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Messagery = () => {
  const [text, setText] = useState("");
  const userDetails = useContext(UserDetailsContext);
  const { messageSocket } = useContext(SocketContext);
  const updateMessages = useContext(MessagesDispatchContext);
  const messagesFromContacts = useContext(MessagesContext);

  const sendMessage = () => {
    messageSocket.emit(MessageServerConstants.SEND_MESSAGE, {
      receiverId: userDetails?.selectedContact?.id,
      message: text,
    });

    setText("");
  };

  const onMessage = (data: INewMessageRes) => {
    const { messages } = data;
    const usernameWeAreChattingWith =
      data.newMessage.from !== userDetails?.username
        ? data.newMessage.from
        : data.newMessage.to;

    updateMessages?.({
      username: usernameWeAreChattingWith,
      messages: messages,
    });
  };

  useEffect(() => {
    messageSocket.on(MessageServerConstants.MESSAGE_IN_ROOM, onMessage);

    return () =>
      messageSocket.removeListener(
        MessageServerConstants.MESSAGE_IN_ROOM,
        onMessage
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer>
      <Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={emptyHead} />
          <Name>{userDetails?.selectedContact?.username}</Name>
        </div>
        <img src={dots} />
      </Header>
      <MessageContainer>
        {!userDetails?.selectedContact && (
          <NoMessageSelected>
            <img src={elipse} />
          </NoMessageSelected>
        )}
        {userDetails?.selectedContact &&
          messagesFromContacts?.[userDetails?.selectedContact?.username]?.map(
            (message, idx) => (
              <Message
                key={`message-no-${idx}`}
                message={message.message}
                received={message.from !== userDetails?.username}
              />
            )
          )}
      </MessageContainer>
      <Bottom>
        <InputContainer width="80%">
          <CustomInput
            style={{ height: "2.6rem" }}
            placeholder="Send a message"
            value={text}
            disabled={!userDetails?.selectedContact}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </InputContainer>
        <SendButton disabled={!text} onClick={sendMessage}>
          <img src={send} className="logo react" alt="React logo" />
        </SendButton>
      </Bottom>
    </StyledContainer>
  );
};

export default Messagery;
