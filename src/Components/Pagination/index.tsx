import { TablePagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  rowPerPage: number;
  handleChangeRow: (row: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  handleChangeRow,
  rowPerPage
}: PaginationProps) => {
  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={totalPages}
      rowsPerPage={rowPerPage}
      page={currentPage - 1}
      onPageChange={(event, page) => {
        handlePageChange(page)
      }}
      onRowsPerPageChange={(event) => {
        handleChangeRow(Number(event.target.value))
      }}
    />
  )
}