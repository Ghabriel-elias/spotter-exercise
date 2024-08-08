import * as S from './style'
import { Column } from '../../Components/Column';
import { Pagination } from '../../Components/Pagination';
import { useHomeModel } from './model';
import { Table, TableHead} from '@mui/material'
import {Loading} from '../../Components/Loading';
import { Input } from '../../Components/Input';
import { RowItem } from '../../Components/RowItem';
import { Filter } from '../../Components/Filter';
import { EmptySearch } from '../../Components/EmptySearch';

export const HomeView = ({
  currentItems,
  currentPage,
  handlePageChange,
  totalPages,
  searchByName,
  columnsData,
  rowPerPage,
  handleChangeRow,
  loading,
  handleClose,
  handleMenuItemClick,
  handleToggle,
  open,
  options,
  selectedIndex,
  anchorRef,
}: ReturnType<typeof useHomeModel>) => {

  if(loading) {
    return (
      <Loading/>
    )
  }

  return (
    <S.Container>
      <S.HeaderContainer>
       <S.Title>Spotter Exercise</S.Title>
       <S.BoxInputAndFilter>
          <Input searchByName={searchByName}/>
          <Filter 
            anchorRef={anchorRef}
            handleClose={handleClose}
            handleMenuItemClick={handleMenuItemClick}
            handleToggle={handleToggle}
            open={open}
            options={options}
            selectedIndex={selectedIndex}
          />
        </S.BoxInputAndFilter>
      </S.HeaderContainer>
      <S.TableContent>
        <Table stickyHeader>
          <TableHead>
            <Column
              columnsData={columnsData}
            />
          </TableHead>    
          <RowItem
            currentItems={currentItems}
          />
        </Table>
        {currentItems.length === 0 ? (
          <EmptySearch/>
        ) : null}
      </S.TableContent>
      <Pagination
        currentPage={currentPage}
        handleChangeRow={handleChangeRow}
        handlePageChange={handlePageChange}
        rowPerPage={rowPerPage}
        totalPages={totalPages}
      />
    </S.Container>
  )
}