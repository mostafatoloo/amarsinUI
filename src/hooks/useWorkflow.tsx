import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useWorkflowStore } from "../store/workflowStore";
import { WorkFlowRequest, WorkflowResponse } from "../types/workflow";


export function useWorkflow() {
  const { chartId, systemId, page,pageSize, flowMapId, title, dateTime, code, cost, name, dsc, setWorkFlowResponse } = useWorkflowStore();

  const query = useQuery<WorkflowResponse, Error, WorkflowResponse, unknown[]>({
    queryKey: ["workflow", chartId, systemId, page,pageSize, flowMapId, title, dateTime, code, cost, name, dsc],
    queryFn: async () => {
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

      console.log(params, "params");
      const url: string = `api/WFMS/WorkTables?chartId=${params.chartId}&systemId=${params.systemId}&page=${params.page}&pageSize=${params.pageSize}&flowMapId=${params.flowMapId}&title=${encodeURIComponent(params.title ?? "")}&dateTime=${encodeURIComponent(params.dateTime ?? "")}&code=${encodeURIComponent(params.code ?? "")}&cost=${encodeURIComponent(params.cost ?? "")}&name=${encodeURIComponent(params.name ?? "")}&dsc=${encodeURIComponent(params.dsc ?? "")}`;

      console.log(url, "url");

      const response = await api.get(url);
      console.log(response.data, "response");
      return response.data;
    },
    enabled: !!chartId , // Only fetch if params are available
    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: any) => {

      setWorkFlowResponse(data);
    },
  } as UseQueryOptions<WorkflowResponse, Error, WorkflowResponse, unknown[]>);

  return {
    isLoading: query.isLoading,
    error: query.error,
    workFlowResponse: query.data ?? { err: 0, msg: "", totalCount: 0, flowMapTitles: [], workTables: [] },
  };
}

