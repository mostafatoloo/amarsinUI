import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useTTacStore } from "../store/ttacStore";
import {
  FlowProductsSendAllRequest,
  FlowProductsSendAllResponse,
  GetInventoryBalanceRequest,
  GetInventoryBalanceResponse,
} from "../types/ttac";

export function useTtac() {
  const {
    systemId,
    yearId,
    hasErr,
    srchIRC,
    srchLotNumber,
    sortId,
    sortIRC,
    sortLotNumber,
    sortWStock,
    sortCnt,
    sortNotSent,
    sortTCnt,
    pageNumber,
    setGetInventoryBalanceResponse,
    setFlowProductsSendAllResponse,
    sendSrchCode,
    sendSrchIRC,
    sendSrchPName,
    sendSrchEventId,
    sendSrchMsg,
    sendSrchTitle,
    sendSrchDat,
    sendSrchSrName,
    sendSrchLotNumber,
    sendSrchSuccessed,
    sendSrchIsCancel,
    sendSrchFlowMapName,
    sendSrchCompleteDate,
    sendSystemId,
    sendYearId,
    sendDate,
    sendTtacSent,
    sendPageNumber,
    sendSortId,
    sendSortFId,
    sendSortTId,
    sendSortPId,
    sendSortIRC,
    sendSortPName,
    sendSortEventId,
    sendSortErr,
    sendSortMsg,
    sendSortTitle,
    sendSortCode,
    sendSortDat,
    sendSortSrName,
    sendSortLotNumber,
    sendSortCnt,
    sendSortSuccessed,
    sendSortIsCancel,
    sendSortFlowMapName,
    sendSortCompleteDate,
  } = useTTacStore();
  //for /api/TTAC/GetInventoryBalance?SystemId=4&YearId=15&SortId=0&SortIRC=0&SortLotNumber=0&SortWStock=0&SortCnt=0&SortNotSent=0&SortTCnt=0&PageNumber=1
  const query = useQuery<
    GetInventoryBalanceResponse,
    Error,
    GetInventoryBalanceResponse,
    unknown[]
  >({
    queryKey: [
      "getInventoryBalance",
      systemId,
      yearId,
      hasErr,
      srchIRC,
      srchLotNumber,
      sortId,
      sortIRC,
      sortLotNumber,
      sortWStock,
      sortCnt,
      sortNotSent,
      sortTCnt,
      pageNumber,
    ],
    queryFn: async () => {
      const params: GetInventoryBalanceRequest = {
        systemId,
        yearId,
        hasErr,
        srchIRC,
        srchLotNumber,
        sortId,
        sortIRC,
        sortLotNumber,
        sortWStock,
        sortCnt,
        sortNotSent,
        sortTCnt,
        pageNumber,
      };

      const url: string = `/api/TTAC/GetInventoryBalance?SystemId=${
        params.systemId
      }&YearId=${params.yearId}&HasErr=${
        params.hasErr
      }&SrchIRC=${encodeURIComponent(
        params.srchIRC
      )}&SrchLotNumber=${encodeURIComponent(params.srchLotNumber)}&SortId=${
        params.sortId
      }&SortIRC=${params.sortIRC}&SortLotNumber=${
        params.sortLotNumber
      }&SortWStock=${params.sortWStock}&SortCnt=${params.sortCnt}&SortNotSent=${
        params.sortNotSent
      }&SortTCnt=${params.sortTCnt}&PageNumber=${params.pageNumber}`;
      console.log(url, "url");
      const response = await api.get(url);
      return response.data;
    },
    refetchOnWindowFocus: false, // Refetch data when the window is focused
    refetchOnReconnect: false, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setGetInventoryBalanceResponse(data);
    },
  } as UseQueryOptions<GetInventoryBalanceResponse, Error, GetInventoryBalanceResponse, unknown[]>);
  //
  //for /api/TTAC/FlowProductsSendAll?SystemId=4&YearId=15&Date=1404%2F02%2F08&ttacSent=false&PageNumber=1&SortId=0&SortFId=0&SortTId=0&SortPId=0&SortIRC=0&SortPName=0&SortEventId=0&SortErr=0&SortMsg=0&SortTitle=0&SortCode=0&SortDat=0&SortSrName=0&SortLotNumber=0&SortCnt=0&SortSuccessed=0&SortIsCancel=0&SortFlowMapName=0&SortCompleteDate=0
  const flowProductsSendAllQuery = useQuery<
    FlowProductsSendAllResponse,
    Error,
    FlowProductsSendAllResponse,
    unknown[]
  >({
    queryKey: [
      "flowProductsSendAll",
      sendSrchCode,
      sendSrchIRC,
      sendSrchPName,
      sendSrchEventId,
      sendSrchMsg,
      sendSrchTitle,
      sendSrchDat,
      sendSrchSrName,
      sendSrchLotNumber,
      sendSrchSuccessed,
      sendSrchIsCancel,
      sendSrchFlowMapName,
      sendSrchCompleteDate,
      sendSystemId,
      sendYearId,
      sendDate,
      sendTtacSent,
      sendPageNumber,
      sendSortId,
      sendSortFId,
      sendSortTId,
      sendSortPId,
      sendSortIRC,
      sendSortPName,
      sendSortEventId,
      sendSortErr,
      sendSortMsg,
      sendSortTitle,
      sendSortCode,
      sendSortDat,
      sendSortSrName,
      sendSortLotNumber,
      sendSortCnt,
      sendSortSuccessed,
      sendSortIsCancel,
      sendSortFlowMapName,
      sendSortCompleteDate,
    ],
    queryFn: async () => {
      const params: FlowProductsSendAllRequest = {
        sendSrchCode,
        sendSrchIRC,
        sendSrchPName,
        sendSrchEventId,
        sendSrchMsg,
        sendSrchTitle,
        sendSrchDat,
        sendSrchSrName,
        sendSrchLotNumber,
        sendSrchSuccessed,
        sendSrchIsCancel,
        sendSrchFlowMapName,
        sendSrchCompleteDate,
        sendSystemId,
        sendYearId,
        sendDate,
        sendTtacSent,
        sendPageNumber,
        sendSortId,
        sendSortFId,
        sendSortTId,
        sendSortPId,
        sendSortIRC,
        sendSortPName,
        sendSortEventId,
        sendSortErr,
        sendSortMsg,
        sendSortTitle,
        sendSortCode,
        sendSortDat,
        sendSortSrName,
        sendSortLotNumber,
        sendSortCnt,
        sendSortSuccessed,
        sendSortIsCancel,
        sendSortFlowMapName,
        sendSortCompleteDate,
      };
      const url: string = `/api/TTAC/FlowProductsSendAll?SystemId=${
        params.sendSystemId
      }&YearId=${params.sendYearId}&Date=${params.sendDate}&ttacSent=${
        params.sendTtacSent
      }&PageNumber=${params.sendPageNumber}&SrchCode=${encodeURIComponent(
        params.sendSrchCode
      )}&SrchCompleteDate=${encodeURIComponent(
        params.sendSrchCompleteDate
      )}&SrchDat=${encodeURIComponent(
        params.sendSrchDat
      )}&SrchEventId=${encodeURIComponent(
        params.sendSrchEventId
      )}&SrchFlowMapName=${encodeURIComponent(
        params.sendSrchFlowMapName
      )}&SrchIRC=${encodeURIComponent(
        params.sendSrchIRC
      )}&SrchIsCancel=${encodeURIComponent(
        params.sendSrchIsCancel
      )}&SrchLotNumber=${encodeURIComponent(
        params.sendSrchLotNumber
      )}&SrchMsg=${encodeURIComponent(
        params.sendSrchMsg
      )}&SrchPName=${encodeURIComponent(
        params.sendSrchPName
      )}&SrchSrName=${encodeURIComponent(
        params.sendSrchSrName
      )}&SrchSuccessed=${encodeURIComponent(
        params.sendSrchSuccessed
      )}&SrchTitle=${encodeURIComponent(params.sendSrchTitle)}&SortId=${
        params.sendSortId
      }&SortFId=${params.sendSortFId}&SortTId=${params.sendSortTId}&SortPId=${
        params.sendSortPId
      }&SortIRC=${params.sendSortIRC}&SortPName=${
        params.sendSortPName
      }&SortEventId=${params.sendSortEventId}&SortErr=${
        params.sendSortErr
      }&SortMsg=${params.sendSortMsg}&SortTitle=${
        params.sendSortTitle
      }&SortCode=${params.sendSortCode}&SortDat=${
        params.sendSortDat
      }&SortSrName=${params.sendSortSrName}&SortLotNumber=${
        params.sendSortLotNumber
      }&SortCnt=${params.sendSortCnt}&SortSuccessed=${
        params.sendSortSuccessed
      }&SortIsCancel=${params.sendSortIsCancel}&SortFlowMapName=${
        params.sendSortFlowMapName
      }&SortCompleteDate=${params.sendSortCompleteDate}`;
      console.log(url, "url");
      const response = await api.get(url);
      return response.data;
    },
    //enabled: sendDate!=="",
    refetchOnWindowFocus: false, // Refetch data when the window is focused
    refetchOnReconnect: false, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setFlowProductsSendAllResponse(data);
    },
  } as UseQueryOptions<FlowProductsSendAllResponse, Error, FlowProductsSendAllResponse, unknown[]>);
  return {
    //output for GetInventoryBalance
    refetchGetInventoryBalance: () => query.refetch(),
    isFetchingGetInventoryBalance: query.isFetching,
    isLoadingGetInventoryBalance: query.isLoading,
    errorGetInventoryBalance: query.error,
    getInventoryBalanceResponse: query.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: { result: [], total_count: 0 },
    },
    //output for FlowProductsSendAll
    refetchFlowProductsSendAll: () => flowProductsSendAllQuery.refetch(),
    isFetchingFlowProductsSendAll: flowProductsSendAllQuery.isFetching,
    isLoadingFlowProductsSendAll: flowProductsSendAllQuery.isLoading,
    errorFlowProductsSendAll: flowProductsSendAllQuery.error,
    flowProductsSendAllResponse: flowProductsSendAllQuery.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: { result: [], total_count: 0 },
    },
  };
}
