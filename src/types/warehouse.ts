import { ReactNode } from "react";
import { Meta } from "./invoice";

interface Indent {
  id: number;
  code: string;
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
  expire: string;
  uId: string;
  status: ReactNode;
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

export interface ProductCatalogTable {
  rowId: string
  title: string;
  systemInfo: string;
  samaneInfo: string;
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

export interface WarehouseState {
  formId: number;
  productId:number
  warehouseShowIdResponse: WarehouseShowIdResponse;
  productCatalog:ProductCatalog
  setField: (field: string, value: any) => void;
  setWarehouseShowIdResponse: (
    warehouseShowIdResponse: WarehouseShowIdResponse
  ) => void;
  setProductCatalog: (
    productCatalog: ProductCatalog
  ) => void;
}

export interface ProductCatalog {
  data: {
    Manufacturing: string;
    Expiration: string;
    BatchCode: string;
    GenericName: string | null;
    GenericCode: string;
    UID: string;
    GTIN: string;
    IRC: string;
    LicenseOwner: string;
    EnglishProductName: string;
    PersianProductName: string;
    ProductCategory: string;
    ProductCategoryCode: number;
    PackageCount: number;
    StatusCode: number;
  };
  statusCode: number;
  statusMessage: string;
  CupId: number;
  UID: string;
  IRC: string;
  ttac: boolean;
  SystemId: number;
}
