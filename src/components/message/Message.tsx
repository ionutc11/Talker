import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div<{ received?: boolean }>`
  padding: 1rem;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.colors.darkGray};
  margin: 2rem;
  width: fit-content;
  max-width: 40%;
  height: auto;
  border-radius: 1rem;
  ${({ received }) => (!received ? "margin-left: auto" : "")};
`;

interface IMessageComponent {
  message: string;
  received?: boolean;
}

const Message = ({ message, received }: IMessageComponent) => {
  return <StyledContainer received={received}>{message}</StyledContainer>;
};

export default Message;
