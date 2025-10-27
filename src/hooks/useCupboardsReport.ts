import {  useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useCupboardsReportStore } from "../store/cupboardsReportStore";
import {
  CupboardsReportRequest,
  CupboardsReportResponse,
} from "../types/cupboardsReport";

export function useCupboardReport() {
  const {
    systemId,
    yearId,
    err,
    errId,
    existsCupboards,
    recent,
    pageNumber,
    srchCode,
    srchFullCode,
    srchFullName,
    srchTtac,
    srchADProdDate,
    srchADExpDate,
    srchProductGTIN,
    srchProductIRC,
    srchUID,
    sortCode,
    sortFullCode,
    sortFullName,
    sortTtac,
    sortADProdDate,
    sortADExpDate,
    sortProductGTIN,
    sortProductIRC,
    sortUID,
    setCupboardsReportResponse,
  } = useCupboardsReportStore();

  const query = useQuery<
    CupboardsReportResponse,
    Error,
    CupboardsReportResponse,
    unknown[]
  >({
    queryKey: [
      "cupboardsReport",
      systemId,
      yearId,
      err,
      errId,
      existsCupboards,
      recent,
      pageNumber,
      srchCode,
      srchFullCode,
      srchFullName,
      srchTtac,
      srchADProdDate,
      srchADExpDate,
      srchProductGTIN,
      srchProductIRC,
      srchUID,
      sortCode,
      sortFullCode,
      sortFullName,
      sortTtac,
      sortADProdDate,
      sortADExpDate,
      sortProductGTIN,
      sortProductIRC,
      sortUID,
    ],
    queryFn: async () => {
      const params: CupboardsReportRequest = {
        systemId,
        yearId,
        err,
        errId,
        existsCupboards,
        recent,
        pageNumber,
        srchCode,
        srchFullCode,
        srchFullName,
        srchTtac,
        srchADProdDate,
        srchADExpDate,
        srchProductGTIN,
        srchProductIRC,
        srchUID,
        sortCode,
        sortFullCode,
        sortFullName,
        sortTtac,
        sortADProdDate,
        sortADExpDate,
        sortProductGTIN,
        sortProductIRC,
        sortUID,
      };
      const url = `/api/CupboardsReport/report?SystemId=${
        params.systemId
      }&YearId=${params.yearId}&err=${params.err}&errId=${
        params.errId
      }&existsCupboards=${params.existsCupboards}&recent=${
        params.recent
      }&pageNumber=${params.pageNumber}&srchCode=${encodeURIComponent(
        params.srchCode
      )}&srchFullCode=${encodeURIComponent(
        params.srchFullCode
      )}&srchFullName=${encodeURIComponent(
        params.srchFullName
      )}&srchTtac=${encodeURIComponent(
        params.srchTtac
      )}&srchADProdDate=${encodeURIComponent(
        params.srchADProdDate
      )}&srchADExpDate=${encodeURIComponent(
        params.srchADExpDate
      )}&srchProductGTIN=${encodeURIComponent(
        params.srchProductGTIN
      )}&srchProductIRC=${encodeURIComponent(
        params.srchProductIRC
      )}&srchUID=${encodeURIComponent(params.srchUID)}&sortCode=${
        params.sortCode
      }&sortFullCode=${params.sortFullCode}&sortFullName=${
        params.sortFullName
      }&sortTtac=${params.sortTtac}&sortADProdDate=${
        params.sortADProdDate
      }&sortADExpDate=${params.sortADExpDate}&sortProductGTIN=${
        params.sortProductGTIN
      }&sortProductIRC=${params.sortProductIRC}&sortUID=${params.sortUID}`;
      console.log("CupboardsReport url", url);
      const response = await api.get(url);
      return response.data;
    },
    refetchOnWindowFocus: false, // Refetch data when the window is focused
    refetchOnReconnect: false, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setCupboardsReportResponse(data);
    },
  } as UseQueryOptions<CupboardsReportResponse, Error, CupboardsReportResponse, unknown[]>);
  //http://apitest.dotis.ir/api/ClearBook/setProduct?ClearBookId=64&ProductId=11131&check=false
  /*const setProduct = useMutation({
      mutationFn: async (request: ClearBookProductsSetProductRequest) => {
        const response = await api.post(
          `/api/ClearBook/setProduct?ClearBookId=${request.clearBookId}&ProductId=${request.productId}&check=${request.check}`
        );
        return response.data;
      },
      onSuccess: (data: any) => {
        setClearBookProductsSetProductResponse(data);
        //queryClient.invalidateQueries({ queryKey: ["clearBookProducts"] });
      },
    });*/
  return {
    //for clearBookProducts
    refetchCupboardsReport: query.refetch,
    isLoadingCupboardsReport: query.isLoading,
    isFetchingCupboardsReport: query.isFetching,
    errorCupboardsReport: query.error,
    cupboardsReportResponse: query.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: { result: [], total_count: 0 },
    },
  };
}
