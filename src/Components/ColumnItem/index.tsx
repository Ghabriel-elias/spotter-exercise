import { StyledTh } from "./style"

interface ColumnItemProps {
  index: number;
  text: string;
}

export const ColumnItem = ({
  index,
  text
}: ColumnItemProps) => {
  return (
    <StyledTh key={index}>{text}</StyledTh>
  )
}