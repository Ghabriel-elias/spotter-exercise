import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Text = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: ${({theme}) => theme.colors.colorText};
`;