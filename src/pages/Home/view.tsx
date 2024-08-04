import * as S from './style'
import { ColumnItem } from '../../Components/ColumnItem';
import { RowData } from '../../models/sheetData';
import { RowItem } from '../../Components/RowItem';
import { Pagination } from '../../Components/Pagination';
import { useHomeModel } from './model';
import styled from 'styled-components';
import { RiFilter3Line } from 'react-icons/ri';
import theme from '../../global/theme';
import { FiSearch } from 'react-icons/fi';


export const HomeView = ({
  columns,
  currentItems,
  currentPage,
  handlePageChange,
  indexOfLastItem,
  totalPages,
  searchByName,
  columnsData
}: ReturnType<typeof useHomeModel>) => {
  
  return (
    <S.Container>
      <HeaderContainer>
       <S.Title>Spotter Exercise</S.Title>
       <BoxInputAndFilter>
        <BoxInput>
          <FiSearch  />
          <Input
            placeholder='Search Legal name'
            onChange={(e) => searchByName(e.target.value)}
          />
        </BoxInput>
        <BoxIconText onClick={() => {}}>
          <RiFilter3Line size={25}/>
          <S.TextFilter>Filter</S.TextFilter>
        </BoxIconText>
       </BoxInputAndFilter>

      </HeaderContainer>
      <S.TableWrapper>
        <S.StyledTable>
        <thead>
          <tr>
            {columnsData?.map((item: string, index) => (
              <ColumnItem index={index} text={columns[item] || ''}/>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row: RowData, rowIndex) => (
            <RowItem row={row} rowIndex={rowIndex}/>
          ))}
        </tbody>
      </S.StyledTable>
      </S.TableWrapper>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        indexOfLastItem={indexOfLastItem}
        totalPages={totalPages}
      />
    </S.Container>
  )
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BoxIconText = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border: 1px solid ${theme.colors.primaryColor};
  background-color: ${({theme}) => theme.colors.lightColor};
  padding: 0px 10px;
  color: ${({theme}) => theme.colors.primaryColor};
  border-radius: 8px;
  height: 3rem;
  cursor: pointer;
  &:hover {
    background-color: ${({theme}) => theme.colors.primaryColor};
    color: ${({theme}) => theme.colors.lightColor};
  }
`;

export const BoxInput = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${theme.colors.primaryColor};
  color: ${theme.colors.primaryColor};
  align-items: center;
  height: 3em; 
  padding: 0px 15px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.colors.lightColor};
  margin-right: 15px;
`;

export const Input = styled.input`
  padding: 0px 10px;
  border: none;
  outline: none;
`;

export const BoxInputAndFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;