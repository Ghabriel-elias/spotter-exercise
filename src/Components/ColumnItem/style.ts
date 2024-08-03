import styled from "styled-components";

export const StyledTh = styled.th`
  background-color: ${({theme}) => theme.colors.primaryColor};
  color: white;
  padding: 10px;
  font-size: 1.2em;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  min-width: 150px;
  &:first-child {
    border-top-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
  }
`;
