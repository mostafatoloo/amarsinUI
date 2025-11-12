import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useInvoiceReturnRequestStore } from "../store/invoiceReturnRequestStore";
import { InvoiceReturnRequestShowResponse } from "../types/invoiceReturnRequest";

export function useInvoiceReturnRequest() {
  const { invoiceReturnRequestId, setInvoiceReturnRequestShowResponse } =
    useInvoiceReturnRequestStore();
  //api/InvoiceReturnRequest/show?Id=2778
  const invoiceReturnRequestShowQuery = useQuery<
    InvoiceReturnRequestShowResponse,
    Error,
    InvoiceReturnRequestShowResponse,
    unknown[]
  >({
    queryKey: ["invoiceReturnRequestShow", invoiceReturnRequestId],
    queryFn: async () => {
      const url: string = `/api/InvoiceReturnRequest/show?Id=${invoiceReturnRequestId}`;

      console.log(url, "url");

      const response = await api.get(url);
      return response.data;
    },
    enabled: invoiceReturnRequestId !== -1, // Only fetch if param is available
    refetchOnWindowFocus: false, // Refetch data when the window is focused
    refetchOnReconnect: false, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setInvoiceReturnRequestShowResponse(data);
    },
  } as UseQueryOptions<InvoiceReturnRequestShowResponse, Error, InvoiceReturnRequestShowResponse, unknown[]>);

  return {
    //api/InvoiceReturnRequest/show?Id=
    refetchInvoiceReturnRequestShow: () =>
      invoiceReturnRequestShowQuery.refetch(), // Optional manual trigger
    isLoadingInvoiceReturnRequestShow: invoiceReturnRequestShowQuery.isLoading,
    errorInvoiceReturnRequestShow: invoiceReturnRequestShowQuery.error,
    invoiceReturnRequestShowResponse: invoiceReturnRequestShowQuery.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          invoiceReturnRequest: {
            id: 0,
            ordr: 0,
            dat: "",
            cId: 0,
            srName: "",
            dsc: "",
            usrName: "",
            flwId: 0,
            flowMapName: "",
            canEdit: 0,
            attachCount: 0,
          },
          invoiceReturnRequestDtls: [],
          diagnosises: [],
        },
      },
    },
  };
}
