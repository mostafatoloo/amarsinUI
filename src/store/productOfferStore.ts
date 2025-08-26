import { create } from "zustand";
import { ProductOfferState } from "../types/productOffer";
export const useProductOfferStore = create<ProductOfferState>()((set) => ({
  //productOffer
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
  //showProductList
  idShowProductList: 0,
  productId: 0,
  acc_YearShowProductList: 0,
  brands: [],
  showProductListResponse: {
    meta: { errorCode: 0, message: "", type: "" },
    data: { result: { err: 0, msg: "", productOfferProducts: [] } },
  },
  setShowProductListResponse: (showProductListResponse) => //for showProductList
    set({ showProductListResponse }),
  setField: (field: string, value: any) =>
    set((state) => ({ ...state, [field]: value })),
  setProductOfferResponse: (productOfferResponse) => //for productOffer
    set({ productOfferResponse }),
}));
