import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useBrandStore } from "../store/brandStore";
import {  BrandRequest } from "../types/brand";
import api from "../api/axios";
import { SearchItem } from "../types/general";


interface BrandResponse {
  results: SearchItem[];
}

export function useBrand() {
  const { accSystem, lastId, page, usrPerm, search, setBrands } = useBrandStore();

  const query = useQuery<BrandResponse, Error, BrandResponse, unknown[]>({
    queryKey: ["brands", accSystem, lastId, page, usrPerm, search],
    queryFn: async () => {
      const params: BrandRequest = {
        accSystem,
        lastId,
        page,
        usrPerm,
        search,
      };
      const response = await api.get(
        `/api/Brand/search?accSystem=${params.accSystem}&page=${params.page}&lastId=${params.lastId}&usrPerm=${params.usrPerm}&search=${encodeURIComponent(search ?? "")}`
      );

      return response.data;
    },
    enabled: accSystem!==-1, // Only run if accSystem exists
    refetchOnWindowFocus: false, // Refetch data when the window is focused
    refetchOnReconnect: false, // Refetch data when the network reconnects
    onSuccess: (data:any) => {
      setBrands(data.results);
    },
  } as UseQueryOptions<BrandResponse, Error, BrandResponse, unknown[]>);

  return {
    //getBrands: () => query.refetch(), // Optional manual trigger
    isLoading: query.isLoading,
    error: query.error,
    brands: query.data?.results ?? [],
  };
}


