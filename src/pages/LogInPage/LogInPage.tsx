import React, { useContext } from "react";
import GrayBox from "../../components/styles/GrayBox";
import styled from "styled-components";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonsContainer } from "../../components/Button";
import { UserDetailsDispatchContext } from "../../context/user-context";
import { SocketContext } from "../../context/socket-contex";
import { MessageServerConstants } from "../../constants";

const Container = styled.section`
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  line-height: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

interface LoginFormValues {
  username: string;
  password: string;
}

const LogInPage = () => {
  const navigate = useNavigate();
  const updateUserDetails = useContext(UserDetailsDispatchContext);
  const { messageSocket } = useContext(SocketContext);

  const defaultVals = {
    username: "",
    password: "",
  };
  const methods = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: defaultVals,
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data: LoginFormValues) => {
    updateUserDetails?.({ username: data.username, selectedContact: null });
    messageSocket.emit(MessageServerConstants.IDENTIFY, {
      username: data.username,
    });
    navigate("/chat");
  };

  return (
    <Container>
      <GrayBox>
        <Title text="Talker." margin="0 0 1rem" />
        <Subtitle text="Log in to your account" margin="0 0 4rem" />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            control={methods.control}
            name={"username"}
            label={"Email or username"}
            placeholder="Username or Email Address"
            type={"text"}
            required
          />
          <Input
            control={methods.control}
            name={"password"}
            label={"Password"}
            placeholder="Password"
            type={"password"}
            // required
          />
          <StyledLink to={"#"}>Forget Password?</StyledLink>
          <ButtonsContainer>
            <Button type="submit">Log in</Button>
          </ButtonsContainer>
        </form>
      </GrayBox>
    </Container>
  );
};

export default LogInPage;
