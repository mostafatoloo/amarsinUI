import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useWarehouseStore } from "../store/warehouseStore";
import { WarehouseShowIdResponse } from "../types/warehouse";

export function useWarehouse() {
  const { formId, setWarehouseShowIdResponse } = useWarehouseStore();

  const query = useQuery<
    WarehouseShowIdResponse,
    Error,
    WarehouseShowIdResponse,
    unknown[]
  >({
    queryKey: ["invoiceShowId", formId],
    queryFn: async () => {
      const url: string = `api/WarehouseTemporaryReceipt/show/${formId}`;

      console.log(url, "url");

      const response = await api.get(url);
      return response.data;
    },
    enabled: !!formId, // Only fetch if param is available
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setWarehouseShowIdResponse(data);
    },
  } as UseQueryOptions<WarehouseShowIdResponse, Error, WarehouseShowIdResponse, unknown[]>);

  return {
    //getInventoryList: () => query.refetch(), // Optional manual trigger
    isLoading: query.isLoading,
    error: query.error,
    warehouseShowIdResponse: query.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: {
        result: {
          err: 0,
          msg: "",
          response: {
            wId: 0,
            wName: "",
            warehouseTemporaryReceiptMst: {
              id: 0,
              formId: 0,
              code: "",
              dat: "",
              tim: "",
              cId: 0,
              srName: "",
              gln: "",
              blackList: false,
              exp: "",
              guid: "",
              status: 0,
              msg: "",
            },
            warehouseTemporaryReceiptIndentDtls: [],
          },
        },
      },
    },
  };
}
