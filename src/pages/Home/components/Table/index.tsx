import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface TableViewProps {
  data: any[];
  columnOrder: string[];
  columnSize: { [key: string]: number };
  onColumnSizeChange: (sizes: { [key: string]: number }) => void;
  onColumnOrderChange: (order: string[]) => void;
}

export const Table: React.FC<TableViewProps> = ({ data, columnOrder, columnSize, onColumnSizeChange, onColumnOrderChange }) => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>(data);

  useEffect(() => {
    if (data.length) {
      const cols = Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.toUpperCase(),
        width: columnSize[key] || 150,
        editable: key.includes('date'), 
      }));

      const orderedCols = columnOrder.length
        ? columnOrder.map(field => cols.find(col => col.field === field)!).filter(Boolean)
        : cols;

      setColumns(orderedCols);
    }
  }, [data, columnOrder, columnSize]);

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onColumnOrderChange={(newOrder) => onColumnOrderChange(newOrder)}
        onColumnSizeChange={(sizes) => onColumnSizeChange(sizes)}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />
    </Box>
  );
};
