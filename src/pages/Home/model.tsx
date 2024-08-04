import { useEffect, useRef, useState } from 'react';
import { TableData } from '../../models/sheetData';
import Papa from 'papaparse';

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
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const options = ['Most recent creation date', 'Oldest creation date', 'Operating Status: Authorized ', 'Operating Status: Not Authorized '];

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

  const handleMenuItemClick = (index: number) => {
    if(selectedIndex === index) {
      setSelectedIndex(null)
      setOpen(false)
      return
    }
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const searchByName = (term: string) => {
    if(term.length === 0) {
      setData(saveData.current)
      return
    }
    const newItems = saveData.current?.filter(item => {
      return normalizeString(item?.legal_name).includes(normalizeString(term))
    })
    setCurrentPage(1)
    setRowPerPage(10)
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
      setLoading(true);
      const response = await fetch(url);
      const text = await response.text();

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const jsonData = results.data;
          saveData.current = jsonData;
          setData(jsonData);
        },
        error: (error: any) => {
          setError(`Error parsing data: ${error?.message}`);
        }
      });
    } catch (error: any) {
      setError(`Error fetching data: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

    
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
    loading,
    handleToggle,
    handleMenuItemClick,
    handleClose,
    open,
    selectedIndex,
    options,
    anchorRef
  }
}
