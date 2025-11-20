import {
  //QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import api from "../api/axios";
import { useWorkflowStore } from "../store/workflowStore";
import {
  WorkFlowDoFlowRequest,
  WorkFlowFlowMapsResponse,
  WorkFlowFlowNosSearchRequest,
  WorkFlowFlowNosSearchResponse,
  WorkFlowFlowsRequest,
  WorkFlowFlowsResponse,
  WorkFlowRequest,
  WorkflowResponse,
  WorkFlowRowSelectRequest,
  WorkflowRowSelectResponse,
} from "../types/workflow";

export function useWorkflow() {
  const {
    systemId,
    page,
    pageSize,
    flowMapId,
    title,
    dateTime,
    code,
    cost,
    name,
    dsc,
    setWorkFlowResponse,
    chartId,
    workTableId,
    setWorkFlowRowSelectResponse,
    setWorkFlowDoFlowResponse,
    //for api/WFMS/flows?WorkTableId=
    workTableIdFlows,
    formIdFlows,
    flowNoFlows,
    searchFlows,
    pageFlows,
    setWorkFlowFlowsResponse,
    //for api/WFMS/flowNosSearch?systemId=4&page=1&lastId=0
    systemIdFlowNosSearch,
    pageFlowNosSearch,
    lastIdFlowNosSearch,
    searchFlowNosSearch,
    setWorkFlowFlowNosSearchResponse,
    //for api/WFMS/flowMaps?FlowNoId=4030207&SystemId=4
    flowNoIdFlowMaps,
    systemIdFlowMaps,
    setWorkFlowFlowMapsResponse,
  } = useWorkflowStore();

  //const queryClient = new QueryClient();
  const queryClient = useQueryClient();
  const query = useQuery<WorkflowResponse, Error, WorkflowResponse, unknown[]>({
    queryKey: [
      "workflow",
      chartId,
      systemId,
      page,
      pageSize,
      flowMapId,
      title,
      dateTime,
      code,
      cost,
      name,
      dsc,
    ],
    queryFn: async ({ signal }) => {
      const params: WorkFlowRequest = {
        chartId,
        systemId,
        page,
        pageSize,
        flowMapId,
        title,
        dateTime,
        code,
        cost,
        name,
        dsc,
      };

      const url: string = `api/WFMS/WorkTables?chartId=${
        params.chartId
      }&systemId=${params.systemId}&page=${params.page}&pageSize=${
        params.pageSize
      }&flowMapId=${params.flowMapId}&title=${encodeURIComponent(
        params.title ?? ""
      )}&dateTime=${encodeURIComponent(
        params.dateTime ?? ""
      )}&code=${encodeURIComponent(
        params.code ?? ""
      )}&cost=${encodeURIComponent(
        params.cost ?? ""
      )}&name=${encodeURIComponent(params.name ?? "")}&dsc=${encodeURIComponent(
        params.dsc ?? ""
      )}`;

      console.log(url, "url");
      const response = await api.get(url, { signal });
      return response.data;
    },
    enabled: systemId !== -1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    /*staleTime: 30000, // Consider data fresh for 30 seconds
    cacheTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true, // Continue refetching even when tab is not active*/
    onSuccess: (data: any) => {
      setWorkFlowResponse(data);
      queryClient.invalidateQueries({ queryKey: ["workflowRowSelect"] });
    },
  } as UseQueryOptions<WorkflowResponse, Error, WorkflowResponse, unknown[]>);

  const queryRowSelect = useQuery<
    WorkflowRowSelectResponse,
    Error,
    WorkflowRowSelectResponse,
    unknown[]
  >({
    queryKey: ["workflowRowSelect", chartId, workTableId],
    queryFn: async () => {
      const params: WorkFlowRowSelectRequest = {
        chartId,
        workTableId,
      };

      const url: string = `api/WFMS/WorkTableRowSelect?WorkTableId=${params.workTableId}&chartId=${params.chartId}`;

      console.log(url, "url");

      const response = await api.get(url);
      setWorkFlowRowSelectResponse(response.data);
      return response.data;
    },
    enabled: workTableId !== -1 && chartId !== -1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data: any) => {
      console.log(data, "data in useWorkflow queryRowSelect");
      setWorkFlowRowSelectResponse(data);
    },
  } as UseQueryOptions<WorkflowRowSelectResponse, Error, WorkflowRowSelectResponse, unknown[]>);
  //for api/WFMS/flows?WorkTableId=
  const workFlowFlowsQuery = useQuery<
    WorkFlowFlowsResponse,
    Error,
    WorkFlowFlowsResponse,
    unknown[]
  >({
    queryKey: [
      "workFlowFlows",
      workTableIdFlows,
      formIdFlows,
      flowNoFlows,
      searchFlows,
      pageFlows,
    ],
    queryFn: async () => {
      const params: WorkFlowFlowsRequest = {
        workTableIdFlows,
        formIdFlows,
        flowNoFlows,
        searchFlows,
        pageFlows,
      };
      const url: string = `api/WFMS/flows?WorkTableId=${
        params.workTableIdFlows
      }&FormId=${params.formIdFlows}&FlowNo=${
        params.flowNoFlows
      }&search=${encodeURIComponent(params.searchFlows)}&page=${
        params.pageFlows
      }`;
      const response = await api.get(url);
      return response.data;
    },
    enabled: workTableIdFlows !== -1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data: any) => {
      setWorkFlowFlowsResponse(data);
    },
  } as UseQueryOptions<WorkFlowFlowsResponse, Error, WorkFlowFlowsResponse, unknown[]>);
  //for api/WFMS/flowNosSearch?systemId=4&page=1&lastId=0
  const workFlowFlowNosSearchQuery = useQuery<
    WorkFlowFlowNosSearchResponse,
    Error,
    WorkFlowFlowNosSearchResponse,
    unknown[]
  >({
    queryKey: [
      "workFlowFlowNosSearch",
      systemIdFlowNosSearch,
      pageFlowNosSearch,
      lastIdFlowNosSearch,
      searchFlowNosSearch,
    ],
    queryFn: async () => {
      const params: WorkFlowFlowNosSearchRequest = {
        systemIdFlowNosSearch,
        pageFlowNosSearch,
        lastIdFlowNosSearch,
        searchFlowNosSearch,
      };
      const url: string = `api/WFMS/flowNosSearch?systemId=${
        params.systemIdFlowNosSearch
      }&page=${params.pageFlowNosSearch}&lastId=${
        params.lastIdFlowNosSearch
      }&search=${encodeURIComponent(params.searchFlowNosSearch)}`;
      console.log(url, "url");
      const response = await api.get(url);
      return response.data;
    },
    enabled: systemIdFlowNosSearch !== -1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data: any) => {
      setWorkFlowFlowNosSearchResponse(data);
    },
  } as UseQueryOptions<WorkFlowFlowNosSearchResponse, Error, WorkFlowFlowNosSearchResponse, unknown[]>);
  //for api/WFMS/flowMaps?FlowNoId=4030207&SystemId=4
  const workFlowFlowMapsQuery = useQuery<
    WorkFlowFlowMapsResponse,
    Error,
    WorkFlowFlowMapsResponse,
    unknown[]
  >({
    queryKey: [
      "workFlowFlowMaps",
      systemIdFlowMaps,
      flowNoIdFlowMaps,
    ],
    queryFn: async () => {
      const url: string = `api/WFMS/flowMaps?FlowNoId=${flowNoIdFlowMaps}&SystemId=${systemIdFlowMaps}`;
      console.log(url, "url");
      const response = await api.get(url);
      return response.data;
    },
    enabled: flowNoIdFlowMaps !== -1 && systemIdFlowMaps !== -1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data: any) => {
      setWorkFlowFlowMapsResponse(data);
    },
  } as UseQueryOptions<WorkFlowFlowMapsResponse, Error, WorkFlowFlowMapsResponse, unknown[]>);
  //for doFlow
  const doFlow = useMutation({
    mutationFn: async (request: WorkFlowDoFlowRequest) => {
      const url: string = `api/WFMS/doFlow`;
      const response = await api.post(url, request);
      return response.data;
    },
    onSuccess: (data: any) => {
      //queryClient.refetchQueries({ queryKey: ["workflow"] });
      //queryClient.refetchQueries({ queryKey: ["workflowRowSelect"] });
      setWorkFlowDoFlowResponse(data);
      console.log("Data refetched and response set:", data);
    },
  });

  return {
    refetchWorkTable: query.refetch,
    isRefetchingWorkTable: query.isRefetching,
    isLoading: query.isLoading,
    error: query.error,
    workFlowResponse: query.data ?? {
      err: 0,
      msg: "",
      totalCount: 0,
      flowMapTitles: [],
      workTables: [],
    },

    refetchWorkTableRowSelect: queryRowSelect.refetch,
    isRefetchingWorkTableRowSelect: queryRowSelect.isRefetching,
    isLoadingRowSelect: queryRowSelect.isLoading,
    errorRowSelect: queryRowSelect.error,
    workFlowRowSelectResponse: queryRowSelect.data ?? {
      err: 0,
      msg: "",
      workTableRow: {
        id: -1, //parent id
        regFDate: "",
        regTime: "",
        regDateTime: "",
        formId: 0,
        formTitle: "",
        formCode: "",
        formCost: 0,
        fChartName: "",
        flowMapTitle: "",
        dsc: "",
        operation: 0,
        wfmS_FlowMapId: 0,
        wfmS_FlowId: 0,
        flowNo: 0,
        canEditForm1: false,
        canEditForm2: false,
        printForm1: false,
        printForm2: false,
      },
      flowButtons: [],
      workTableForms: {
        form1Title: "",
        form1ViewPath: "",
        canEditForm1: false,
        canEditForm1Mst1: false,
        canEditForm1Mst2: false,
        canEditForm1Mst3: false,
        canEditForm1DtlDel: false,
        canEditForm1Dtl1: false,
        canEditForm1Dtl2: false,
        canEditForm1Dtl3: false,
        form2Title: "",
        form2ViewPath: "",
        canEditForm2: false,
      },
      flowDescriptions: [],
    },
    // for api/WFMS/flows?WorkTableId=
    refetchWorkFlowFlows: workFlowFlowsQuery.refetch,
    isRefetchingWorkFlowFlows: workFlowFlowsQuery.isRefetching,
    isLoadingWorkFlowFlows: workFlowFlowsQuery.isLoading,
    errorWorkFlowFlows: workFlowFlowsQuery.error,
    workFlowFlowsResponse: workFlowFlowsQuery.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: {
        result: [],
        total_count: 0,
      },
    },
    // for doFlow
    isLoadingdoFlow: doFlow.isPending,
    errordoFlow: doFlow.error,
    doFlow: doFlow.mutateAsync,
    workFlowDoFlowResponse: doFlow.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: {
        result: {
          id: 0,
          err: 0,
          msg: "",
          formAfterClick: {
            id: 0,
            title: null,
            viewPath: "-1",
          },
        },
      },
    },
    //for api/WFMS/flowNosSearch?systemId=4&page=1&lastId=0
    refetchWorkFlowFlowNosSearch: workFlowFlowNosSearchQuery.refetch,
    isRefetchingWorkFlowFlowNosSearch: workFlowFlowNosSearchQuery.isRefetching,
    isLoadingWorkFlowFlowNosSearch: workFlowFlowNosSearchQuery.isLoading,
    errorWorkFlowFlowNosSearch: workFlowFlowNosSearchQuery.error,
    workFlowFlowNosSearchResponse: workFlowFlowNosSearchQuery.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: { result: [], total_count: 0 },
    },
    //for api/WFMS/flowMaps?FlowNoId=4030207&SystemId=4
    refetchWorkFlowFlowMaps: workFlowFlowMapsQuery.refetch,
    isRefetchingWorkFlowFlowMaps: workFlowFlowMapsQuery.isRefetching,
    isLoadingWorkFlowFlowMaps: workFlowFlowMapsQuery.isLoading,
    errorWorkFlowFlowMaps: workFlowFlowMapsQuery.error,
    workFlowFlowMapsResponse: workFlowFlowMapsQuery.data ?? {
      meta: { errorCode: 0, message: "", type: "" },
      data: { result: []},
    },
  };
}
