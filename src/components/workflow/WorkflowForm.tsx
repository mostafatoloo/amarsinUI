import {useState } from "react";
import WorkflowParent from "./WorkflowParent";
import { WorkflowChild } from "./WorkflowChild";
import { useWorkflow } from "../../hooks/useWorkflow";

const WorkflowForm = () => {
  //const selectedIdRef = useRef<number>(148201);
  const [selectedId, setSelectedId] = useState<number>(148201);
  const { workFlowResponse, error, isLoading, getWorkTable } = useWorkflow();

  const handleSelectedIdChange = (id: number) => {
    console.log("handleSelectedIdChange", id);
    setSelectedId(id);
    //selectedIdRef.current = id;
    // Force re-render of WorkflowChild only
    /*const event = new CustomEvent("selectedIdChanged", { detail: id });
    window.dispatchEvent(event);*/
  };

  return (
    <div className="w-full h-full">
      <WorkflowParent
        setSelectedId={handleSelectedIdChange}
        workFlowResponse={workFlowResponse}
        error={error}
        isLoading={isLoading}
      />
      <WorkflowChild
        selectedId={selectedId} //{selectedIdRef.current}
        handleSelectedIdChange={handleSelectedIdChange}
        getWorkTable={getWorkTable}
        workFlowResponse={workFlowResponse}
      />
    </div>
  );
};

export default WorkflowForm;
