import { useEffect, useRef, useState } from 'react';
import { TableData } from '../../models/sheetData';
import Papa from 'papaparse';
import { useFilters } from '../../hooks/useFilters';

const teste = [{"created_dt":"11/16/2023","data_source_modified_dt":"7/22/2024","entity_type":"CARRIER","operating_status":"","legal_name":"THOMAS WALDRUM","dba_name":"SOUTH MOUNTAIN TRUCKING","physical_address":"1176 MOUNTAIN ROAD AMITY, AR 71921","p_street":"1176 MOUNTAIN ROAD","p_city":"AMITY","p_state":"AR","p_zip_code":"71921","phone":"(870) 828-2056","mailing_address":"1176 MOUNTAIN ROAD AMITY, AR 71921","m_street":"1176 MOUNTAIN ROAD","m_city":"AMITY","m_state":"AR","m_zip_code":"71921","usdot_number":"729700","mc_mx_ff_number":"","power_units":"1","mcs_150_form_date":"11/8/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"1","mcs_150_mileage_year":"15,000 (2022)","id":"2304561","credit_score":"NULL","record_status":"active"},{"created_dt":"11/16/2023","data_source_modified_dt":"7/22/2024","entity_type":"CARRIER","operating_status":"","legal_name":"SERGIO ALBERTO MONTEMAYOR LEAL","dba_name":"","physical_address":"6434 DAY ST DALLAS, TX 75227","p_street":"6434 DAY ST","p_city":"DALLAS","p_state":"TX","p_zip_code":"75227","phone":"(469) 602-4708","mailing_address":"11504 S BLOSSON CIR BALDN SPRINGS, TX 75180","m_street":"11504 S BLOSSON CIR","m_city":"BALDN SPRINGS","m_state":"TX","m_zip_code":"75180","usdot_number":"2945093","mc_mx_ff_number":"","power_units":"8","mcs_150_form_date":"3/11/2024","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"8","mcs_150_mileage_year":"39,600 (2023)","id":"2304560","credit_score":"NULL","record_status":"active"},{"created_dt":"11/16/2023","data_source_modified_dt":"11/16/2023","entity_type":"CARRIER","operating_status":"NOT AUTHORIZED","legal_name":"BAKER TRANSPORT ENTERPRISE CORP","dba_name":"","physical_address":"6618 FAIRFIELD DR LITTLE, AR 72209","p_street":"6618 FAIRFIELD DR","p_city":"LITTLE","p_state":"AR","p_zip_code":"72209","phone":"(501) 960-3210","mailing_address":"6618 FAIRFIELD DR LITTLE, AR 72209","m_street":"6618 FAIRFIELD DR","m_city":"LITTLE","m_state":"AR","m_zip_code":"72209","usdot_number":"2378186","mc_mx_ff_number":"MC-828829","power_units":"1","mcs_150_form_date":"11/15/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"1","mcs_150_mileage_year":"5 (2022)","id":"2304559","credit_score":"NULL","record_status":""},{"created_dt":"11/16/2023","data_source_modified_dt":"11/16/2023","entity_type":"CARRIER","operating_status":"NOT AUTHORIZED","legal_name":"R & K TRANSPORTATION LLC","dba_name":"","physical_address":"275 CAPETON CT COVINGTON, GA 30016","p_street":"275 CAPETON CT","p_city":"COVINGTON","p_state":"GA","p_zip_code":"30016","phone":"(718) 644-2913","mailing_address":"275 CAPETON CT COVINGTON, GA 30016-3023","m_street":"275 CAPETON CT","m_city":"COVINGTON","m_state":"GA","m_zip_code":"30016-3023","usdot_number":"3154787","mc_mx_ff_number":"MC-107029","power_units":"1","mcs_150_form_date":"11/16/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"1","mcs_150_mileage_year":"1 (2017)","id":"2304558","credit_score":"NULL","record_status":""},{"created_dt":"11/16/2023","data_source_modified_dt":"7/22/2024","entity_type":"CARRIER","operating_status":"","legal_name":"MARTIN B WALLEY","dba_name":"MWALLEY CONSTRUCTION","physical_address":"103 ARLINGTON AVE LINWOOD, NJ 08221","p_street":"103 ARLINGTON AVE","p_city":"LINWOOD","p_state":"NJ","p_zip_code":"8221","phone":"(609) 641-9532","mailing_address":"103 ARLINGTON AVE LINWOOD, NJ 08221","m_street":"103 ARLINGTON AVE","m_city":"LINWOOD","m_state":"NJ","m_zip_code":"8221","usdot_number":"569018","mc_mx_ff_number":"","power_units":"3","mcs_150_form_date":"11/8/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"3","mcs_150_mileage_year":"40,000 (2022)","id":"2304557","credit_score":"NULL","record_status":"active"},{"created_dt":"11/16/2023","data_source_modified_dt":"7/19/2024","entity_type":"CARRIER","operating_status":"","legal_name":"J&C TRUCKING LLC","dba_name":"","physical_address":"1500 W THORNTON PKWY LOT 252 THORNTON, CO 80260","p_street":"1500 W THORNTON PKWY LOT 252","p_city":"THORNTON","p_state":"CO","p_zip_code":"80260","phone":"(720) 628-9560","mailing_address":"1500 W THORNTON PKWY LOT 252 THORNTON, CO 80260","m_street":"1500 W THORNTON PKWY LOT 252","m_city":"THORNTON","m_state":"CO","m_zip_code":"80260","usdot_number":"2582279","mc_mx_ff_number":"","power_units":"2","mcs_150_form_date":"11/9/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"2","mcs_150_mileage_year":"10,000 (2022)","id":"2304556","credit_score":"NULL","record_status":"active"},{"created_dt":"11/16/2023","data_source_modified_dt":"7/4/2024","entity_type":"CARRIER","operating_status":"","legal_name":"RANDOLPH BOURGOIN III","dba_name":"BOURGOIN AND SON TRANSPORT","physical_address":"32 REEVES ROAD BRADFORD, ME 04410","p_street":"32 REEVES ROAD","p_city":"BRADFORD","p_state":"ME","p_zip_code":"4410","phone":"(207) 717-7868","mailing_address":"32 REEVES ROAD BRADFORD, ME 04410","m_street":"32 REEVES ROAD","m_city":"BRADFORD","m_state":"ME","m_zip_code":"4410","usdot_number":"1804470","mc_mx_ff_number":"","power_units":"1","mcs_150_form_date":"11/9/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"1","mcs_150_mileage_year":"1 (2022)","id":"2304555","credit_score":"NULL","record_status":""},{"created_dt":"11/16/2023","data_source_modified_dt":"11/16/2023","entity_type":"CARRIER","operating_status":"NOT AUTHORIZED","legal_name":"ELITE LINE TRANSPORT LLC","dba_name":"","physical_address":"97 WALDWICK AVE WALDWICK, NJ 07463","p_street":"97 WALDWICK AVE","p_city":"WALDWICK","p_state":"NJ","p_zip_code":"7463","phone":"(201) 458-4261","mailing_address":"97 WALDWICK AVE WALDWICK, NJ 07463","m_street":"97 WALDWICK AVE","m_city":"WALDWICK","m_state":"NJ","m_zip_code":"7463","usdot_number":"2199935","mc_mx_ff_number":"MC-763357","power_units":"1","mcs_150_form_date":"11/6/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"1","mcs_150_mileage_year":"100 (2022)","id":"2304554","credit_score":"NULL","record_status":""},{"created_dt":"11/16/2023","data_source_modified_dt":"11/16/2023","entity_type":"CARRIER","operating_status":"NOT AUTHORIZED","legal_name":"MOONSTONE SERVICES LLC","dba_name":"","physical_address":"1767 CENTRAL PARK AVE # 221 YONKERS, NY 10710","p_street":"1767 CENTRAL PARK AVE # 221","p_city":"YONKERS","p_state":"NY","p_zip_code":"10710","phone":"(347) 316-9437","mailing_address":"1767 CENTRAL PARK AVE # 221 YONKERS, NY 10710","m_street":"1767 CENTRAL PARK AVE # 221","m_city":"YONKERS","m_state":"NY","m_zip_code":"10710","usdot_number":"4056296","mc_mx_ff_number":"MC-972836","power_units":"1","mcs_150_form_date":"4/18/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"1","mcs_150_mileage_year":"1 (2022)","id":"2304553","credit_score":"","record_status":""},{"created_dt":"11/16/2023","data_source_modified_dt":"7/19/2024","entity_type":"CARRIER","operating_status":"","legal_name":"MILLENNIUM TRANSPORT & TOWING INC","dba_name":"","physical_address":"8030 ANDERSON ROAD TAMPA, FL 33634","p_street":"8030 ANDERSON ROAD","p_city":"TAMPA","p_state":"FL","p_zip_code":"33634","phone":"(813) 243-1088","mailing_address":"8030 ANDERSON ROAD TAMPA, FL 33634","m_street":"8030 ANDERSON ROAD","m_city":"TAMPA","m_state":"FL","m_zip_code":"33634","usdot_number":"2355518","mc_mx_ff_number":"","power_units":"4","mcs_150_form_date":"11/8/2023","out_of_service_date":"","state_carrier_id_number":"","duns_number":"","drivers":"4","mcs_150_mileage_year":"51,000 (2022)","id":"2304552","credit_score":"NULL","record_status":"active"}]

export const useHomeModel = () => {
  const [data, setData] = useState<TableData[]>([]);
  const saveData = useRef<TableData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(10)
  const indexOfLastItem = (currentPage * rowPerPage);
  const indexOfFirstItem = (indexOfLastItem - rowPerPage);
  let currentItems: TableData[] = teste
  currentItems = currentItems.map(item => {
    return {
      ...item,
      created_dt: new Date(item.created_dt).toLocaleDateString("en-US"),
      data_source_modified_dt: new Date(item.data_source_modified_dt).toLocaleDateString("en-US"),
      mcs_150_form_date: item?.mcs_150_form_date ? new Date(item?.mcs_150_form_date).toLocaleDateString("en-US") : '',
      out_of_service_date: item.out_of_service_date ? new Date(item.out_of_service_date).toLocaleDateString("en-US") : ''
    };
  });
  console.log(JSON.stringify(currentItems))

  const totalPages = Math.ceil(data.length / rowPerPage);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const options = ['Most recent creation date', 'Oldest creation date', 'Operating Status: Authorized ', 'Operating Status: Not Authorized '];
  const {
    filterOldestCreateDate,
    filterRecentCreateDate,
    filterStatusAuthorized,
    filterStatusNotAuthorized
  } = useFilters(saveData.current)

  const columnsData = currentItems.length && [...Object.keys(currentItems[0])] || []

  function normalizeString(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function getRecentCreateDate() {
    setCurrentPage(1)
    setRowPerPage(10)
    setData(filterRecentCreateDate())
  }

  function getOldestCreateDate() {
    setCurrentPage(1)
    setRowPerPage(10)
    setData(filterOldestCreateDate())
  }

  function getStatusAuthorized() {
    setCurrentPage(1)
    setRowPerPage(10)
    setData(filterStatusAuthorized())
  }

  function getStatusNotAuthorized() {
    setCurrentPage(1)
    setRowPerPage(10)
    setData(filterStatusNotAuthorized())
  }


  const filters = {
    0: getRecentCreateDate,
    1: getOldestCreateDate,
    2: getStatusAuthorized,
    3: getStatusNotAuthorized
  }

  const handleMenuItemClick = (index: number) => {
    if(selectedIndex === index) {
      setData(saveData.current)
      setSelectedIndex(null)
      setOpen(false)
      return
    }
    const callback = filters[index]
    callback()
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
      if(!selectedIndex) {
        setData(saveData.current)
        return
      }
      const callback = filters[selectedIndex]
      callback()
      return
    }
    const dataToFilter = selectedIndex ? data : saveData.current
    const newItems = dataToFilter?.filter(item => {
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
    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRcPHyrnU5xaxtrrTIghpf5-UB5XeJJfOMWYixSAVVbgZ2dtlVQBVSiJFvospu7Z6HVai0T3Ta1j43m/pub?output=csv`;

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
    // fetchData()
  }, [])  

  return {
    currentItems,
    currentPage,
    handlePageChange,
    indexOfLastItem,
    totalPages,
    searchByName,
    columnsData,
    handleChangeRow,
    rowPerPage,
    loading,
    handleToggle,
    handleMenuItemClick,
    handleClose,
    open,
    selectedIndex,
    options,
    anchorRef,
  }
}
