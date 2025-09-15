import { useState } from "react";
import WorkflowParent from "./WorkflowParent";
import { WorkflowChild } from "./WorkflowChild";
import { useWorkflow } from "../../hooks/useWorkflow";

const WorkflowForm = () => {
  const [selectedId, setSelectedId] = useState<number>(148201);
  const {
    workFlowResponse,
    error,
    isLoading,
    isLoadingRowSelect,
    workFlowRowSelectResponse,
    errorRowSelect,
    doFlow,
    isLoadingdoFlow,
    getWorkTable,
  } = useWorkflow();

  const handleSelectedIdChange = (id: number) => {
    //console.log(id, "id in WorkflowForm");
    setSelectedId(id);
  };

  return (
    <div className="w-full h-full">
      <WorkflowParent
        selectedId={selectedId}
        setSelectedId={handleSelectedIdChange}
        workFlowResponse={workFlowResponse}
        error={error}
        isLoading={isLoading}
      />
      <WorkflowChild
        selectedId={selectedId} //{selectedIdRef.current}
        workFlowResponse={workFlowResponse}
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        isLoadingRowSelect={isLoadingRowSelect}
        errorRowSelect={errorRowSelect}
        doFlow={doFlow}
        isLoadingdoFlow={isLoadingdoFlow}
        getWorkTable={getWorkTable}
      />
    </div>
  );
};

export default WorkflowForm;
