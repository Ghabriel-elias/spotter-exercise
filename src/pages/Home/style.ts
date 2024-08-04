import { TableContainer } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  width: 98%;
  margin: 0 auto;
  padding: 20px;
  padding-top: 0px;
  background-color: ${({theme}) => theme.colors.secundaryColor};
  box-shadow: 0 0 10px ${({theme}) => theme.colors.shadowColor};
  border-radius: 10px;
  height: 95vh;
  position: relative; 
  overflow: hidden; 
  box-sizing: border-box; 
`;

export const TableContent = styled(TableContainer)`
  max-height: calc(80vh - 3rem);
  overflow-y: auto;
  overflow-x: auto; 
  box-sizing: border-box;
  position: relative;
  overflow-x: auto; 
  scrollbar-width: thin; 
  scrollbar-color: ${({theme}) => theme.colors.primaryColor} ${({theme}) => theme.colors.secundaryColor}; 
  &::-webkit-scrollbar {
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.colors.primaryColor};;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${({theme}) => theme.colors.secundaryColor};
    border-radius: 10px;
  }
  @media (max-width: 680px) {
    max-height: calc(75vh - 3rem);
  }
`;

export const Title = styled.h1`
  font-size: 2em;
  color: ${({theme}) => theme.colors.colorText};
  @media (max-width: 580px) {
    font-size: 1.5em;
  }
`;

export const BoxInputAndFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;