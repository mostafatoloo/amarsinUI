//api/InvoiceReturnRequest/show?Id=2778
interface InvoiceReturnRequest {
  id: number;
  ordr: number;
  dat: string;
  cId: number;
  srName: string;
  dsc: string;
  usrName: string;
  flwId: number;
  flowMapName: string;
  canEdit: number;
  attachCount: number;
}

interface InvoiceReturnRequestDtl {
  id: number;
  pId: number;
  product: string;
  cupCode: string;
  uid: string;
  pDateFormat: number;
  prodYear: string;
  prodMonth: string;
  prodDay: string;
  expireYear: string;
  expireMonth: string;
  expireDay: string;
  cnt: number;
  appearance: boolean;
  factorNo: string;
  dtlDsc: string;
  regedCnt: string;
  regedOffer: string;
}


interface Diagnosis{
  id:number;
  err:number;
  msg:string;
}

interface ResultInvoiceReturnRequestShow {
  invoiceReturnRequest: InvoiceReturnRequest;
  invoiceReturnRequestDtls: InvoiceReturnRequestDtl[];
  diagnosises: Diagnosis[]; // Replace 'any' with a specific type if diagnoses have a structure
}

interface DataInvoiceReturnRequestShow {
  result: ResultInvoiceReturnRequestShow;
}

interface InvoiceReturnRequestShowResponse {
  meta: Meta;
  data: DataInvoiceReturnRequestShow;
}

export interface InvoiceReturnRequestState {
  invoiceReturnRequestId: number;
  invoiceReturnRequestShowResponse: InvoiceReturnRequestShowResponse;
  setInvoiceReturnRequestShowResponse: (
    invoiceReturnRequestShowResponse: InvoiceReturnRequestShowResponse
  ) => void;
  setField: (field: string, value: any) => void;
}
