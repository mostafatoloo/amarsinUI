export type FlowMapTitle = {
  id: number;
  name: string;
  count: number;
};

export type WorkFlowTable = {
    id: number;
    regDateTime: string;
    formTitle: string;
    formCode: string;
    formCost: number;
    flowMapTitle: string;
    fChartName: string;
    dsc: string;
}

export type WorkTable = {
  id: number;
  regFDate: string;
  regTime: string;
  regDateTime: string;
  formId: number;
  formTitle: string;
  formCode: string;
  formCost: number;
  fChartName: string;
  flowMapTitle: string;
  dsc: string;
  operation: number;
  wfmS_FlowMapId: number;
  wfmS_FlowId: number;
  flowNo: number;
  canEditForm1: boolean;
  canEditForm2: boolean;
  printForm1: boolean;
  printForm2: boolean;
};

export type WorkflowResponse = {
  err: number;
  msg: string;
  totalCount: number;
  flowMapTitles: FlowMapTitle[];
  workTables: WorkTable[];
}; 

export interface WorkFlowRequest {
  chartId: number;
  systemId?: number;
  page?: number;
  pageSize?: number;
  flowMapId?: number;
  title?: string;
  dateTime?: string;
  code?: string;
  cost?:string;
  name?:string;
  dsc?:string;
}

export interface WorkFlowState extends WorkFlowRequest {
    workFlowResponse: WorkflowResponse;
    setField: (field: string | number | symbol, value: any) => void;
    setWorkFlowResponse: (workFlowResponse: WorkflowResponse) => void;
}