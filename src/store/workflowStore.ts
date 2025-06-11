import { create } from "zustand";
import { WorkFlowState } from "../types/workflow";

export const useWorkflowStore = create<WorkFlowState>()((set) => ({
  chartId: 1,
  systemId: 4,
  page: 1,
  pageSize: 10,
  flowMapId: -1,
  title: "",
  dateTime: "",
  code: "",
  cost: "",
  name: "",
  dsc: "",
  workFlowResponse: { err: 0, msg: "", totalCount: 0, flowMapTitles: [], workTables: [] },
  setField: (field: string | number | symbol, value: any) =>
    set((state) => ({ 
      ...state, 
      [field]: value
    })),
  setWorkFlowResponse: (workFlowResponse) => 
    set({ workFlowResponse }),
}));


