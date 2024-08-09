import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridPaginationModel, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface TableViewProps {
  data: any[];
  columnOrder: string[];
  columnVisibility: GridColumnVisibilityModel;
  onColumnOrderChange: (order: string[], visibilityModel: GridColumnVisibilityModel) => void;
  setPaginationModel: (model: GridPaginationModel) => void;
  paginationModel: GridPaginationModel;
}

export const Table: React.FC<TableViewProps> = ({ data, columnOrder, columnVisibility, paginationModel, onColumnOrderChange, setPaginationModel }) => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>(data);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(columnVisibility);

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

      // Set the initial column visibility model based on the loaded settings
      setColumnVisibilityModel(columnVisibility);
    }
  }, [data, columnOrder, columnVisibility]);

  const handleColumnVisibilityChange = (newVisibilityModel: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(newVisibilityModel);
    const visibleColumns = Object.keys(newVisibilityModel)
      .filter((key) => newVisibilityModel[key] !== false);
    onColumnOrderChange(visibleColumns, newVisibilityModel);
    localStorage.setItem("SAVE_CONFIG_COLUMNS_TABLE", JSON.stringify({ visibleColumns, columnVisibilityModel: newVisibilityModel }));
  };

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 100]}
        paginationModel={{ page: paginationModel.page, pageSize: paginationModel.pageSize }}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
          localStorage.setItem("SAVE_CONFIG_PAGINATION", JSON.stringify(model));
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={handleColumnVisibilityChange}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />
    </Box>
  );
};