export interface Meta {
  errorCode: number;
  message: string;
  type: string;
}

interface Data {
  result: Result;
}

interface InvoiceShowIdResponse {
  meta: Meta;
  data: Data;
}

interface Result {
  invoice: Invoice;
  invoiceDtls: InvoiceDetail[];
  diagnosises: Diagnosis[];
}

interface Invoice {
  id: number;
  ordr: number;
  dat: string;
  cId: number;
  srName: string;
  exp: string;
  usrName: string;
  flwId: number;
  flowMapName: string;
  canEdit: number;
}

interface InvoiceDetail {
  id: number;
  pId: number;
  product: string;
  cnt: number;
  offer: number;
  cost: number;
  valueTax: number;
  total: number;
}

interface Diagnosis {
  id: number;
  err: number;
  msg: string;
}

//http://apitest.dotis.ir/api/Invoice/payment?invoiceId=925142
interface Payment {
  id: number;
  dat: string;
  usrName: string;
  kindT: string;
  payKindT: string;
  no: string;
  exp: string;
  dsc: string;
  amnt: number;
  rem: number;
  attachCount: number;
}
interface ResultInvoicePayment {
  customerId: number;
  srName: string;
  dat: string;
  dsc: string;
  amnt: string;
  payments: Payment[];
}
interface InvoicePaymentResponse {
  meta: Meta;
  data: {
    result: ResultInvoicePayment;
  };
}
export interface InvoiceState {
  formId: number;
  invoiceId: number;// for Invoice/payment
  invoicePaymentResponse: InvoicePaymentResponse;// for Invoice/payment
  setInvoicePaymentResponse: ( // for Invoice/payment
    invoicePaymentResponse: InvoicePaymentResponse
  ) => void; 
  invoiceShowIdResponse: InvoiceShowIdResponse;
  setField: (field: string, value: any) => void;
  setInvoiceShowIdResponse: (
    invoiceShowIdResponse: InvoiceShowIdResponse
  ) => void;
}
