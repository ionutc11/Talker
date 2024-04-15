import styled from "styled-components";

const ButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 2.4rem;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.black};
  color: #fff;
  padding: 1.25rem 4.5rem;
  cursor: pointer;
  font-size: 1.4rem;

  border-radius: 1.5rem;
  border: none;
  transition: all 0.3s;

  &:active {
    transform: translateY(3px) scale(0.9);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.darkGray};
    cursor: not-allowed
  }
`;

export {Button, ButtonsContainer};