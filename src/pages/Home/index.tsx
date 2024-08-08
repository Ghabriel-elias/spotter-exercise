import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useData } from '../../hooks/useData';
import { Loading } from './components/Loading';
import { SaveConfigModal } from './components/SaveConfigModal';
import { Table } from './components/Table';
import BarChart from './components/BarChart';
import { GridPaginationModel } from '@mui/x-data-grid';

export const Home = () => {
  const { data, loading } = useData(); 
  const [openModal, setOpenModal] = useState(false); 
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({pageSize: 10, page: 1})

  const handleSave = (name: string) => {
    localStorage.setItem(name, JSON.stringify({ columnOrder }));
  };

  const handleLoad = (name: string) => {
    const savedConfig = localStorage.getItem(name);
    if (savedConfig) {
      const { columnOrder, paginationModel } = JSON.parse(savedConfig);
      setColumnOrder(columnOrder);
      setPaginationModel(paginationModel)
    }
  };

  useEffect(() => {
    const storageColumns = localStorage.getItem('SAVE_CONFIG_COLUMNS_TABLE')
    if(storageColumns) {
      const {visibleColumns} = JSON.parse(storageColumns)
      setColumnOrder(visibleColumns)
    }
    const storagepaginationModel = localStorage.getItem('SAVE_CONFIG_PAGINATION')
    if(storagepaginationModel) {
      const paginationModel = JSON.parse(storagepaginationModel)
      setPaginationModel(paginationModel)
    }
  }, [])

  if (loading) {
    return <Loading />; 
  }

  return (
    <Box sx={{ p: 4 }}>
      <>
        <Table
          data={data}
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
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
      </>
    </Box>
  );
};
