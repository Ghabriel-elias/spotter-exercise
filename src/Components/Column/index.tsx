import { TableRow } from "@mui/material";
import { Cell, Item } from "./style"
import { ArrowDropDown } from "@mui/icons-material";

interface ColumnProps {
  columnsData: string[];
}

export const Column = ({
  columnsData
}: ColumnProps) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      {columnsData.map((column) => (
        <Item>
          <button>
           <ArrowDropDown/>
          </button>
          <Cell>
            {column}
          </Cell>
        </Item>
      ))}
    </div>
  )
}