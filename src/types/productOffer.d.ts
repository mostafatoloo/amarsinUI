import { Meta } from "./general";

//http://apitest.dotis.ir/api/ProductOffer/ProductOffer?Id=1363&Acc_Year=15&Acc_System=4&RegFDate=1404%2F01%2F01&RegTDate=1404%2F05%2F01&FDate=1404%2F01%2F01&TDate=1404%2F05%2F01&State=0

export interface ProductOfferRequest {
  id: number;
  acc_Year: number;
  acc_System: number;
  state: number;
  regFDate: string;
  regTDate: string;
  fDate: string;
  tDate: string;
}

export interface ProductOffer {
  id: number;
  ordr: number;
  productOfferId: number;
  dat: string;
  tim: string;
  dsc: string;
  accepted: boolean;
  usrName: string;
  flwId: number;
  flowMapName: string;
}

interface ProductOfferDtl {
  id: number;
  ordr: number;
  pId: number;
  bName: string;
  productCode: string;
  product: string;
  lastDate: string;
  s1NO: number;
  s1DO: number;
  s2NO: number;
  s2DO: number;
  s3NO: number;
  s3DO: number;
  s4NO: number;
  s4DO: number;
  s5NO: number;
  s1N: number;
  s1D: number;
  s2N: number;
  s2D: number;
  s3N: number;
  s3D: number;
  s4N: number;
  s4D: number;
  s5N: number;
  dtlDsc: string;
  deleted: boolean;
  no: boolean;
}

interface Result {
  err: number;
  msg: string | null;
  productOffers: ProductOffer[];
  productOfferDtls: ProductOfferDtl[];
}

interface Data {
  result: Result;
}

interface ProductOfferResponse {
  meta: Meta;
  data: Data;
}

export interface ProductOfferState extends ProductOfferRequest {
  productOfferResponse: ProductOfferResponse;
  setField: (field: keyof ProductOfferRequest, value: any) => void;
  setProductOfferResponse: (productOfferResponse: ProductOfferResponse) => void;
}
