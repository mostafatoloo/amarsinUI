import { useEffect, useState } from "react";
import WorkflowParent from "./WorkflowParent";
import { useGeneralContext } from "../../context/GeneralContext";
import WorkflowRowSelect from "./WorkflowRowSelect";
import { useWorkflowRowSelectStore, useWorkflowStore } from "../../store/workflowStore";
import { useWorkflow } from "../../hooks/useWorkflow";

export const WorkflowForm = () => {
  const { chartId ,systemId} = useGeneralContext();
  const [selectedId, setSelectedId] = useState<number>(0);
  const { setField } = useWorkflowRowSelectStore();
  const {page,pageSize,dateTime,code,cost,flowMapId,name,dsc} = useWorkflowStore()
  const { workFlowResponse } = useWorkflow();

  useEffect(() => {
    setField("chartId", chartId);
    setField("workTableId", selectedId);
  }, [selectedId,chartId]);

  useEffect(()=>{
    setField("workTableId",0)
  },[systemId, chartId, page, pageSize,dateTime,code,cost,flowMapId,name,dsc])

  return (
    <div className="w-full h-full">
      <WorkflowParent setSelectedId={setSelectedId} />
      {workFlowResponse.err === 0 && workFlowResponse.workTables.length > 0 && (
        <WorkflowRowSelect />
      )}
    </div>
  );
};
