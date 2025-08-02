// for http://apitest.dotis.ir/api/PayRequest/PayRequest?Id=1513&Acc_Year=15&Acc_System=4&State=0
interface Meta {
    errorCode: number;
    message: null | string;
    type: string;
  }
  
  interface PayRequest {
    id: number;
    guid: string;
    systemId: number;
    systemTitle: string;
    yearId: number;
    yearName: string;
    ordr: number;
    dat: string;
    tim: string;
    fDate: string;
    tDate: string;
    dueDate: string;
    settleAmnt: string;
    providerAmnt: string;
    customerId: number;
    srName: string;
    amount: string;
    dsc: string;
    accepted: boolean;
    usrName: string;
    flwId: number;
    flowMapName: string;
    attachCount: number;
    rem: number;
  }
  
  interface PayRequestDtl {
    id: number;
    chequeBookId: number;
    chequeBook: string;
    chequeBookDtlId: number;
    chequeBookDtl: string;
    prsn: string;
    chqNo: null | string;
    chqBkNo: string;
    dat: string;
    amount: string;
    dtlDsc: string;
    del: boolean;
  }
  
  interface Result {
    err: number;
    msg: null | string;
    payRequests: PayRequest[];
    payRequestDtls: PayRequestDtl[];
    invcs: any[]; // Replace `any` with a specific type if invoices have a known structure
  }
  
  interface Data {
    result: Result;
  }
  
  interface PayRequestResponse {
    meta: Meta;
    data: Data;
  }

  interface PayRequestRequest {
    id: number;
    acc_year: number;
    acc_system: number;
  }

  export interface PayRequestState extends PayRequestRequest{
    payRequestResponse: PayRequestResponse;
    setField: (field: string | number | symbol, value: any) => void;
    setPayRequestResponse: (payRequestResponse: PayRequestResponse) => void;
  }