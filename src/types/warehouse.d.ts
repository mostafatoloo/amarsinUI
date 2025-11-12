import { ReactNode } from "react";
import { Meta, SearchItem } from "./general";

interface Indent {
  id: number;
  code: string | null;
  cnt: number;
  offer: number;
  dsc: string;
}

export interface WarehouseTemporaryReceiptIndentDtl {
  id: number;
  iocId: number;
  produce: string;
  expire: string;
  uId: string;
  status: number;
  cId: number;
  code: string;
  gtin: string;
  irc: string;
  pCode: string;
  pName: string;
  cnt: number;
  stock: number;
  pOffer: number;
  indents: Indent[];
  rCnt: number;
  rOffer: number;
}

export interface WarehouseTemporaryReceiptIndentDtlTable {
  id: number;
  expire: string;
  uId: string;
  status: ReactNode;
  editIcon: ReactNode;
  historyIcon: ReactNode;
  statusOriginal: number;
  cId: number;
  code: string;
  pCode: string;
  pName: string;
  cnt: number;
  indentId: string;
  indentCode: string;
  indentCnt: string;
  indentOffer: string;
  indentDsc: string;
  rCnt: number;
  rOffer: number;
}


interface WarehouseTemporaryReceiptMst {
  id: number;
  formId: number;
  code: string;
  dat: string;
  tim: string;
  cId: number;
  srName: string;
  gln: string;
  blackList: boolean;
  exp: string;
  guid: string;
  status: number;
  msg: string;
}

interface WarehouseResponse {
  wId: number;
  wName: string;
  warehouseTemporaryReceiptMst: WarehouseTemporaryReceiptMst;
  warehouseTemporaryReceiptIndentDtls: WarehouseTemporaryReceiptIndentDtl[];
}

interface Result {
  err: number;
  msg: string;
  response: WarehouseResponse;
}

interface Data {
  result: Result;
}

export interface WarehouseShowIdResponse {
  meta: Meta;
  data: Data;
}
//http://apitest.dotis.ir/api/WarehouseTemporaryReceipt/purchaseShow/1107390
interface WarehouseTemporaryReceiptPurchaseDtls {  
  id: number;  
  iocId: number;  
  expire: string;  
  uId: string;  
  status: number;  
  code: string;  
  pCode: string;  
  pName: string;  
  cnt: number;  
  stock: number;  
  pOffer: number;  
  tax: number;  
  graceDays: number;  
  perm: boolean;  
  regCnt: number;  
  regOffer: number;  
  rCnt: number;  
  rCost: number;  
  tCnt: number;  
  tOffer: number;  
  tCost: number;  
  consumerPrice: number;  
}  

interface ResultWarehouseTemporaryReceiptPurchase {  
  err: number;  
  msg: string;  
  result: {  
    spId: number;  
    spTitle: string;  
    wId: number;  
    wName: string;  
    warehouseTemporaryReceiptMst: WarehouseTemporaryReceiptMst;  
    warehouseTemporaryReceiptPurchaseDtls: WarehouseTemporaryReceiptPurchaseDtls[];  
  };  
}  

interface DataWarehouseTemporaryReceiptPurchase {  
  result: ResultWarehouseTemporaryReceiptPurchase;  
}  

export interface WarehouseTemporaryReceiptPurchaseShowResponse {  
  meta: Meta;  
  data: DataWarehouseTemporaryReceiptPurchase;  
}  

type TemporaryReceiptIndent = {
  id: number;
  payDuration: number;
  dId: number;
  cnt: number;
  offer: number;
  amnt: number;
  rem: number;
  dcrmnt: number;
  dsc: string;
};

export interface WarehouseTemporaryReceiptIndent
  extends TemporaryReceiptIndent {
  rCnt: number;
  rOffer: number;
}

export interface WarehouseTemporaryReceiptIndentTbl {
  id: string;
  payDuration: string;
  dId: string;
  cnt: string;
  offer: string;
  amnt: string;
  rem: string;
  dcrmnt: string;
  dsc: string;
  rCnt: string;
  rOffer: string;
}

export interface WarehouseIndentListResponse {
  meta: Meta;
  data: {
    result: {
      err: number;
      msg: string;
      warehouseTemporaryReceiptIndentLists: WarehouseTemporaryReceiptIndent[];
    };
  };
}
// api/WarehouseTemporaryReceipt/SelectIndents
export type IndentRequest = {
  id: number;
  cnt: number;
  offer: number;
};

export type SelectIndentsRequest = {
  iocId: number;
  indents: IndentRequest[];
};

export interface SelectIndentsResponse {
  meta: {
    errorCode: number;
    message: string;
    type: string;
  };
  data: {
    result: {
      err: number;
      msg: string;
      indents: Indent[];
    };
  };
}
//api/WarehouseTemporaryReceipt/Reg
export interface RegRequest {
  usrId: number;
  id: number;
  customerId: number;
  dtls: IndentRequest[];
}

