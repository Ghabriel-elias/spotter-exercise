import * as S from './style'
import { ColumnItem } from '../../Components/ColumnItem';
import { RowData } from '../../models/sheetData';
import { RowItem } from '../../Components/RowItem';
import { Pagination } from '../../Components/Pagination';
import { useHomeModel } from './model';


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
      <S.Title>Spotter Exercise</S.Title>
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