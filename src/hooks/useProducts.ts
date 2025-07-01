import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useProductStore } from "../store/productStore";
import { ProductSearchRequest, ProductSearchResponse } from "../types/product";

export function useProducts() {
  const { accYear, accSystem, searchTerm, page, setProductSearchResponse } =
    useProductStore();

  const query = useQuery<
    ProductSearchResponse,
    Error,
    ProductSearchResponse,
    unknown[]
  >({
    queryKey: ["products", accYear, accSystem, searchTerm, page],
    queryFn: async () => {
      const params: ProductSearchRequest = {
        accYear,
        accSystem,
        searchTerm,
        page,
      };
      const response = await api.get(
        `/api/Product/search?accSystem=${params.accSystem}&accYear=${
          params.accYear
        }&page=${params.page}&searchTerm=${encodeURIComponent(
          searchTerm ?? ""
        )}`
      );

      return response.data;
    },
    enabled: !!accSystem, // Only run if accSystem exists
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setProductSearchResponse(data);
    },
  } as UseQueryOptions<ProductSearchResponse, Error, ProductSearchResponse, unknown[]>);

  return {
    isLoading: query.isLoading,
    error: query.error,
    products: query.data?.data.result ?? [],
  };
}
