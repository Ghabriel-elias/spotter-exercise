import styled from "styled-components";

export const BoxInput = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({theme}) => theme.colors.primaryColor};
  color: ${({theme}) => theme.colors.primaryColor};
  align-items: center;
  height: 3em; 
  padding: 0px 15px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.colors.lightColor};
  margin-right: 15px;
  @media (max-width: 580px) {
    margin-right: 0px;
    height: 2em; 
    padding: 0px 0px 0px 10px;
  }
`;

export const TextInput = styled.input`
  padding: 0px 10px;
  border: none;
  outline: none;
`;