import { Meta } from "./general";
//for /api/TTAC/GetInventoryBalance?SystemId=4&YearId=15&SortId=0&SortIRC=0&SortLotNumber=0&SortWStock=0&SortCnt=0&SortNotSent=0&SortTCnt=0&PageNumber=1
interface GetInventoryBalanceRequest {
  systemId: number;
  yearId: number;
  hasErr: boolean;
  srchIRC: string;
  srchLotNumber: string;
  sortId: number;
  sortIRC: number;
  sortLotNumber: number;
  sortWStock: number;
  sortCnt: number;
  sortNotSent: number;
  sortTCnt: number;
  pageNumber: number;
}
interface GetInventoryBalanceItem {
  id: number;
  irc: string;
  lotNumber: string;
  wStock: number;
  cnt: number;
  notSent: number;
  tCnt: number;
}

interface GetInventoryBalanceData {
  result: GetInventoryBalanceItem[];
  total_count: number;
}

interface GetInventoryBalanceResponse {
  meta: Meta;
  data: GetInventoryBalanceData;
}
//http://apitest.dotis.ir/api/TTAC/FlowProductsSendAll?SystemId=4&YearId=15&Date=1404%2F02%2F08&ttacSent=false&PageNumber=1&SortId=0&SortFId=0&SortTId=0&SortPId=0&SortIRC=0&SortPName=0&SortEventId=0&SortErr=0&SortMsg=0&SortTitle=0&SortCode=0&SortDat=0&SortSrName=0&SortLotNumber=0&SortCnt=0&SortSuccessed=0&SortIsCancel=0&SortFlowMapName=0&SortCompleteDate=0
interface FlowProductsSendAllRequest {
  sendSystemId: number;
  sendYearId: number;
  sendDate: string;
  sendTtacSent: boolean;
  sendPageNumber: number;
  sendSrchCode: string;
  sendSrchIRC: string;
  sendSrchPName: string;
  sendSrchEventId: string;
  sendSrchMsg: string;
  sendSrchTitle: string;
  sendSrchDat: string;
  sendSrchSrName: string;
  sendSrchLotNumber: string;
  sendSrchSuccessed: string;
  sendSrchIsCancel: string;
  sendSrchFlowMapName: string;
  sendSrchCompleteDate: string;
  sendSortId: number;
  sendSortFId: number;
  sendSortTId: number;
  sendSortPId: number;
  sendSortIRC: number;
  sendSortPName: number;
  sendSortEventId: number;
  sendSortErr: number;
  sendSortMsg: number;
  sendSortTitle: number;
  sendSortCode: number;
  sendSortDat: number;
  sendSortSrName: number;
  sendSortLotNumber: number;
  sendSortCnt: number;
  sendSortSuccessed: number;
  sendSortIsCancel: number;
  sendSortFlowMapName: number;
  sendSortCompleteDate: number;
}
interface FlowProductsSendAllResult {
  id: number;
  fId: number;
  tId: number;
  pId: number;
  irc: string;
  pName: string;
  eventId: string;
  err: number;
  msg: string;
  title: string;
  code: string;
  dat: string;
  srName: string;
  lotNumber: string;
  cnt: string;
  successed: number;
  isCancel: number;
  flowMapName: string;
  completeDate: string;
}

interface FlowProductsSendAllData {
  result: FlowProductsSendAllResult[];
  total_count: number;
}

interface FlowProductsSendAllResponse {
  meta: Meta;
  data: FlowProductsSendAllData;
}

export interface ttacState
  extends GetInventoryBalanceRequest,
    FlowProductsSendAllRequest {
  getInventoryBalanceResponse: GetInventoryBalanceResponse;
  flowProductsSendAllResponse: FlowProductsSendAllResponse;
  setField: (field: string | number | symbol, value: any) => void;
  setGetInventoryBalanceResponse: (
    getInventoryBalanceResponse: GetInventoryBalanceResponse
  ) => void;
  setFlowProductsSendAllResponse: (
    flowProductsSendAllResponse: FlowProductsSendAllResponse
  ) => void;
}
