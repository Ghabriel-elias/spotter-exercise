import { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { TableData } from '../models/sheetData';

export const useData = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const saveData = useRef<TableData[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); // Formato MM/DD/YYYY
  };
  
  const formatData = (data: TableData[]) => {
    return data.map(item => ({
      ...item,
      created_dt: formatDate(item.created_dt),
      data_source_modified_dt: formatDate(item.data_source_modified_dt),
      mcs_150_form_date: item.mcs_150_form_date ? formatDate(item.mcs_150_form_date) : '',
      out_of_service_date: item.out_of_service_date ? formatDate(item.out_of_service_date) : ''
    }));
  };

  const fetchData = async () => {
    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRcPHyrnU5xaxtrrTIghpf5-UB5XeJJfOMWYixSAVVbgZ2dtlVQBVSiJFvospu7Z6HVai0T3Ta1j43m/pub?output=csv`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const text = await response.text();

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const jsonData = results.data as TableData[];
          const formattedData = formatData(jsonData as TableData[]);
          saveData.current = formattedData;
          setData(formattedData);
        },
        error: (error: any) => {
          console.error(`Error parsing data: ${error?.message}`);
        }
      });
    } catch (error: any) {
      console.error(`Error fetching data: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, saveData };
};
