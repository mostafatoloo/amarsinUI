export interface ProductSearchRequest{
    accYear: number
    accSystem: number
    searchTerm?:string
    page:number
}

export interface ProductState extends ProductSearchRequest{
    productSearchResponse:ProductSearchResponse
    setField: (field: keyof ProductSearchRequest, value: any) => void;
    setProductSearchResponse:(productSearchResponse:ProductSearchResponse) =>void
    
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