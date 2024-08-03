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

export const TableWrapper = styled.div`
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

`;

export const Title = styled.h1`
  font-size: 2em;
  color: ${({theme}) => theme.colors.colorText};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TextFilter = styled.p`
  font-size: 1.3em;
  color: ${({theme}) => theme.colors.colorText};
`;