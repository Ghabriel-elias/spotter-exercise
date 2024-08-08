
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
  phone: string;                     
  usdot_number: string;              
  mc_mx_ff_number: string;           
  power_units: string;               
  out_of_service_date: string;       
}
