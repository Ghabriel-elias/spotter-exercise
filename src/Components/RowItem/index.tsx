import { RowData } from "../../models/sheetData";
import { StyledTd, StyledTr } from "./style"


interface RowItemProps {
  rowIndex: number;
  row: RowData;
}

export const RowItem = ({
  row,
  rowIndex
}: RowItemProps) => {
  return (
    <StyledTr key={rowIndex}>
      {Object.values(row).map((item, index) => (
        <StyledTd key={index}>{item}</StyledTd>
      ))}
    </StyledTr>
  )
}