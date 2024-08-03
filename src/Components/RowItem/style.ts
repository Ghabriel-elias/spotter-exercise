import styled from "styled-components";

export const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: ${({theme}) => theme.colors.bgTable};
  }
`;

export const StyledTd = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};
  min-width: 150px; 
  text-align: center;
`;