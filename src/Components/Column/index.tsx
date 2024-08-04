import { TableRow } from "@mui/material";
import { Cell } from "./style"

interface ColumnProps {
  columnsData: string[];
  columns: any
}

export const Column = ({
  columns,
  columnsData
}: ColumnProps) => {
  return (
    <TableRow>
      {columnsData.map((column) => (
        <Cell>
          {columns[column]}
        </Cell>
      ))}
    </TableRow>
  )
}