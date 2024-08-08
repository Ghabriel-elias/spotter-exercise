import React, { useState, useEffect, useRef } from 'react';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridPaginationModel, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface TableViewProps {
  data: any[];
  columnOrder: string[];
  onColumnOrderChange: (order: string[]) => void;
  setPaginationModel: (pageSize: GridPaginationModel) => void;
  paginationModel: GridPaginationModel;
}

export const Table: React.FC<TableViewProps> = ({ data, columnOrder, paginationModel, onColumnOrderChange, setPaginationModel }) => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>(data);

  useEffect(() => {
    if (data.length) {
      const cols = Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.toUpperCase(),
        width: 150,
        editable: key.includes('date'), 
      }));

      const orderedCols = columnOrder.length
        ? columnOrder.map(field => cols.find(col => col.field === field)!).filter(Boolean)
        : cols;

      setColumns(orderedCols);
    }
  }, [data]);

  const handleColumnVisibilityChange = (newVisibilityModel: GridColumnVisibilityModel) => {
    const visibleColumns = columns
      .filter(col => newVisibilityModel[col.field] !== false)
      .map(col => col.field);
    onColumnOrderChange(visibleColumns);
    localStorage.setItem("SAVE_CONFIG_COLUMNS_TABLE", JSON.stringify({visibleColumns}));
  };

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 100]} 
        paginationModel={{page: paginationModel.page, pageSize: paginationModel.pageSize}}
        onPaginationModelChange={(model) => {
          setPaginationModel(model)
          localStorage.setItem("SAVE_CONFIG_PAGINATION", JSON.stringify(model));
        }}
        onColumnVisibilityModelChange={handleColumnVisibilityChange}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />
    </Box>
  );
};
