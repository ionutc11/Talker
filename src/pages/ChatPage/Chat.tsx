import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import styled from "styled-components";
import Welcome from "../../components/welcome/Welcome";
import AddFriends from "../../components/add-friends/AddFriends";
import ChatContent from "./ChatContent";

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2.3rem;

  display: flex;
  justify-content: center;
`;

const Chat = () => {
  const [step, setStep] = useState(0);

  const increaseStep = () => setStep((prevStep) => prevStep + 1);
  const handleAddFriend = (friend: string) => {
    increaseStep();
    console.log("Adding frined", friend);
  };

  const renderStep = () => {
    return <ChatContent />;
    switch (step) {
      case 0:
        return <Welcome handleContinue={increaseStep} />;
      case 1:
        return <AddFriends handleAddFriend={handleAddFriend} />;
      case 2:
        return <ChatContent />;
      default:
        <Welcome handleContinue={increaseStep} />;
    }
  };

  return (
    <section>
      <Navbar />
      <Content>{renderStep()}</Content>
    </section>
  );
};

export default Chat;
