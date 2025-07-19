import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";

import { LoadPaymentResponse, UpdateFieldsRequest } from "../types/cheque";
import { useChequeStore } from "../store/chequeStore";

export function useCheques() {
  const {
    id,
    setLoadPaymentResponse,
    setUpdateFieldsResponse,
    updateStatus,
    setUpdateStatus,
  } = useChequeStore();

  //for Payment/updateFields
  const updateFields = useMutation({
    mutationFn: async (request: UpdateFieldsRequest) => {
      console.log(request.value);
      const url: string = `api/Payment/updateFields?id=${id}&fieldName=${
        request.fieldName
      }&value=${encodeURIComponent(request.value)}&value2=${request.value2}`;
      console.log(url);
      console.log("updateStatus in updateFields",updateStatus)
      setUpdateStatus(
        Object.fromEntries(
          Object.entries(updateStatus).map(([key, value]) =>
            key ===
            request.fieldName.charAt(0).toLowerCase() +
              request.fieldName.slice(1) + "Id"
              ? [key, { ...value, isUpdating: true, validationError: false }]
              : [key, { ...value, isUpdating: false }]
          )
        )
      );
      const response = await api.post(url, request);
      return response.data;
    },
    onSuccess: (data: any, request: UpdateFieldsRequest) => {
      setUpdateFieldsResponse(data);
      const fieldName =
        request.fieldName.charAt(0).toLowerCase() + request.fieldName.slice(1);
        console.log("updateStatus in updateFields onSuccess",updateStatus)
      setUpdateStatus({
        ...updateStatus,
        [fieldName]: {
          ...updateStatus[fieldName],
          errorCode: data.meta.errorCode,
          message: data.meta.message,
        },
      });
    },
  });
  //for Payment/load
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
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setLoadPaymentResponse(data);
    },
  } as UseQueryOptions<LoadPaymentResponse, Error, LoadPaymentResponse, unknown[]>);

  return {
    //for Payment/updateFields
    isLoadingUpdateFields: updateFields.isPending,
    errorUpdateFields: updateFields.error,
    updateFields: updateFields.mutateAsync,
    //for Payment/load
    getPayment: () => query.refetch(),
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
          },
        },
      },
    },
  };
}
