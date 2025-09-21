import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useWarehouseStore } from "../store/warehouseStore";
import {
  ProductCatalog,
  WarehouseShowIdResponse,
  WarehouseIndentListResponse,
  SelectIndentsRequest,
  RegRequest,
  WarehouseSearchResponse,
  WarehouseTemporaryReceiptPurchaseShowResponse,
  WarehouseTemporaryReceiptSalesPricesResponse,
  WarehouseTemporaryReceiptPurchaseRegResponse,
} from "../types/warehouse";
import axios from "axios";
import { useGeneralContext } from "../context/GeneralContext";

export function useWarehouse() {
  const {
    formId,
    productId,
    iocId,
    //for api/Warehouse/WarehouseSearch?search=%D8%A7&page=1&pageSize=30&lastId=0&CustomerTypeId=-1
    search,
    page,
    pageSize,
    lastId,
    CustomerTypeId,
    PartKey,
    //end of api/Warehouse/WarehouseSearch?search=%D8%A7&page=1&pageSize=30&lastId=0&CustomerTypeId=-1
    receiptPurchaseId, //for api/WarehouseTemporaryReceipt/purchaseShow/1107390
    id, //for api/WarehouseTemporaryReceipt/salesPrices?id=1106779&salesPriceId=1
    salesPriceId, //for api/WarehouseTemporaryReceipt/salesPrices?id=1106779&salesPriceId=1
    idReg, //for api/WarehouseTemporaryReceipt/purchaseReg?id=1106779&salesPriceId=1
    salesPriceIdReg, //for api/WarehouseTemporaryReceipt/purchaseReg?id=1106779&salesPriceId=1
    setWarehouseTemporaryReceiptPurchaseShowResponse, //for api/WarehouseTemporaryReceipt/purchaseShow/1107390
    setWarehouseShowIdResponse,
    setProductCatalog,
    setWarehouseIndentListResponse,
    setSelectIndentsResponse,
    setRegResponse,
    setWarehouseSearchResponse,
    setWarehouseTemporaryReceiptSalesPricesResponse, //for api/WarehouseTemporaryReceipt/salesPrices?id=1106779&salesPriceId=1
    setWarehouseTemporaryReceiptPurchaseRegResponse, //for api/WarehouseTemporaryReceipt/purchaseReg?id=1106779&salesPriceId=1
  } = useWarehouseStore();
  const { url: apiUrl } = useGeneralContext();
  //console.log("[useWarehouse] Setting formId to", formId)
  // for warehouseShowIdResponse
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
    enabled: formId !== 0 ? true : false, // Only fetch if param is available
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
    enabled: productId !== 0 ? true : false, // Only fetch if param is available
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setProductCatalog(data);
    },
  } as UseQueryOptions<ProductCatalog, Error, ProductCatalog, unknown[]>);

  //for warehouseSearchResponse
  const warehouseSearchQuery = useQuery<
    WarehouseSearchResponse,
    Error,
    WarehouseSearchResponse,
    unknown[]
  >({
    queryKey: [
      "warehouseSearch",
      search,
      page,
      pageSize,
      lastId,
      CustomerTypeId,
      PartKey,
    ],
    queryFn: async () => {
      const url: string = `/api/Warehouse/WarehouseSearch?search=${encodeURIComponent(
        search
      )}&page=${page}&pageSize=${pageSize}&lastId=${lastId}&CustomerTypeId=${CustomerTypeId}&PartKey=${PartKey}`;
      console.log(url, "url");
      const response = await api.get(url);
      return response.data;
    },
    onSuccess: (data: any) => {
      setWarehouseSearchResponse(data);
    },
  } as UseQueryOptions<WarehouseSearchResponse, Error, WarehouseSearchResponse, unknown[]>);

  //for warehouseTemporaryReceiptIndentListResponse
  const warehouseIndentListQuery = useQuery<
    WarehouseIndentListResponse,
    Error,
    WarehouseIndentListResponse,
    unknown[]
  >({
    queryKey: ["warehouseIndentList", iocId],
    queryFn: async () => {
      const url: string = `/api/WarehouseTemporaryReceipt/indentList/${iocId}`;
      console.log(url, "url");

      const response = await api.get(url);
      return response.data;
    },
    enabled: iocId !== 0 && iocId !== undefined ? true : false, // Only fetch if param is available
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setWarehouseIndentListResponse(data);
    },
  } as UseQueryOptions<WarehouseIndentListResponse, Error, WarehouseIndentListResponse, unknown[]>);

  //for /api/WarehouseTemporaryReceipt/purchaseShow/1107390
  const warehouseTemporaryReceiptPurchaseShowQuery = useQuery<
    WarehouseTemporaryReceiptPurchaseShowResponse,
    Error,
    WarehouseTemporaryReceiptPurchaseShowResponse,
    unknown[]
  >({
    queryKey: ["warehouseTemporaryReceiptPurchaseShow", receiptPurchaseId],
    queryFn: async () => {
      const url: string = `/api/WarehouseTemporaryReceipt/purchaseShow/${receiptPurchaseId}`;
      console.log(url, "url");
      const response = await api.get(url);
      return response.data;
    },
    onSuccess: (data: any) => {
      setWarehouseTemporaryReceiptPurchaseShowResponse(data);
    },
  } as UseQueryOptions<WarehouseTemporaryReceiptPurchaseShowResponse, Error, WarehouseTemporaryReceiptPurchaseShowResponse, unknown[]>);

  //for api/WarehouseTemporaryReceipt/salesPrices?id=1106779&salesPriceId=1
  const warehouseTemporaryReceiptSalesPricesQuery = useQuery<
    WarehouseTemporaryReceiptSalesPricesResponse,
    Error,
    WarehouseTemporaryReceiptSalesPricesResponse,
    unknown[]
  >({
    queryKey: ["warehouseTemporaryReceiptSalesPrices", id, salesPriceId],
    queryFn: async () => {
      const url: string = `/api/WarehouseTemporaryReceipt/salesPrices?id=${id}&salesPriceId=${salesPriceId}`;
      console.log(url, "url");
      const response = await api.get(url);
      return response.data;
    },
    onSuccess: (data: any) => {
      setWarehouseTemporaryReceiptSalesPricesResponse(data);
    },
  } as UseQueryOptions<WarehouseTemporaryReceiptSalesPricesResponse, Error, WarehouseTemporaryReceiptSalesPricesResponse, unknown[]>);

  //for api/WarehouseTemporaryReceipt/purchaseReg?id=1106779&salesPriceId=1
  const warehouseTemporaryReceiptPurchaseRegQuery = useQuery<
    WarehouseTemporaryReceiptPurchaseRegResponse,
    Error,
    WarehouseTemporaryReceiptPurchaseRegResponse,
    unknown[]
  >({
    queryKey: ["warehouseTemporaryReceiptPurchaseReg", idReg, salesPriceIdReg],
    queryFn: async () => {
      const url: string = `/api/WarehouseTemporaryReceipt/purchaseReg?id=${idReg}&salesPriceId=${salesPriceIdReg}`;
      console.log(url, "url");
      const response = await api.get(url);
      console.log(response.data, "response.data");
      return response.data;
    },
    enabled: idReg !== 0 && salesPriceIdReg !== 0 ? true : false, // Only fetch if param is available
    onSuccess: (data: any) => {
      setWarehouseTemporaryReceiptPurchaseRegResponse(data);
    },
  } as UseQueryOptions<WarehouseTemporaryReceiptPurchaseRegResponse, Error, WarehouseTemporaryReceiptPurchaseRegResponse, unknown[]>);
  // for editIndentsResponse
  const editIndentMutation = useMutation({
    mutationFn: async (request: SelectIndentsRequest) => {
      const url: string = `/api/WarehouseTemporaryReceipt/SelectIndents`;
      const response = await api.post(url, request);
      console.log(response.data, "response.data");
      return response.data;
    },
    onSuccess: (data: any) => {
      setSelectIndentsResponse(data);
      warehouseShowIdQuery.refetch();
    },
  });
  //for regResponse
  const regMutation = useMutation({
    mutationFn: async (request: RegRequest) => {
      const url: string = `/api/WarehouseTemporaryReceipt/Reg`;
      const response = await api.post(url, request);
      return response.data;
    },
    onSuccess: (data: any) => {
      setRegResponse(data);
    },
  });
  return {
    //output for warehouseSearchResponse
    isLoadingWarehouseSearch: warehouseSearchQuery.isLoading,
    errorWarehouseSearch: warehouseSearchQuery.error,
    warehouseSearchResponse: warehouseSearchQuery.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: {
        result: { total_count: 0, err: 0, msg: "", searchResults: [] },
      },
    },
    // output for warehouseShowId
    //getInventoryList: () => query.refetch(), // Optional manual trigger
    //getWarehouseShowIdResponse: () => warehouseShowIdQuery.refetch(), // Optional manual trigger
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
    //getProductCatalog: () => productCatalogQuery.refetch(), // Optional manual trigger
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
    //output for WarehouseTemporaryReceiptIndentList
    //getWarehouseIndentList: () => warehouseIndentListQuery.refetch(), // Optional manual trigger
    isLoadingWarehouseIndentList: warehouseIndentListQuery.isLoading,
    errorWarehouseIndentList: warehouseIndentListQuery.error,
    warehouseIndentList: warehouseIndentListQuery.data ?? {
      meta: { errorCode: -1, message: "", type: "" },
      data: {
        result: {
          err: 0,
          msg: "",
          warehouseTemporaryReceiptIndentLists: [],
        },
      },
    },
    //output for warehouseTemporaryReceiptPurchaseShowResponse
    isLoadingWarehouseTemporaryReceiptPurchaseShow:
      warehouseTemporaryReceiptPurchaseShowQuery.isLoading,
    errorWarehouseTemporaryReceiptPurchaseShow:
      warehouseTemporaryReceiptPurchaseShowQuery.error,
    warehouseTemporaryReceiptPurchaseShowResponse:
      warehouseTemporaryReceiptPurchaseShowQuery.data ?? {
        meta: { errorCode: 0, message: "", type: "" },
        data: {
          result: {
            err: 0,
            msg: "",
            result: {
              spId: 0,
              spTitle: "",
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
              warehouseTemporaryReceiptPurchaseDtls: [],
            },
          },
        },
      },
    //output for warehouseTemporaryReceiptSalesPricesResponse
    isLoadingWarehouseTemporaryReceiptSalesPrices:
      warehouseTemporaryReceiptSalesPricesQuery.isLoading,
    errorWarehouseTemporaryReceiptSalesPrices:
      warehouseTemporaryReceiptSalesPricesQuery.error,
    warehouseTemporaryReceiptSalesPricesResponse:
      warehouseTemporaryReceiptSalesPricesQuery.data ?? {
        meta: { errorCode: 0, message: "", type: "" },
        data: {
          result: { err: 0, msg: "", salesPrices: [] },
        },
      },
    //output for warehouseTemporaryReceiptPurchaseRegResponse
    isLoadingWarehouseTemporaryReceiptPurchaseReg:
      warehouseTemporaryReceiptPurchaseRegQuery.isLoading,
    errorWarehouseTemporaryReceiptPurchaseReg:
      warehouseTemporaryReceiptPurchaseRegQuery.error,
    warehouseTemporaryReceiptPurchaseRegResponse:
      warehouseTemporaryReceiptPurchaseRegQuery.data ?? {
        meta: { errorCode: 0, message: "", type: "" },
        data: { result: { id: 0, err: 0, msg: "", dtlErrMsgs: [] } },
      },
    //output for selectIndentsResponse
    isLoadingEditIndents: editIndentMutation.isPending,
    errorEditIndents: editIndentMutation.error,
    editIndents: editIndentMutation.mutateAsync,
    //output for regResponse
    isLoadingReg: regMutation.isPending,
    errorReg: regMutation.error,
    reg: regMutation.mutateAsync,
  };
}
