import { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

export const useHomeModel = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const indexOfLastItem = (currentPage * 10);
  const indexOfFirstItem = (indexOfLastItem - 10) + 1;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem + 1);
  const totalPages = Math.ceil(data.length / 10);

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS8EePM4SduXVEAOsFBbNY-DvugHbilvOH77U_4AlEGUYlZJY2xeqJg7zbpeOjmv_ioc05xShukC5im/pub?output=csv'

    try {
      const response = await axios.get(url);
      const csvData = response.data;
      Papa.parse(csvData, {
        complete: (result) => {
          setData(result?.data);
          handlePageChange(1)
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    columns,
    currentItems,
    currentPage,
    handlePageChange,
    indexOfLastItem,
    totalPages
  }
}
