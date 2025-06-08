import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useWorkflowStore } from "../store/workflowStore";
import { WorkFlowRequest, WorkflowResponse } from "../types/workflow";


export function useWorkflow() {
  const { chartId, systemId, page, flowMapId, title, dateTime, code, cost, name, dsc, setWorkFlowResponse } = useWorkflowStore();

  const query = useQuery<WorkflowResponse, Error, WorkflowResponse, unknown[]>({
    queryKey: ["workflow", chartId, systemId, page, flowMapId, title, dateTime, code, cost, name, dsc],
    queryFn: async () => {
      const params: WorkFlowRequest = {
        chartId,
        systemId,
        page,
        flowMapId,
        title,
        dateTime,
        code,
        cost,
        name,
        dsc,
      };

      console.log(params, "params");
      const url: string = `api/WFMS/WorkTables?chartId=${params.chartId}&systemId=${params.systemId}&page=${params.page}&flowMapId=${params.flowMapId}&title=${params.title}&dateTime=${params.dateTime}&code=${params.code}&cost=${params.cost}&name=${params.name}&dsc=${params.dsc}`;

      console.log(url, "url");

      const response = await api.get(url);
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

