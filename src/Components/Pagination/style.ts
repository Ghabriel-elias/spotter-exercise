import styled, {css} from "styled-components";

export const Pagination = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.colors.secundaryColor};
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: 0 -2px 5px ${({theme}) => theme.colors.shadowColor};
`;

export const BoxText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.p`
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.colorText};
  margin: 0px;
`;

interface PaginationButton {
  currentPage?: number;
}

export const PaginationButton = styled.button<PaginationButton>`
  padding: 10px;
  margin-left: 10px;
  border: 1px solid ${({theme}) => theme.colors.primaryColor};
  background-color: ${({theme}) => theme.colors.lightColor};
  color: ${({theme}) => theme.colors.primaryColor};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({theme}) => theme.colors.hoverColor};
    color: ${({theme}) => theme.colors.lightColor};
  }
  ${({theme, currentPage}) =>
    currentPage && currentPage <= 1 &&
    css`
      border: 1px solid ${theme.colors.disableButtonColor};
      background-color: ${theme.colors.disableButtonColor};
      color: ${theme.colors.iconDisableColor};
      &:hover {
        background-color: ${theme.colors.disableButtonColor};
        color: ${theme.colors.iconDisableColor};
      }
    `
  }
`;