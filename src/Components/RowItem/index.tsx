import { TableBody, TableRow } from "@mui/material";
import { Row } from "./style"
import { TableData } from "../../models/sheetData";


interface RowItemProps {
  currentItems: TableData[]
}

export const RowItem = ({
  currentItems
}: RowItemProps) => {
  return (
    <div>
      {currentItems.map((row, index) => {
          return (
            <TableRow hover key={index}>
              {Object.values(row).map((item: string, index: number) => {
                return (
                  <Row key={index}>
                    {item}
                  </Row>
                );
              })}
            </TableRow>
          );
        })}
    </div>
  )
}