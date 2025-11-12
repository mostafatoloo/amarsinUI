import { create } from "zustand";
import { InvoiceReturnRequestState } from "../types/invoiceReturnRequest";

export const useInvoiceReturnRequestStore = create<InvoiceReturnRequestState>()(
  (set) => ({
    //api/InvoiceReturnRequest/show?Id=2778
    invoiceReturnRequestShowResponse: {
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
    invoiceReturnRequestId: -1,
    setField: (field: string, value: any) =>
      set((state) => ({ ...state, [field]: value })),
    setInvoiceReturnRequestShowResponse: (invoiceReturnRequestShowResponse) =>
      set({ invoiceReturnRequestShowResponse }),
  })
);
