
export interface RowData {
  status: string;
  authorization: string;
  companyName: string;
  additionalInfo: string;
  address: string;
  phoneNumber: string;
  identifier: string;
  mcNumber: string;
  count: string;
}

export interface TableData {
  created_dt: string;
  data_source_modified_dt: string;
  entity_type: string;
  operating_status: string;
  legal_name: string;
  dba_name: string;
  physical_address: string;
  p_street: string;
  p_city: string;
  p_state: string;
  p_zip_code: string;
  phone: string;
  mailing_address: string;
  m_street: string;
  m_city: string;
  m_state: string;
  m_zip_code: string;
  usdot_number: string;
  mc_mx_ff_number: string;
  power_units: string;
  mcs_150_form_date: string; 
  out_of_service_date: string; 
  state_carrier_id_number: string;
  duns_number: string;
  drivers: string;
  mcs_150_mileage_year: string;
  id: string;
  credit_score: string;
  record_status: string;
}
