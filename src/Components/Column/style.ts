import { TableCell } from "@mui/material";
import styled from "styled-components";

export const Cell = styled(TableCell)`
  background-color: ${({theme}) => theme.colors.primaryColor};
  color: ${({theme}) => theme.colors.lightColor};
  text-align: center;
  padding: 10px;
  min-width: 150px;
`;
