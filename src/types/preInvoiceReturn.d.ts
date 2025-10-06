// http://apitest.dotis.ir/api/PreInvoiceReturn/warehouseTemporaryReceiptShow?Id=924865

import { Meta } from "./general";

interface PreInvoiceReturn {
  id: number;
  ordr: number;
  dat: string;
  cId: number;
  srName: string;
  exp: string;
}

interface PreInvoiceReturnDtl {
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
  wtrdId: number;
  wtrcdId: number;
  wtrdText: string;
  statusCode: number;
}

interface ResultWarehouseTemporaryReceiptShow {
  err: number;
  msg: string;
  preInvoiceReturn: PreInvoiceReturn;
  preInvoiceReturnDtls: PreInvoiceReturnDtl[];
  diagnosises: any[];
}

interface DataWarehouseTemporaryReceiptShow {
  result: ResultWarehouseTemporaryReceiptShow;
}

export interface ResponseWarehouseTemporaryReceiptShow {
  meta: Meta;
  data: DataWarehouseTemporaryReceiptShow;
}
///api/WarehouseTemporaryReceipt/preInvoiceDtSearch?PreInvoiceDtlId=4512744&page=1
interface ResultItem {
  id: number;
  text: string;
}

interface ResultPreInvoiceDtlSearch {
  total_count: number;
  results: ResultItem[];
}

interface DataPreInvoiceDtlSearch {
  result: ResultPreInvoiceDtlSearch;
}

interface ResponsePreInvoiceDtlSearch {
  meta: Meta;
  data: DataPreInvoiceDtlSearch;
}
export interface PreInvoiceReturnState {
  searchPreInvoiceDtlSearch: string;
  pagePreInvoiceDtlSearch: number;
  preInvoiceDtlId: number;
  id: number;
  responsePreInvoiceDtlSearch: ResponsePreInvoiceDtlSearch;
  responseWarehouseTemporaryReceiptShow: ResponseWarehouseTemporaryReceiptShow;
  setField: (field: string | number | symbol, value: any) => void;
  setResponsePreInvoiceDtlSearch: (
    ResponsePreInvoiceDtlSearch: ResponsePreInvoiceDtlSearch
  ) => void;
  setResponseWarehouseTemporaryReceiptShow: (
    ResponseWarehouseTemporaryReceiptShow: ResponseWarehouseTemporaryReceiptShow
  ) => void;
}
