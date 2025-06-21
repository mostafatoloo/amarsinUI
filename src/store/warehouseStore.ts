import { create } from "zustand";
import { WarehouseState } from "../types/warehouse";

export const useWarehouseStore = create<WarehouseState>()((set) => ({
  warehouseShowIdResponse: {
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
  productCatalog: {
    data: {
      Manufacturing: "",
      Expiration: "",
      BatchCode: "",
      GenericName: "",
      GenericCode: "",
      UID: "",
      GTIN: "",
      IRC: "",
      LicenseOwner: "",
      EnglishProductName: "",
      PersianProductName: "",
      ProductCategory: "",
      ProductCategoryCode: 0,
      PackageCount: 0,
      StatusCode: 0,
    },
    statusCode: 0,
    statusMessage: "",
    CupId: 0,
    UID: "",
    IRC: "",
    ttac: false,
    SystemId: 0,
  },
  formId: 0,
  productId: 163818,
  setField: (field: string, value: any) =>
    set((state) => ({ ...state, [field]: value })),
  setWarehouseShowIdResponse: (warehouseShowIdResponse) =>
    set({ warehouseShowIdResponse }),
  setProductCatalog: (productCatalog) => set({ productCatalog }),
}));