export interface RegResponse {
  meta: Meta;
  data: {
    result: {
      id: number;
      err: number;
      msg: string;
      dtlErrMsgs: any[];
    };
  };
}

// for api/Warehouse/Search?search=%D8%A7&page=1&pageSize=30&lastId=0&CustomerTypeId=-1
export interface WarehouseSearchRequest {
  search: string;
  page: number;
  pageSize: number;
  lastId: number;
  CustomerTypeId: number;
  PartKey:number
}
/*export interface WarehouseSearchResult {
  id: number;
  text: string;
}*/

export interface WarehouseSearchResponse {
  meta: Meta;
  data: {
      result: {
          total_count: number;
          err: number;
          msg: string | null;
          searchResults: SearchItem[];
      };
  };
}

// /api/WarehouseTemporaryReceipt/salesPrices?id=1106779&salesPriceId=1
type PriceItem = {
  id: number;
  price: number;
};

type ResultWarehouseTemporaryReceiptSalesPrices = {
  err: number;
  msg: string;
  salesPrices: PriceItem[];
};

type DataWarehouseTemporaryReceiptSalesPrices = {
  result: ResultWarehouseTemporaryReceiptSalesPrices;
};

export interface WarehouseTemporaryReceiptSalesPricesResponse {
  meta: Meta;
  data: DataWarehouseTemporaryReceiptSalesPrices;
};

//api/WarehouseTemporaryReceipt/purchaseReg?id=1106779&salesPriceId=1
type ResultDetail = {
  id: number;
  err: number;
  msg: string;
  dtlErrMsgs: string[];
};

type DataWarehouseTemporaryReceiptPurchaseReg = {
  result: ResultDetail;
};

export interface WarehouseTemporaryReceiptPurchaseRegResponse {
  meta: Meta;
  data: DataWarehouseTemporaryReceiptPurchaseReg;
};
export interface WarehouseState extends WarehouseSearchRequest {
  formIdWarehouseTemporaryReceipt: number;
  productId: number;
  iocId: number;
  receiptPurchaseId:number;
  warehouseShowIdResponse: WarehouseShowIdResponse;
  warehouseTemporaryReceiptPurchaseShowResponse: WarehouseTemporaryReceiptPurchaseShowResponse;///api/WarehouseTemporaryReceipt/purchaseShow/1107390
  warehouseIndentListResponse: WarehouseIndentListResponse;
  warehouseSearchResponse: WarehouseSearchResponse;
  id: number; //for api/WarehouseTemporaryReceipt/salesPrices?id=1106779&salesPriceId=1
  salesPriceId: number; //for api/WarehouseTemporaryReceipt/salesPrices?id=1106779&salesPriceId=1
  idReg: number; //for api/WarehouseTemporaryReceipt/purchaseReg?id=1106779&salesPriceId=1
  salesPriceIdReg: number; //for api/WarehouseTemporaryReceipt/purchaseReg?id=1106779&salesPriceId=1
  warehouseTemporaryReceiptSalesPricesResponse: WarehouseTemporaryReceiptSalesPricesResponse;//for api/WarehouseTemporaryReceipt/salesPrices?id=1106779&salesPriceId=1
  warehouseTemporaryReceiptPurchaseRegResponse: WarehouseTemporaryReceiptPurchaseRegResponse;//for api/WarehouseTemporaryReceipt/purchaseReg?id=1106779&salesPriceId=1
  setField: (field: string, value: any) => void;
  setWarehouseShowIdResponse: (
    warehouseShowIdResponse: WarehouseShowIdResponse
  ) => void;
  setWarehouseIndentListResponse: (
    warehouseIndentListResponse: WarehouseIndentListResponse
  ) => void;
  selectIndentsResponse: SelectIndentsResponse;
  setSelectIndentsResponse: (
    selectIndentsResponse: SelectIndentsResponse
  ) => void;
  regResponse: RegResponse;
  setRegResponse: (regResponse: RegResponse) => void;
  setWarehouseSearchResponse: (
    warehouseSearchResponse: WarehouseSearchResponse
  ) => void;
  setWarehouseTemporaryReceiptPurchaseShowResponse: ( ///api/WarehouseTemporaryReceipt/purchaseShow/1107390
    warehouseTemporaryReceiptPurchaseShowResponse: WarehouseTemporaryReceiptPurchaseShowResponse
  ) => void;
  setWarehouseTemporaryReceiptSalesPricesResponse: (
    warehouseTemporaryReceiptSalesPricesResponse: WarehouseTemporaryReceiptSalesPricesResponse
  ) => void;
  setWarehouseTemporaryReceiptPurchaseRegResponse: (
    warehouseTemporaryReceiptPurchaseRegResponse: WarehouseTemporaryReceiptPurchaseRegResponse
  ) => void;
}