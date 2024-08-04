import { useEffect, useRef, useState } from 'react';
import { TableData } from '../../models/sheetData';

export const useHomeModel = () => {
  const [data, setData] = useState<TableData[]>([]);
  const saveData = useRef<TableData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(10)
  const indexOfLastItem = (currentPage * rowPerPage);
  const indexOfFirstItem = (indexOfLastItem - rowPerPage);
  const currentItems: TableData[] = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / rowPerPage);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const columns = {
    created_dt: 'Created_DT',
    data_source_modified_dt: 'Modifed_DT',
    entity_type: 'Entity',
    operating_status: 'Operating status',
    legal_name: 'Legal name',
    dba_name: 'DBA name',
    physical_address: 'Physical address',
    phone: 'Phone',
    usdot_number: 'DOT',
    mc_mx_ff_number: 'MC/MX/FF',
    power_units: 'Power units',
    out_of_service_date: 'Out of service date'
  }

  const columnsData = [...Object.keys(columns)] 

  function normalizeString(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const searchByName = (term: string) => {
    if(term.length === 0) {
      setData(saveData.current)
      return
    }
    const newItems = saveData.current?.filter(item => {
      return normalizeString(item?.legal_name).includes(normalizeString(term))
    })
    setData(newItems)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber + 1);
  };

  const handleChangeRow = (rowPerPage: number) => {
    setRowPerPage(rowPerPage)
  };

  const fetchData = async () => {
    const spreadsheetId = '1pLhD12Sabatn0021htHx7GFk75lfN0j2BXQq2PWb1VA';
    const sheetId = '1874221723'; 
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${sheetId}`;
  
    try {
      setLoading(true)
      const response = await fetch(url);
      const text = await response.text();
      const rows = text.split('\n').map(row => row.split(','));
      if (rows.length) {
        const headers = rows[0].map(header => header.replace(/"/g, '').trim());
        const jsonData = rows.slice(1).map(row => {
          let rowData = {};
          row.forEach((cell, index) => {
            const header = headers[index];
            if (header) { 
              rowData[header] = cell.replace(/"/g, '').trim(); 
            }
          });
          return rowData;
        });
        saveData.current = jsonData
        setData(jsonData)
      } else {
        setError('No data found')
      }
    } catch (error) {
      setError(`Error fetching data: ${error}`)
    } finally {
      setLoading(false)
    }
  }
    
  useEffect(() => {
    fetchData()
  }, [])  

  return {
    columns,
    currentItems,
    currentPage,
    handlePageChange,
    indexOfLastItem,
    totalPages,
    searchByName,
    columnsData,
    error,
    handleChangeRow,
    rowPerPage,
    loading
  }
}
