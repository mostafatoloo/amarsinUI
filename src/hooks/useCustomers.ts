import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useCustomerStore } from "../store/customerStore";
import {
  CustomerSearchRequest,
  CustomerSearchResponse,
} from "../types/customer";

export function useCustomers() {
  const {
    systemId,
    yearId,
    centerType,
    search,
    page,
    lastId,
    usrPerm,
    setCustomerSearchResponse,
  } = useCustomerStore();

  const query = useQuery<
    CustomerSearchResponse,
    Error,
    CustomerSearchResponse,
    unknown[]
  >({
    queryKey: [
      "customers",
      systemId,
      yearId,
      centerType,
      search,
      page,
      lastId,
      usrPerm,
    ],
    queryFn: async () => {
      const params: CustomerSearchRequest = {
        systemId,
        yearId,
        centerType,
        lastId,
        page,
        usrPerm,
        search,
      };
      const url = `/api/Customer/search?systemId=${params.systemId}&yearId=${
        params.yearId
      }&centerType=${params.centerType}&page=${params.page}&lastId=${
        params.lastId
      }&usrPerm=${params.usrPerm}&search=${encodeURIComponent(search ?? "")}`;
      const response = await api.get(url);
      console.log(url, response.data, "url,response.data in customerSearch");

      return response.data;
    },
    enabled: systemId !== -1 && yearId !== -1,
    refetchOnWindowFocus: false, // Refetch data when the window is focused
    refetchOnReconnect: false, // Refetch data when the network reconnects
    onSuccess: (data: any) => {
      setCustomerSearchResponse(data);
    },
  } as UseQueryOptions<CustomerSearchResponse, Error, CustomerSearchResponse, unknown[]>);

  return {
    isLoading: query.isLoading,
    error: query.error,
    customers: query.data?.data.result.searchResults ?? [],
  };
}
