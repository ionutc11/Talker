import React from "react";
import GrayBox from "../styles/GrayBox";
import Title from "../Title";
import styled from "styled-components";
import { Button } from "../Button";

const StyledParagraph = styled.p`
  text-align: center;
  margin-bottom: 4rem;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3.2rem;
`;

const Welcome = ({ handleContinue }: { handleContinue: () => void }) => {
  return (
    <GrayBox>
      <Title margin="12rem 0 1rem 0" text="Welcome to Talker." />
      <StyledParagraph>
        Connect with your family and friends easily, anywhere, anytime.
      </StyledParagraph>
      <CenterContainer>
        <Button onClick={handleContinue}>Continue</Button>
      </CenterContainer>
    </GrayBox>
  );
};

export default Welcome;
