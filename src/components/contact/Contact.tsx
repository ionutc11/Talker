import React from "react";
import emptyHead from "../../assets/emptyhead.svg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};

  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.darkGray};
  }
`;

const StyledName = styled.p<{ selected?: boolean }>`
  font-size: 1.6rem;
  font-weight: ${({ selected }) => (selected ? "600" : "500")};

  div {
    font-size: 1rem;
    font-style: italic;
  }
`;

interface IContact {
  selected?: boolean;
  username: string;
  message?: string;
  onClick: () => void;
}

const Contact = ({ selected, username, onClick, message }: IContact) => {
  return (
    <Container onClick={onClick}>
      <img style={{ width: "4rem", height: "4rem" }} src={emptyHead} />
      <StyledName selected={selected}>
        @{username}
        {message && <div>{message}</div>}
      </StyledName>
    </Container>
  );
};

export default Contact;
