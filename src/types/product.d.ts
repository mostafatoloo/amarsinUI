export interface ProductSearchRequest {
  accYear: number;
  accSystem: number;
  searchTerm?: string;
  page: number;
}

export interface SalesPricesSearchRequest {
  salesPricesSearch: string;
  salesPricesSearchPage: number;
  lastId: number;
}

export interface ProductState
  extends ProductSearchRequest,
    IndentShowProductListRequest {
  salesPricesSearch: string;
  salesPricesSearchPage: number;
  lastId: number;
  productSearchResponse: ProductSearchResponse;
  salesPricesSearchResponse: SalesPricesSearchResponse;
  indentShowProductListResponse: IndentShowProductListResponse;
  indentSaveRequest: IndentSaveRequest;
  indentSaveResponse: IndentSaveResponse;
  setField: (
    field:
      | keyof ProductSearchRequest
      | keyof SalesPricesSearchRequest
      | keyof IndentShowProductListRequest,
    value: any
  ) => void;
  setProductSearchResponse: (
    productSearchResponse: ProductSearchResponse
  ) => void;
  setSalesPricesSearchResponse: (
    salesPricesSearchResponse: SalesPricesSearchResponse
  ) => void;
  setIndentShowProductListResponse: (
    indentShowProductListResponse: IndentShowProductListResponse
  ) => void;
  setIndentSaveResponse: (indentSaveResponse: IndentSaveResponse) => void;
  }

type Product = {
  pId: number;
  n: string;
  cP: number;
  sP: number;
  s: number;
};

type Data = {
  totalCount: number;
  result: Product[];
};

type Meta = {
  errorCode: number;
  message: string;
  type: string;
};

type ProductSearchResponse = {
  meta: Meta;
  data: Data;
};

//SalesPrice
interface SalesPriceItem {
  id: number;
  text: string;
}

interface SalesPricesSearchResponse {
  total_count: number;
  err: number;
  msg: string | null;
  searchResults: SalesPriceItem[];
}
//indent/showProductList
interface IndentProduct {
  id: number;
  bName: string;
  pId: number;
  product: string;
  companyStock: number;
  storeStock: number;
  cnt: number;
  offer: number;
  cost: number;
  tax: number;
  taxValue: number;
  sumCompanyCnt: number;
  sumStoreCnt: number;
  lbDate: string;
  total: number;
  dtlDsc: string;
}

interface IndentShowProductListResponse {
  err: number;
  msg: string;
  indentProducts: IndentProduct[];
}

interface IndentShowProductListRequest {
  mrsId: number;
  productId: number;
  acc_Year: number;
  providers: number[];
  brands: number[];
  salesPriceId: number;
  saleFDate: string;
  saleTDate: string;
}
export interface Detail {
  id: number;
  cId: number;
  pId: number;
  cnt: string;
  offer: string;
  cost: string;
  dcrmntPrcnt: string;
  dcrmnt: string;
  taxValue: string;
  dtlDsc: string;
  deleted: boolean;
}

interface IndentSaveRequest {
  id: number;
  ordrId: number;
  mrsId: number;
  customerId: number;
  del: boolean;
  acc_System: number;
  acc_Year: number;
  payDuration: number;
  dat: string;
  tim: string;
  dsc: string;
  salesPriceId: number;
  saleFDate: string;
  saleTDate: string;
  dtls: Detail[];
}

interface IndentSaveResponse {
  systemId: number;
  id: number;
  err: number;
  msg: string;
  hasFlow: boolean;
}