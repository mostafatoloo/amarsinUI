import { create } from "zustand";
import { ProductOfferState } from "../types/productOffer";
export const useProductOfferStore = create<ProductOfferState>()((set) => ({
  productOfferResponse: {
    meta: { errorCode: 0, message: null, type: "" },
    data: { result: { err: 0, msg: null, productOffers: [], productOfferDtls: [] } },
  },
  id: 0,
  acc_Year: 0,
  acc_System: 0,
  state: 0,
  regFDate: "",
  regTDate: "",
  fDate: "",
  tDate: "",
  setField: (field: string, value: any) =>
    set((state) => ({ ...state, [field]: value })),
  setProductOfferResponse: (productOfferResponse) =>
    set({ productOfferResponse }),
}));
