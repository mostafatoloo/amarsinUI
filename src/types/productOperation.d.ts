export interface ProductOperationRequest {
    id: number;
    state: number;
    regFDate: string;
    regTDate: string;
    fDate: string;
    tDate: string;
    pageNumber:number;
    srchId:number;
    srchDate:string;
    srchTime:string;
    srchDsc:string;
    srchAccepted:number;
    srchUsrName:string;
    srchStep:string;
    sortId:number;
    sortDat:number;
    sortTime:number;
    sortDsc:number;
    sortAccepted:number;
    sortUsrName:string;
    sortStep:string; 
  
  }

  export interface ProductOperation {
    id: number;
    ordr: number;
    dat: string;
    tim: string;
    dsc: string;
    accepted: boolean;
    usrName: string;
    flwId: number;
    flowMapName: string;
  }

  export interface SaveRequest {
    chartId: number;
    id: number;
    dat: string;
    tim: string;
    dsc: string;
    saveAndSend: boolean;
  }