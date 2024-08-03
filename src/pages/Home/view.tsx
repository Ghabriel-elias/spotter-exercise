import * as S from './style'
import { ColumnItem } from '../../Components/ColumnItem';
import { RowData } from '../../models/sheetData';
import { RowItem } from '../../Components/RowItem';
import { Pagination } from '../../Components/Pagination';
import { useHomeModel } from './model';
import styled from 'styled-components';
import { RiFilter3Line } from 'react-icons/ri';


export const HomeView = ({
  data,
  columns,
  currentItems,
  currentPage,
  handlePageChange,
  indexOfLastItem,
  totalPages
}: ReturnType<typeof useHomeModel>) => {

  return (
    <S.Container>
      <HeaderContainer>
       <S.Title>Spotter Exercise</S.Title>
       <BoxIconText onClick={() => {
        console.log('te')
       }}>

        <RiFilter3Line color='#333333' size={25}/>
        <S.TextFilter>Filter</S.TextFilter>
       </BoxIconText>

      </HeaderContainer>
      <S.TableWrapper>
        <S.StyledTable>
        <thead>
          <tr>
            {data[0] && data[0]?.map((header: keyof typeof columns, index: number) => (
              <ColumnItem index={index} text={columns[header] || ''}/>
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
  background-color: #B2B2B2;
  border: 0px;
  padding: 0px 10px;
  border-radius: 8px;
  height: 3rem;
  cursor: pointer;
`;