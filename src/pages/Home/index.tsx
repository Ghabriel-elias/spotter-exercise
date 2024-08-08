import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useData } from '../../hooks/useData';
import { BarChart } from './components/BarChart';
import { Loading } from './components/Loading';
import { SaveConfigModal } from './components/SaveConfigModal';
import { Table } from './components/Table';

export const Home = () => {
  const { data, loading } = useData();
  const [openModal, setOpenModal] = useState(false);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnSize, setColumnSize] = useState<{ [key: string]: number }>({});

  const handleSave = (name: string) => {
    localStorage.setItem(name, JSON.stringify({ columnOrder, columnSize }));
  };

  const handleLoad = (name: string) => {
    const savedConfig = localStorage.getItem(name);
    if (savedConfig) {
      const { columnOrder, columnSize } = JSON.parse(savedConfig);
      setColumnOrder(columnOrder);
      setColumnSize(columnSize);
    }
  };

  if(loading) {
    return (
      <Loading/>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <>
        <Table
          data={data}
          columnOrder={columnOrder}
          columnSize={columnSize}
          onColumnSizeChange={setColumnSize}
          onColumnOrderChange={setColumnOrder}
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
      </>
    </Box>
  );
};