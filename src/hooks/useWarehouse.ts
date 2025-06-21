import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useWarehouseStore } from "../store/warehouseStore";
import { ProductCatalog, WarehouseShowIdResponse } from "../types/warehouse";
import axios from "axios";
import { useGeneralContext } from "../context/GeneralContext";

export function useWarehouse() {
  const { formId, productId, setWarehouseShowIdResponse, setProductCatalog } =
    useWarehouseStore();
  const {url:apiUrl}=useGeneralContext()

  const warehouseShowIdQuery = useQuery<
    WarehouseShowIdResponse,
    Error,
    WarehouseShowIdResponse,
    unknown[]
  >({
    queryKey: ["warehouseShowId", formId],
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

  //for product catalog

  const productCatalogQuery = useQuery<
    ProductCatalog,
    Error,
    ProductCatalog,
    unknown[]
  >({
    queryKey: ["productCatalog", productId],
    queryFn: async () => {
      const url: string = `admin/Product/productInstancecatalog?Id=${productId}`;

      console.log(url, "url");

      const response = await axios.get(`${apiUrl}${url}`);
      return response.data;
    },
    enabled: !!productId, // Only fetch if param is available
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setProductCatalog(data);
    },
  } as UseQueryOptions<ProductCatalog, Error, ProductCatalog, unknown[]>);

  return {
    //getInventoryList: () => query.refetch(), // Optional manual trigger
    isLoadingWarehouseShowId: warehouseShowIdQuery.isLoading,
    errorWarehouseShowId: warehouseShowIdQuery.error,
    warehouseShowIdResponse: warehouseShowIdQuery.data ?? {
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
    //output for productCatalog
    isLoadingProductCatalog: productCatalogQuery.isLoading,
    errorProductCatalog: productCatalogQuery.error,
    productCatalog: productCatalogQuery.data ?? {
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
  };
}
