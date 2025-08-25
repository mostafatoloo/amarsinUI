import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useProductOfferStore } from "../store/productOfferStore";
import {
  ProductOfferRequest,
  ProductOfferResponse,
} from "../types/productOffer";

export function useProductOffer() {
  const {
    id,
    acc_Year,
    acc_System,
    state,
    regFDate,
    regTDate,
    fDate,
    tDate,
    setProductOfferResponse,
  } = useProductOfferStore();

  const query = useQuery<
    ProductOfferResponse,
    Error,
    ProductOfferResponse,
    unknown[]
  >({
    queryKey: [
      "productOffer",
      acc_Year,
      acc_System,
      state,
      regFDate,
      regTDate,
      fDate,
      tDate,
    ],
    queryFn: async () => {
      const params = {
        acc_Year,
        acc_System,
        state,
        regFDate,
        regTDate,
        fDate,
        tDate,
      };
      const url = `/api/ProductOffer/ProductOffer?Acc_Year=${params.acc_Year}&Acc_System=${params.acc_System}&State=${params.state}&RegFDate=${params.regFDate}&RegTDate=${params.regTDate}&FDate=${params.fDate}&TDate=${params.tDate}`;
      const response = await api.get(url);

      return response.data;
    },
    //enabled: !acc_Year || !acc_System,
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      console.log("data", data);
      setProductOfferResponse(data);
    },
  } as UseQueryOptions<ProductOfferResponse, Error, ProductOfferResponse, unknown[]>);

  const queryDtl = useQuery<
    ProductOfferResponse,
    Error,
    ProductOfferResponse,
    unknown[]
  >({
    queryKey: [
      "productOfferDtl",
      id,
      acc_Year,
      acc_System,
      state,
      regFDate,
      regTDate,
      fDate,
      tDate,
    ],
    queryFn: async () => {
      const params: ProductOfferRequest = {
        id,
        acc_Year,
        acc_System,
        state,
        regFDate,
        regTDate,
        fDate,
        tDate,
      };
      const url = `/api/ProductOffer/ProductOffer?Id=${params.id}&Acc_Year=${params.acc_Year}&Acc_System=${params.acc_System}&State=${params.state}&RegFDate=${params.regFDate}&RegTDate=${params.regTDate}&FDate=${params.fDate}&TDate=${params.tDate}`;
      console.log("ProductOfferDtl url", url);
      const response = await api.get(url);

      return response.data;
    },
    //enabled: !acc_Year || !acc_System,
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      console.log("data", data);
      setProductOfferResponse(data);
    },
  } as UseQueryOptions<ProductOfferResponse, Error, ProductOfferResponse, unknown[]>);

  return {
    isLoading: query.isLoading,
    error: query.error,
    productOffer: query.data?.data.result.productOffers,
    //
    isLoadingDtl: queryDtl.isLoading,
    errorDtl: queryDtl.error,
    productOfferDtl: queryDtl.data?.data.result.productOfferDtls,
  };
}
