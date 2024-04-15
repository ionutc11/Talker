import React from "react";
import styled from "styled-components";
import { ISpacing } from "../interfaces";

interface ITitle extends ISpacing {
  text: string;
}

const StyledH1 = styled.h1<{ margin?: string; padding?: string }>`
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;
  font-weight: bold;
  ${({ margin }) => (margin ? `margin: ${margin};` : "")}
  ${({ padding }) => (padding ? `padding: ${padding};` : "")}
`;

const Title = ({ text, ...rest }: ITitle) => {
  return <StyledH1 {...rest}>{text}</StyledH1>;
};

export default Title;
