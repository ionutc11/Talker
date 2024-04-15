import React from "react";
import ChatList from "./ChatList";
import Messagery from "./Messagery";
import Contacts from "./Contacts";
import styled from "styled-components";

const StyledContained = styled.section`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const ChatContent = () => {
  return (
    <StyledContained>
      <ChatList />
      <Messagery />
      <Contacts />
    </StyledContained>
  );
};

export default ChatContent;
