import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import * as S from './style'

interface PaginationProps {
  currentPage: number;
  indexOfLastItem: number;
  totalPages: number;
  handlePageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  indexOfLastItem,
  totalPages,
  handlePageChange
}: PaginationProps) => {
  return (
    <S.Pagination>
      <S.BoxText>
        <S.Text>Showing  {(10 * currentPage) - 9} - {indexOfLastItem}</S.Text>
      </S.BoxText>
      <S.BoxText>
        <S.Text>Page {currentPage} - {totalPages}</S.Text>
        <S.PaginationButton
          currentPage={currentPage}
          onClick={() => {
            if(currentPage && currentPage <= 1 ) return
            handlePageChange(currentPage - 1)}
          }>
          <FiArrowLeft />
        </S.PaginationButton>
        <S.PaginationButton onClick={() => handlePageChange(currentPage + 1)}>
          <FiArrowRight />
        </S.PaginationButton>
      </S.BoxText>
    </S.Pagination>
  )
}