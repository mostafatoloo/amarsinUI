import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";

import { LoadPaymentResponse } from "../types/cheque";
import { useChequeStore } from "../store/chequeStore";

export function useCheques() {
  const { id, setLoadPaymentResponse } = useChequeStore();

  const query = useQuery<
    LoadPaymentResponse,
    Error,
    LoadPaymentResponse,
    unknown[]
  >({
    queryKey: ["loadPayment", id],
    queryFn: async () => {
      const url: string = `/api/Payment/load/${id}`;

      console.log(url, "url");

      const response = await api.get(url);
      return response.data;
    },
    enabled: id!==0 ? true : false , // Only fetch if param is available
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setLoadPaymentResponse(data);
    },
  } as UseQueryOptions<LoadPaymentResponse, Error, LoadPaymentResponse, unknown[]>);

  return {
    //getInventoryList: () => query.refetch(), // Optional manual trigger
    isLoading: query.isLoading,
    error: query.error,
    loadPaymentResponse: query.data ?? {
        meta: { errorCode: 0, message: "", type: "" },
        data: {
            result: {
                err: 0,
                msg: "",
                payment: {
                    id: 0,
                    customerId: 0,
                    acc_System: 0,
                    systemTitle: "",
                    acc_Year: 0,
                    yearTitle: "",
                    srName: "",
                    marketerSrName: "",
                    kind: 0,
                    payKind: 0,
                    dat: "",
                    sayadi: "",
                    sarDate: "",
                    usrId: 0,
                    prsn: "",
                    bankId: 0,
                    bankName_Partners: "",
                    fixSerial: "",
                    no: "",
                    transferenceOwner: "",
                    cash_PosSystem: 0,
                    cash_PosSystemTitle: "",
                    dsc: "",
                    partner: 0,
                    accNo: "",
                    amount: "",
                    attachCount: 0,
                    canEdit: false,
                    acc_BankAccountId: 0,
                    assignedAccountName: "",
                    sanadNum: "",
                    sanadDate: "",
                    sayadiStatus: 0,
                    sayadiMessage: "",
                }
            }
        }
    }
  };
}
