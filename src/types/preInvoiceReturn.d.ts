// http://apitest.dotis.ir/api/PreInvoiceReturn/warehouseTemporaryReceiptShow?Id=924865

import { Meta, SearchItem } from "./general";

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


export interface PreInvoiceReturnDtlTable extends PreInvoiceReturnDtl {
  index: string;
  appearanceImage: JSX.Element | null;
  expireDate: string;
  saveBtn: JSX.Element | null;
  status: JSX.Element | null;
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
interface ResultPreInvoiceDtlSearch {
  total_count: number;
  results: SearchItem[];
}

interface DataPreInvoiceDtlSearch {
  result: ResultPreInvoiceDtlSearch;
}

interface ResponsePreInvoiceDtlSearch {
  meta: Meta;
  data: DataPreInvoiceDtlSearch;
}
///api/PreInvoiceReturn/warehouseTemporaryReceiptSave
interface WarehouseTemporaryReceiptSaveRequest{
  WarehouseTemporaryReceiptSaveRequestId:number;
  warehouseTemporaryReceiptDtlId:number
}

interface ResultWarehouseTemporaryReceiptSave {
  id: number;
  cupboardId: number;
  statusCode: number;
  err: number;
  msg: string;
}

interface DataWarehouseTemporaryReceiptSave {
  result: ResultWarehouseTemporaryReceiptSave;
}

interface WarehouseTemporaryReceiptSaveResponse {
  meta: Meta;
  data: DataWarehouseTemporaryReceiptSave;
}
export interface PreInvoiceReturnState extends WarehouseTemporaryReceiptSaveRequest {
  searchPreInvoiceDtlSearch: string;
  pagePreInvoiceDtlSearch: number;
  preInvoiceDtlId: number;
  temporaryReceiptShowId: number;
  responsePreInvoiceDtlSearch: ResponsePreInvoiceDtlSearch;
  responseWarehouseTemporaryReceiptShow: ResponseWarehouseTemporaryReceiptShow;
  warehouseTemporaryReceiptSaveResponse:WarehouseTemporaryReceiptSaveResponse;//api/PreInvoiceReturn/warehouseTemporaryReceiptSave
  setField: (field: string | number | symbol, value: any) => void;
  setResponsePreInvoiceDtlSearch: (
    ResponsePreInvoiceDtlSearch: ResponsePreInvoiceDtlSearch
  ) => void;
  setResponseWarehouseTemporaryReceiptShow: (
    ResponseWarehouseTemporaryReceiptShow: ResponseWarehouseTemporaryReceiptShow
  ) => void;
  setWarehouseTemporaryReceiptSaveResponse: (
    WarehouseTemporaryReceiptSaveResponse: WarehouseTemporaryReceiptSaveResponse
  ) => void;
}
