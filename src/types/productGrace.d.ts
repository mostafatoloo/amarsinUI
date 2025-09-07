import { ProductOperation, ProductOperationRequest, SaveRequest } from "./productOperation";

//http://apitest.dotis.ir/api/ProductGrace?YearId=15&SystemId=4&State=0&PageNumber=1&SrchId=-1&SrchAccepted=-1&SortId=0&SortDate=0&SortTime=0&SortDsc=0&SortAccepted=0&SortUsrName=0&SortStep=0
export interface ProductGraceRequest extends ProductOperationRequest {
    yearId: number;
    systemId: number;
  }
  
  export interface ProductGrace extends ProductOperation {
    //productPermId: number;
  }
  
  interface ProductGraceItem {
    id: number;
    pId: number;
    bName: string;
    product: string;
    lastDate: string;
    dtlDsc: string;
    deleted: boolean;
  }
  
  interface ProductGraceDtl extends ProductGraceItem {
    ordr: number;
    productCode: string;
    gd: number;
    gdo: number;
    sc: number;
    sco: number;
    cc: number;
    cco: number;
    ec: number;
    eco: number;  
  }
  
  interface Result {
    err: number;
    msg: string | null;
    total_count: number;
    productGraces: ProductGrace[];
    productGraceDtls: ProductGraceDtl[];
  }
  
  interface Data {
    result: Result;
  }
  
  interface ProductGraceResponse {
    meta: Meta;
    data: Data;
  }
  //http://apitest.dotis.ir/api/ProductGrace/showProductList
interface ProductGraceListRequest {
    id: number;
    productId: number;
    acc_Year: number;
    brands: number[];
  }
  
  type ProductGraceListResponse = {
    meta: Meta;
    data: DataProductPermList;
  };
  
  type DataProductGraceList = {
    result: ResultProductGraceList;
  };

  type ResultProductGraceList ={
    err:number,
    msg:string,
    productGraceProducts:ProductGraceListItem[]
  }
  
  interface ProductGraceListItem extends ProductGraceItem {
    gdo: number;
    gd: number;
    sc: number;
    sco: number;
    cc: number;
    cco: number;
    ec: number;
    eco: number;
    dtlDsc: string;
  }
  
  export interface ProductGraceListItemTable extends ProductGraceListItem {
    isDeleted: boolean;
  } 
  
  export interface ProductGraceListItemTable2 extends ProductGraceListItemTable {
    index: number;
  }

  //http://apitest.dotis.ir/api/ProductPerm/dtlHistory?PId=589
  export interface ProductGraceDtlHistoryResponse {
    meta: Meta;
    data: DataProductGraceDtlHistory;
  }
  export interface DataProductGraceDtlHistory {
    result: ProductGraceDtlHistory[];
  }
  
  export interface ProductGraceDtlHistory {
    id: number;
    date: string;
    accepted: boolean;
    graceDays: number;
    salesCommission: number;
    collectionCommission: number;
    extraCommission: number;
    dtlDsc: string;
  }
  
  //http://apitest.dotis.ir/api/ProductGrace/save
  export interface ProductGraceSaveRequest extends SaveRequest {
    acc_Year: number;
    acc_System: number;
    dtls: Dtl[];
  }
  
  // Detail item
  export interface Dtl {
    id: number;
    pId: number;
    gd: number;
    sc: number;
    cc: number;
    ec: number;
    dtlDsc: string;
    deleted: boolean;
  }
  
  type ProductGraceSaveResponse = {
    meta: Meta;
    data: {
      result: {
        acc_System: number;
        id: number;
        err: number;
        msg: string;
        hasFlow: boolean;
      };
    };
  };
  
  //http://apitest.dotis.ir/api/ProductPerm/doFirstFlow?ChartId=1&Acc_System=1&Acc_Year=15&Id=123123&Dsc=
  interface ProductGraceDoFirstFlowRequest {
    acc_System: number;
    acc_Year: number;
    id: number;
    dsc: string;
  }
  
  interface ResultProductGraceDoFirstFlow {
    acc_System: number;
    id: number;
    err: number;
    msg: string;
    hasFlow: boolean;
  }
  
  interface DataProductGraceDoFirstFlow {
    result: ResultProductGraceDoFirstFlow;
  }
  
  interface ProductGraceDoFirstFlowResponse {
    meta: Meta;
    data: DataProductGraceDoFirstFlow;
  }
  //http://apitest.dotis.ir/api/ProductPerm/del?Id=1637
  interface ResultProductGraceDel {
    acc_System: number;
    id: number;
    err: number;
    msg: string;
    hasFlow: boolean;
  }
  
  interface DataProductGraceDel {
    result: ResultProductGraceDel;
  }
  
  interface ProductGraceDelResponse {
    meta: Meta;
    data: DataProductGraceDel;
  }
  export interface ProductGraceState extends ProductGraceRequest {
    pId: number; //for productPerm/dtlHistory
    productGraceDoFirstFlowResponse: ProductGraceDoFirstFlowResponse; //for productGrace/doFirstFlow
    setProductGraceDoFirstFlowResponse: (
      productGraceDoFirstFlowResponse: ProductGraceDoFirstFlowResponse
    ) => void; //for productPerm/doFirstFlow
    productGraceDelResponse: ProductGraceDelResponse; //for productPerm/del
    setProductGraceDelResponse: (
      productGraceDelResponse: ProductGraceDelResponse
    ) => void; //for productPerm/del
    productGraceSaveResponse: ProductGraceSaveResponse; //for productGrace/save
    setProductGraceSaveResponse: (
      productGraceSaveResponse: ProductGraceSaveResponse
    ) => void; //for productPerm/save
    productGraceDtlHistoryResponse: ProductGraceDtlHistoryResponse; //for productPerm/dtlHistory
    setProductGraceDtlHistoryResponse: (
      productGraceDtlHistoryResponse: ProductGraceDtlHistoryResponse
    ) => void; //for productPerm/dtlHistory
    productGraceListResponse: ProductGraceListResponse; //for productGrace/productList
    setProductGraceListResponse: (
      productGraceListResponse: ProductGraceListResponse
    ) => void; //for productPerm/productList
    setField: (field: string, value: any) => void;
    productGraceResponse: ProductGraceResponse; //for productPerm/productPerm
    setProductGraceResponse: (productGraceResponse: ProductGraceResponse) => void; //for productPerm/productPerm
  }
  