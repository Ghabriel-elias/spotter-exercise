import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useData } from '../../hooks/useData';
import { Loading } from './components/Loading';
import { SaveConfigModal } from './components/SaveConfigModal';
import { Table } from './components/Table';
import BarChart from './components/BarChart';
import { GridPaginationModel, GridColumnVisibilityModel } from '@mui/x-data-grid';

export const Home = () => {
  const { data, loading } = useData();
  const [openModal, setOpenModal] = useState(false);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({});
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ pageSize: 10, page: 1 });

  const handleSave = (name: string) => {
    const config = {
      columnOrder,
      columnVisibility,
      paginationModel,
    };
    localStorage.setItem(name, JSON.stringify(config));
  };

  const handleLoad = (name: string) => {
    const savedConfig = localStorage.getItem(name);
    if (savedConfig) {
      const { columnOrder, columnVisibility, paginationModel } = JSON.parse(savedConfig);
      setColumnOrder(columnOrder);
      setColumnVisibility(columnVisibility);
      setPaginationModel(paginationModel);
    }
  };

  useEffect(() => {
    const storageColumns = localStorage.getItem('SAVE_CONFIG_COLUMNS_TABLE');
    if (storageColumns) {
      const { visibleColumns, columnVisibilityModel } = JSON.parse(storageColumns);
      setColumnOrder(visibleColumns);
      setColumnVisibility(columnVisibilityModel);
    }

    const storagePaginationModel = localStorage.getItem('SAVE_CONFIG_PAGINATION');
    if (storagePaginationModel) {
      const paginationModel = JSON.parse(storagePaginationModel);
      setPaginationModel(paginationModel);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Table
        data={data}
        columnOrder={columnOrder}
        columnVisibility={columnVisibility}
        onColumnOrderChange={(order, visibilityModel) => {
          setColumnOrder(order);
          setColumnVisibility(visibilityModel);
        }}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
      />
      <BarChart data={data} />
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Save/Load View
      </Button>
      <SaveConfigModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        onLoad={handleLoad}
      />
    </Box>
  );
};
