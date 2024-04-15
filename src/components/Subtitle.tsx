import React from "react";
import styled from "styled-components";
import { ISpacing } from "../interfaces";

interface ISubtitle extends ISpacing {
  text: string;
}

const StyledH2 = styled.h2<{ margin?: string; padding?: string }>`
  font-size: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  font-weight: 300;
  ${({ margin }) => (margin ? `margin: ${margin};` : "")}
  ${({ padding }) => (padding ? `padding: ${padding};` : "")}
`;

const Subtitle = ({ text, ...rest }: ISubtitle) => {
  return <StyledH2 {...rest}>{text}</StyledH2>;
};

export default Subtitle;
