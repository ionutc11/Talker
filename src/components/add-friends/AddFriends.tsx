import React, { useState } from "react";
import Title from "../Title";
import GrayBox from "../styles/GrayBox";
import { Button } from "../Button";
import styled from "styled-components";
import { CustomInput, InputContainer } from "../input/style";

const StyledParagraph = styled.p`
  text-align: center;
  margin-bottom: 4rem;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3.2rem;
  margin-top: 20rem;
`;

const AddFriends = ({
  handleAddFriend,
}: {
  handleAddFriend: (friend: string) => void;
}) => {
  const [friend, setFriend] = useState("");
  return (
    <GrayBox style={{ padding: "0 6rem" }}>
      <Title margin="3.8rem 0 1rem 0" text="Add your friends to Talker." />
      <StyledParagraph>
        Connect with your family and friends easily, anywhere, anytime.
      </StyledParagraph>
      <InputContainer width="100%">
        <CustomInput
          name="friend"
          value={friend}
          onChange={(event) => setFriend(event.target.value)}
        />
      </InputContainer>
      <CenterContainer>
        <Button onClick={() => handleAddFriend(friend)} disabled={!friend}>
          Add
        </Button>
      </CenterContainer>
    </GrayBox>
  );
};

export default AddFriends;
