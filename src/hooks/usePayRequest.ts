import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import api from "../api/axios";
import { usePayRequestStore } from "../store/payRequestStore";
import {
  ChequeBookDtlByIdResponse,
  ChequeBookDtlSearchResponse,
  ChequeBookSearchResponse,
  PayRequestDoFirstFlowRequest,
  PayRequestInvoicesResponse,
  PayRequestRequest,
  PayRequestResponse,
  PayRequestSaveRequest,
} from "../types/payRequest";
import { RpCustomerBillsResponse } from "../types/sales";

export function usePayRequest() {
  const {
    id,
    acc_year,
    acc_system,
    state,
    regFDate,
    regTDate,
    fDate,
    tDate,
    pageNumber,
    srchId,
    srchDate,
    srchTime,
    srchDsc,
    srchAccepted,
    srchUsrName,
    srchStep,
    sortId,
    sortDat,
    sortTime,
    sortDsc,
    sortAccepted,
    sortUsrName,
    sortStep,
    setPayRequestResponse,
    payRequestId,
    systemIdPayRequestInvoice,
    yearIdPayRequestInvoice,
    customerId,
    setPayRequestInvoicesResponse,
    setRpCustomerBillsResponse,
    customerIdRpCustomerBills,
    systemIdRpCustomerBills,
    yearIdRpCustomerBills,
    fDateRpCustomerBills,
    tDateRpCustomerBills,
    // for Payment/chequeBookSearch
    setChequeBookSearchResponse,
    acc_systemChequeBookSearch,
    searchChequeBookSearch,
    pageChequeBookSearch,
    lastIdChequeBookSearch,
    // for Payment/chequeBookDtlSearch
    chequeBookIdChequeBookDtlSearch,
    pageChequeBookDtlSearch,
    lastIdChequeBookDtlSearch,
    searchChequeBookDtlSearch,
    setChequeBookDtlSearchResponse,
    // for Payment/chequeBookDtlById
    chequeBookDtlId,
    setChequeBookDtlByIdResponse,
    // for PayRequest/PayRequestSave
    setPayRequestSaveResponse,
    // for PayRequest/DoFirstFlow
    setPayRequestDoFirstFlowResponse,
    // for PayRequest/Del
    setPayRequestDelResponse,
  } = usePayRequestStore();
  const queryClient = useQueryClient();
  //for SaleReport/RpCustomerBills
  const rpCustomerBillsQuery = useQuery<
    RpCustomerBillsResponse,
    Error,
    RpCustomerBillsResponse,
    unknown[]
  >({
    queryKey: [
      "rpCustomerBills",
      customerIdRpCustomerBills,
      systemIdRpCustomerBills,
      yearIdRpCustomerBills,
      fDateRpCustomerBills,
      tDateRpCustomerBills,
    ],
    queryFn: async () => {
      console.log(
        `/api/SaleReport/RpCustomerBills?SystemId=${systemIdRpCustomerBills}&YearId=${yearIdRpCustomerBills}&CustomerId=${customerIdRpCustomerBills}&FDate=${encodeURIComponent(
          fDateRpCustomerBills
        )}&TDate=${encodeURIComponent(tDateRpCustomerBills)}`
      );
      const response = await api.get(
        `/api/SaleReport/RpCustomerBills?SystemId=${systemIdRpCustomerBills}&YearId=${yearIdRpCustomerBills}&CustomerId=${customerIdRpCustomerBills}&FDate=${encodeURIComponent(
          fDateRpCustomerBills
        )}&TDate=${encodeURIComponent(tDateRpCustomerBills)}`
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      console.log(data, "data");
      setRpCustomerBillsResponse(data);
    },
    enabled:
      customerIdRpCustomerBills !== 0 &&
      systemIdRpCustomerBills !== 0 &&
      yearIdRpCustomerBills !== 0,
  } as UseQueryOptions<RpCustomerBillsResponse, Error, RpCustomerBillsResponse, unknown[]>);

  //for PayRequest
  const payRequest = useQuery<
    PayRequestResponse,
    Error,
    PayRequestResponse,
    unknown[]
  >({
    queryKey: [
      "payRequest",
      acc_year,
      acc_system,
      state,
      regFDate,
      regTDate,
      fDate,
      tDate,
      pageNumber,
      srchId,
      srchDate,
      srchTime,
      srchDsc,
      srchAccepted,
      srchUsrName,
      srchStep,
      sortId,
      sortDat,
      sortTime,
      sortDsc,
      sortAccepted,
      sortUsrName,
      sortStep,
    ],
    queryFn: async () => {
      const params = {
        acc_year,
        acc_system,
        state,
        regFDate,
        regTDate,
        fDate,
        tDate,
        pageNumber,
        srchId,
        srchDate,
        srchTime,
        srchDsc,
        srchAccepted,
        srchUsrName,
        srchStep,
        sortId,
        sortDat,
        sortTime,
        sortDsc,
        sortAccepted,
        sortUsrName,
        sortStep,
      };
      console.log(params.sortUsrName, "params.sortUsrName in payRequestQuery");
      const url = `/api/PayRequest?YearId=${params.acc_year}&SystemId=${
        params.acc_system
      }&State=${params.state}&RegFDate=${encodeURIComponent(
        params.regFDate ?? ""
      )}&RegTDate=${encodeURIComponent(
        params.regTDate ?? ""
      )}&FDate=${encodeURIComponent(
        params.fDate ?? ""
      )}&TDate=${encodeURIComponent(params.tDate ?? "")}&PageNumber=${
        params.pageNumber
      }&SrchId=${params.srchId}${
        params.srchDate
          ? `&SrchDate=${encodeURIComponent(params.srchDate)}`
          : ""
      }${
        params.srchTime
          ? `&SrchTime=${encodeURIComponent(params.srchTime)}`
          : ""
      }${
        params.srchDsc ? `&SrchDsc=${encodeURIComponent(params.srchDsc)}` : ""
      }${params.srchAccepted ? `&SrchAccepted=${params.srchAccepted}` : ""}${
        params.srchUsrName
          ? `&SrchUsrName=${encodeURIComponent(params.srchUsrName ?? "")}`
          : ""
      }${
        params.srchStep
          ? `&SrchStep=${encodeURIComponent(params.srchStep)}`
          : ""
      }&SortId=${params.sortId}&SortDat=${params.sortDat}&SortTime=${
        params.sortTime
      }&SortDsc=${params.sortDsc}&SortAccepted=${params.sortAccepted}${
        params.sortUsrName ? `&SortUsrName=${params.sortUsrName}` : ""
      }${params.sortStep ? `&SortStep=${params.sortStep}` : ""}`;
      console.log("PayRequest url", url);
      const response = await api.get(url);
      console.log(response.data, "response.data in payRequestQuery");
      return response.data;
    },
    //enabled: acc_year !== 0 && acc_system !== 0,
    refetchOnWindowFocus: false, // Refetch data when the window is focused
    refetchOnReconnect: false, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setPayRequestResponse(data);
    },
  } as UseQueryOptions<PayRequestResponse, Error, PayRequestResponse, unknown[]>);

  //for productPriceDtl
  const payRequestDtl = useQuery<
    PayRequestResponse,
    Error,
    PayRequestResponse,
    unknown[]
  >({
    queryKey: [
      "payRequestDtl",
      id,
      acc_year,
      acc_system,
      state,
      regFDate,
      regTDate,
      fDate,
      tDate,
      pageNumber,
      srchId,
      srchDate,
      srchTime,
      srchDsc,
      srchAccepted,
      srchUsrName,
      srchStep,
      sortId,
      sortDat,
      sortTime,
      sortDsc,
      sortAccepted,
      sortUsrName,
      sortStep,
    ],
    queryFn: async () => {
      const params: PayRequestRequest = {
        id,
        acc_year,
        acc_system,
        state,
        regFDate,
        regTDate,
        fDate,
        tDate,
        pageNumber,
        srchId,
        srchDate,
        srchTime,
        srchDsc,
        srchAccepted,
        srchUsrName,
        srchStep,
        sortId,
        sortDat,
        sortTime,
        sortDsc,
        sortAccepted,
        sortUsrName,
        sortStep,
      };
      const url = `/api/PayRequest?Id=${params.id}&YearId=${
        params.acc_year
      }&SystemId=${params.acc_system}&State=${
        params.state
      }&RegFDate=${encodeURIComponent(
        params.regFDate ?? ""
      )}&RegTDate=${encodeURIComponent(
        params.regTDate ?? ""
      )}&FDate=${encodeURIComponent(
        params.fDate ?? ""
      )}&TDate=${encodeURIComponent(params.tDate ?? "")}&PageNumber=${
        params.pageNumber
      }&SrchId=${params.srchId}${
        params.srchDate
          ? `&SrchDate=${encodeURIComponent(params.srchDate)}`
          : ""
      }${
        params.srchTime
          ? `&SrchTime=${encodeURIComponent(params.srchTime)}`
          : ""
      }${
        params.srchDsc ? `&SrchDsc=${encodeURIComponent(params.srchDsc)}` : ""
      }${params.srchAccepted ? `&SrchAccepted=${params.srchAccepted}` : ""}${
        params.srchUsrName
          ? `&SrchUsrName=${encodeURIComponent(params.srchUsrName ?? "")}`
          : ""
      }${
        params.srchStep
          ? `&SrchStep=${encodeURIComponent(params.srchStep)}`
          : ""
      }&SortId=${params.sortId}&SortDat=${params.sortDat}&SortTime=${
        params.sortTime
      }&SortDsc=${params.sortDsc}&SortAccepted=${params.sortAccepted}${
        params.sortUsrName ? `&SortUsrName=${params.sortUsrName}` : ""
      }${params.sortStep ? `&SortStep=${params.sortStep}` : ""}`;
      console.log("PayRequestDtl url", url);
      const response = await api.get(url);
      console.log(response.data, "response.data in payRequestDtlQuery");
      return response.data;
    },
    //enabled: id !== 0 && acc_year !== 0 && acc_system !== 0,
    refetchOnWindowFocus: false, // Refetch data when the window is focused
    refetchOnReconnect: false, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setPayRequestResponse(data);
    },
  } as UseQueryOptions<PayRequestResponse, Error, PayRequestResponse, unknown[]>);
  //using for PayRequestShow.tsx
  /* const payRequestQuery = useQuery<
    PayRequestResponse,
    Error,
    PayRequestResponse,
    unknown[]
  >({
    queryKey: ["payRequest", id, acc_year, acc_system],
    queryFn: async () => {
      console.log(
        `/api/PayRequest?Id=${id}&YearId=${acc_year}&SystemId=${acc_system}`
      );
      const response = await api.get(
        `/api/PayRequest?Id=${id}&YearId=${acc_year}&SystemId=${acc_system}`
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      setPayRequestResponse(data);
    },
    enabled: id !== 0 && acc_year !== 0 && acc_system !== 0,
  } as UseQueryOptions<PayRequestResponse, Error, PayRequestResponse, unknown[]>);*/

  //for PayRequest/PayRequestInvoices
  const payRequestInvoicesQuery = useQuery<
    PayRequestInvoicesResponse,
    Error,
    PayRequestInvoicesResponse,
    unknown[]
  >({
    queryKey: [
      "payRequestInvoices",
      payRequestId,
      systemIdPayRequestInvoice,
      yearIdPayRequestInvoice,
      customerId,
    ],
    queryFn: async () => {
      const response = await api.get(
        `/api/PayRequest/Invoices?PayRequestId=${payRequestId}&SystemId=${systemIdPayRequestInvoice}&YearId=${yearIdPayRequestInvoice}&CustomerId=${customerId}`
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      setPayRequestInvoicesResponse(data);
    },
    enabled:
      payRequestId !== 0 &&
      systemIdPayRequestInvoice !== 0 &&
      yearIdPayRequestInvoice !== 0 &&
      customerId !== 0,
  } as UseQueryOptions<PayRequestInvoicesResponse, Error, PayRequestInvoicesResponse, unknown[]>);

  //for Payment/chequeBookSearch
  const chequeBookSearchQuery = useQuery<
    ChequeBookSearchResponse,
    Error,
    ChequeBookSearchResponse,
    unknown[]
  >({
    queryKey: [
      "chequeBookSearch",
      acc_systemChequeBookSearch,
      searchChequeBookSearch,
      pageChequeBookSearch,
      lastIdChequeBookSearch,
    ],
    queryFn: async () => {
      const url = `/api/Payment/chequeBookSearch?search=${encodeURIComponent(
        searchChequeBookSearch
      )}&page=${pageChequeBookSearch}&lastId=${lastIdChequeBookSearch}&Acc_System=${acc_systemChequeBookSearch}`;
      console.log(url, "url in chequeBookSearchQuery");
      const response = await api.get(url);
      return response.data;
    },
    onSuccess: (data: any) => {
      setChequeBookSearchResponse(data);
    },
    enabled: acc_systemChequeBookSearch !== 0,
  } as UseQueryOptions<ChequeBookSearchResponse, Error, ChequeBookSearchResponse, unknown[]>);
  //for Payment/chequeBookDtlSearch
  const chequeBookDtlSearchQuery = useQuery<
    ChequeBookDtlSearchResponse,
    Error,
    ChequeBookDtlSearchResponse,
    unknown[]
  >({
    queryKey: [
      "chequeBookDtlSearch",
      chequeBookIdChequeBookDtlSearch,
      pageChequeBookDtlSearch,
      lastIdChequeBookDtlSearch,
      searchChequeBookDtlSearch,
    ],
    queryFn: async () => {
      console.log(searchChequeBookDtlSearch, "searchChequeBookDtlSearch");
      const url = `/api/Payment/chequeBookDtlSearch?ChequeBookId=${chequeBookIdChequeBookDtlSearch}&page=${pageChequeBookDtlSearch}${
        searchChequeBookDtlSearch
          ? `&search=${encodeURIComponent(searchChequeBookDtlSearch)}`
          : ""
      }&lastId=${lastIdChequeBookDtlSearch}`;
      console.log(url, "url in chequeBookDtlSearchQuery");
      const response = await api.get(url);
      //console.log(response.data, "data in chequeBookDtlSearchQuery");
      setChequeBookDtlSearchResponse(response.data);
      return response.data;
    },
    /* onSuccess: (data: any) => {
      console.log(data, "data in chequeBookDtlSearchQuery");
      setChequeBookDtlSearchResponse(data);
    },*/
    enabled: chequeBookIdChequeBookDtlSearch !== 0,
  } as UseQueryOptions<ChequeBookDtlSearchResponse, Error, ChequeBookDtlSearchResponse, unknown[]>);
  //for Payment/chequeBookDtlById
  const chequeBookDtlByIdQuery = useQuery<
    ChequeBookDtlByIdResponse,
    Error,
    ChequeBookDtlByIdResponse,
    unknown[]
  >({
    queryKey: ["chequeBookDtlById", chequeBookDtlId],
    queryFn: async () => {
      const url = `/api/Payment/chequeBookDtlById?ChequeBookDtlId=${chequeBookDtlId}`;
      console.log(url, "url");
      const response = await api.get(url);
      return response.data;
    },
    onSuccess: (data: any) => {
      setChequeBookDtlByIdResponse(data);
    },
    enabled: chequeBookDtlId !== 0,
  } as UseQueryOptions<ChequeBookDtlByIdResponse, Error, ChequeBookDtlByIdResponse, unknown[]>);
  //for PayRequest/Save
  const payRequestSaveFn = useMutation({
    mutationFn: async (request: PayRequestSaveRequest) => {
      const response = await api.post(`/api/PayRequest/Save`, request);
      return response.data;
    },
    onSuccess: (data: any) => {
      setPayRequestSaveResponse(data);
    },
  });
  //for payRequest/DoFirstFlow
  const payRequestDoFirstFlow = useMutation({
    mutationFn: async (request: PayRequestDoFirstFlowRequest) => {
      const url: string = `api/PayRequest/doFirstFlow?ChartId=${
        request.chartId
      }&Acc_System=${request.systemId}&Acc_Year=${request.yearId}&Id=${
        request.id
      }&WFMS_FlowMapId=${request.wFMS_FlowMapId}&FlowNo=${
        request.flowNo
      }&Dsc=${encodeURIComponent(request.dsc)}`;
      console.log(request, "request", url, "url");
      const response = await api.post(url);

      return response.data;
    },
    onSuccess: (data: any) => {
      setPayRequestDoFirstFlowResponse(data);
      queryClient.invalidateQueries({ queryKey: ["payRequest"] });
    },
  });
  //for payRequest/Del
  const payRequestDel = useMutation({
    mutationFn: async (requestId: number) => {
      const response = await api.delete(`api/PayRequest/del`, {
        params: {
          id: requestId,
        },
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      setPayRequestDelResponse(data);
      queryClient.invalidateQueries({ queryKey: ["payRequest"] });
    },
  });
  return {
    //output for PayRequest (using fpr PayRequestShow)
    /*payRequestResponse: payRequestQuery.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          err: 0,
          msg: "",
          total_count: 0,
          payRequests: [],
          payRequestDtls: [],
          invcs: [],
        },
      },
    },*/
    //output for
    isLoadingPayRequest: payRequest.isLoading,
    errorPayRequest: payRequest.error,
    payRequest: payRequest.data?.data.result.payRequests,
    payRequestMeta: payRequest.data?.meta,
    payRequestTotalCount: payRequest.data?.data.result.total_count,
    refetch: payRequest.refetch,
    //for productPriceDtl
    isLoadingDtl: payRequestDtl.isLoading,
    errorDtl: payRequestDtl.error,
    payRequestDtl: payRequestDtl.data?.data.result.payRequestDtls,
    payRequestResponse: payRequestDtl.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          err: 0,
          msg: "",
          total_count: 0,
          payRequests: [],
          payRequestDtls: [],
          invcs: [],
        },
      },
    },
    //output for PayRequest/Invoices
    isLoadingPayRequestInvoices: payRequestInvoicesQuery.isLoading,
    errorPayRequestInvoices: payRequestInvoicesQuery.error,
    payRequestInvoicesResponse: payRequestInvoicesQuery.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          err: 0,
          msg: "",
          invoices: [],
        },
      },
    },
    //output for SaleReport/RpCustomerBills
    isLoadingRpCustomerBills: rpCustomerBillsQuery.isLoading,
    errorRpCustomerBills: rpCustomerBillsQuery.error,
    rpCustomerBillsResponse: rpCustomerBillsQuery.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: [],
      },
    },
    //output for Payment/chequeBookSearch
    isLoadingChequeBookSearch: chequeBookSearchQuery.isLoading,
    errorChequeBookSearch: chequeBookSearchQuery.error,
    chequeBookSearchResponse: chequeBookSearchQuery.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          total_count: 0,
          results: [],
        },
      },
    },
    //output for Payment/chequeBookDtlSearch
    isLoadingChequeBookDtlSearch: chequeBookDtlSearchQuery.isLoading,
    errorChequeBookDtlSearch: chequeBookDtlSearchQuery.error,
    chequeBookDtlSearchResponse: chequeBookDtlSearchQuery.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          total_count: 0,
          results: [],
        },
      },
    },
    //output for Payment/chequeBookDtlById
    isLoadingChequeBookDtlById: chequeBookDtlByIdQuery.isLoading,
    errorChequeBookDtlById: chequeBookDtlByIdQuery.error,
    chequeBookDtlByIdResponse: chequeBookDtlByIdQuery.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          err: 0,
          msg: "",
          checkBookDtl: {
            id: 0,
            chqBkNo: "",
          },
        },
      },
    },
    //output for PayRequest/Save
    isLoadingPayRequestSave: payRequestSaveFn.isPending,
    errorPayRequestSave: payRequestSaveFn.error,
    payRequestSave: payRequestSaveFn.mutateAsync,
    payRequestSaveResponse: payRequestSaveFn.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          id: 0,
          err: 0,
          msg: "",
          dtlErrMsgs: [],
        },
      },
    },
    //for PayRequest/DoFirstFlow
    isLoadingPayRequestDoFirstFlow: payRequestDoFirstFlow.isPending,
    errorPayRequestDoFirstFlow: payRequestDoFirstFlow.error,
    payRequestDoFirstFlow: payRequestDoFirstFlow.mutateAsync,
    payRequestDoFirstFlowResponse: payRequestDoFirstFlow.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          systemId: 0,
          id: 0,
          err: 0,
          msg: "",
          hasFlow: false,
        },
      },
    },
    //for PayRequest/Del
    isLoadingPayRequestDel: payRequestDel.isPending,
    errorPayRequestDel: payRequestDel.error,
    payRequestDel: payRequestDel.mutateAsync,
    payRequestDelResponse: payRequestDel.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          systemId: 0,
          id: 0,
          err: 0,
          msg: "",
          hasFlow: false,
        },
      },
    },
  };
}
