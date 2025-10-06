import { create } from "zustand";
import { PreInvoiceReturnState } from "../types/preInvoiceReturn";

export const usePreInvoiceReturnStore = create<PreInvoiceReturnState>()(
  (set) => ({
    ///api/PreInvoiceReturn/warehouseTemporaryReceiptShow?Id=924865
    id: 0,
    responseWarehouseTemporaryReceiptShow: {
      meta: { errorCode: 0, message: null, type: "" },
      data: {
        result: {
          err: 0,
          msg: "",
          preInvoiceReturn: {
            id: 0,
            ordr: 0,
            dat: "",
            cId: 0,
            srName: "",
            exp: "",
          },
          preInvoiceReturnDtls: [],
          diagnosises: [],
        },
      },
    },
    //api/WarehouseTemporaryReceipt/preInvoiceDtSearch?PreInvoiceDtlId=4512744&page=1
    searchPreInvoiceDtlSearch: "",
    pagePreInvoiceDtlSearch: 1,
    preInvoiceDtlId: 0,
    responsePreInvoiceDtlSearch: {
      meta: { errorCode: 0, message: null, type: "" },
      data: { result: { total_count: 0, results: [] } },
    },
    setField: (field: string | number | symbol, value: any) =>
      set((state) => ({ ...state, [field]: value })),
    setResponseWarehouseTemporaryReceiptShow: (
      responseWarehouseTemporaryReceiptShow
    ) => set({ responseWarehouseTemporaryReceiptShow }),
    setResponsePreInvoiceDtlSearch: (responsePreInvoiceDtlSearch) =>
      set({ responsePreInvoiceDtlSearch }),
  })
);
