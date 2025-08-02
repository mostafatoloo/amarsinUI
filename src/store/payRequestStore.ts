import { create } from "zustand";
import { PayRequestState } from "../types/payRequest";
export const usePayRequestStore = create<PayRequestState>()((set) => ({
  id: 0,
  acc_year: 0,
  acc_system: 0,
  payRequestResponse: {
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
  setField: (field: string | number | symbol, value: any) =>
    set((state) => ({ ...state, [field]: value })),
  setPayRequestResponse: (payRequestResponse) => set({ payRequestResponse }),
}));
