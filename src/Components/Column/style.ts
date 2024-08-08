import styled from "styled-components";

export const Cell = styled.p`
  color: ${({theme}) => theme.colors.lightColor};
  text-align: center;
`;

export const Item = styled.div`
  background-color: ${({theme}) => theme.colors.primaryColor};
  color: ${({theme}) => theme.colors.lightColor};
  display: flex;
  padding: 8px;
  width: 200px;
  align-items: center; 
`;