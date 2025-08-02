import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { usePayRequestStore } from "../store/payRequestStore";
import { PayRequestResponse } from "../types/payRequest";

export function usePayRequest() {
  const { id, acc_year, acc_system, setPayRequestResponse } =
    usePayRequestStore();
  //for PayRequest/PayRequest
  const payRequestQuery = useQuery<
    PayRequestResponse,
    Error,
    PayRequestResponse,
    unknown[]
  >({
    queryKey: ["payRequest", id, acc_year, acc_system],
    queryFn: async () => {
      console.log(
        `/api/PayRequest/PayRequest?Id=${id}&Acc_Year=${acc_year}&Acc_System=${acc_system}`
      );
      const response = await api.get(
        `/api/PayRequest/PayRequest?Id=${id}&Acc_Year=${acc_year}&Acc_System=${acc_system}`
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      setPayRequestResponse(data);
    },
  } as UseQueryOptions<PayRequestResponse, Error, PayRequestResponse, unknown[]>);

  return {
    //output for PayRequest/PayRequest
    isLoadingPayRequest: payRequestQuery.isLoading,
    errorPayRequest: payRequestQuery.error,
    payRequestResponse: payRequestQuery.data ?? {
      meta: {
        errorCode: 0,
        message: "",
        type: "",
      },
      data: {
        result: {
          err: 0,
          msg: "",
          payRequests: [],
          payRequestDtls: [],
          invcs: [],
        },
      },
    },
  };
}
