import { Button, ButtonGroup } from "@mui/material";
import styled from "styled-components";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const FilterContent = styled(ButtonGroup)`
  height: 3em;
  border: 1px solid ${({theme}) => theme.colors.primaryColor};
  border-radius: 8px;
  overflow: hidden;
  outline: none;
`;

export const ButtonFilter = styled(Button)`
  background-color: ${({theme}) => theme.colors.lightColor};
  color: ${({theme}) => theme.colors.primaryColor};
  border: none;
  outline: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightColor};
    border: none;
  }
`;

export const Icon = styled(ArrowDropDownIcon)`
  color: ${({theme}) => theme.colors.primaryColor};
`;

export const ButtonText = styled(Button)`
  background-color: ${({theme}) => theme.colors.lightColor};
  border: none;
  outline: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightColor};
    border: none;
  }
`;