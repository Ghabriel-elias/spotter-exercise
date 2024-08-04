import { useEffect, useRef, useState } from 'react';

export const useHomeModel = () => {
  const [data, setData] = useState([]);
  const saveData = useRef([])
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastItem = (currentPage * 10);
  const indexOfFirstItem = (indexOfLastItem - 10);
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / 10);
  const [error, setError] = useState('')

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    const spreadsheetId = '1pLhD12Sabatn0021htHx7GFk75lfN0j2BXQq2PWb1VA';
    const sheetId = '1874221723'; 
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${sheetId}`;
  
    try {
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
    error
  }
}
