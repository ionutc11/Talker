import React, { useContext } from "react";
import styled from "styled-components";

import addPersonLogo from "../../assets/addperson.svg";
import avatarLogo from "../../assets/avatar.svg";
import settingsLogo from "../../assets/settings.svg";
import questionsLogo from "../../assets/questions.svg";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../../context/user-context";

const StyledContainer = styled.div`
  background: ${({ theme }) => theme.colors.gray};
  width: 100%;
  min-width: fit-content;
  height: 6rem;
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const Logo = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
`;

const RightSide = styled.div`
  margin-left: auto;
  display: flex;
  gap: 3.4rem;
  align-items: center;
`;

const Name = styled.div`
  margin-left: -2.8rem;
  font-size: 1.6rem;
`;

const Navbar = () => {
  const userDetails = useContext(UserDetailsContext);

  return (
    <StyledContainer>
      <Logo>Talker.</Logo>
      <RightSide>
        <Link to={"#"}>
          <img
            src={addPersonLogo}
            style={{
              background: "#C4C4C4",
              padding: ".65rem",
              borderRadius: "100%",
            }}
            className="logo react"
            alt="React logo"
          />
        </Link>
        <Link to={"#"}>
          <img src={settingsLogo} className="logo react" alt="React logo" />
        </Link>
        <Link to={"#"}>
          <img src={questionsLogo} className="logo react" alt="React logo" />
        </Link>
        <Link to={"#"}>
          <img src={avatarLogo} className="logo react" alt="React logo" />
        </Link>
        <Name>{userDetails?.username}</Name>
      </RightSide>
    </StyledContainer>
  );
};

export default Navbar;
