import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SocketContext } from "../../context/socket-contex";
import { MessageServerConstants } from "../../constants";
import { IConnectedUsersRes, IUser } from "../../interfaces";
import Contact from "../../components/contact/Contact";
import {
  UserDetailsContext,
  UserDetailsDispatchContext,
} from "../../context/user-context";

const StyledContainer = styled.div`
  padding: 2.8rem 1.2rem;
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

const Contacts = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const { messageSocket } = useContext(SocketContext);
  const setUserDetails = useContext(UserDetailsDispatchContext);
  const userDetails = useContext(UserDetailsContext);

  const onConnectedUsers = (data: IConnectedUsersRes) => {
    const { onlineUsers, users } = data;
    setUsers(users);
    setOnlineUsers(onlineUsers);
  };

  useEffect(() => {
    messageSocket.on(MessageServerConstants.CONNECTED_USERS, onConnectedUsers);

    return () =>
      messageSocket.removeListener(
        MessageServerConstants.CONNECTED_USERS,
        onConnectedUsers
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContactClick = (user: IUser) => {
    setUserDetails?.({
      selectedContact: user,
    });

    messageSocket.emit(MessageServerConstants.CONNECT_2, {
      guestId: user.id,
    });
  };

  return (
    <StyledContainer>
      <StyledHeading>
        Contacts: {onlineUsers > 0 ? onlineUsers - 1 : 0}
      </StyledHeading>
      {users
        .filter((user) => user.username !== userDetails?.username)
        .map((user) => (
          <Contact
            onClick={() => handleContactClick(user)}
            selected={userDetails?.selectedContact?.id === user.id}
            username={user.username}
            key={user.id}
          />
        ))}
    </StyledContainer>
  );
};

export default Contacts;
