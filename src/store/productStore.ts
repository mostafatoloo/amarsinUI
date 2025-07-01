import { create } from "zustand";
import { ProductState } from "../types/product";
export const useProductStore = create<ProductState>()((set) => ({
  productSearchResponse: {
    meta: { errorCode: 0, message: "", type: "" },
    data: { totalCount: 0, result: [] },
  },
  accYear: 0,
  accSystem: 0,
  searchTerm: "",
  page: 1, // Provide a default value for page
  setField: (field: string, value: any) =>
    set((state) => ({ ...state, [field]: value })),
  setProductSearchResponse: (productSearchResponse) =>
    set({ productSearchResponse }),
}));
