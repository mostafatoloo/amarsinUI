import { useRef } from "react";
import WorkflowParent from "./WorkflowParent";
import { WorkflowChild } from "./WorkflowChild";

const WorkflowForm = () => {
  const selectedIdRef = useRef<number>(0);
  
  const handleSelectedIdChange = (id: number) => {
    selectedIdRef.current = id;
    // Force re-render of WorkflowChild only
    const event = new CustomEvent('selectedIdChanged', { detail: id });
    window.dispatchEvent(event);
  };

  return (
    <div className="w-full h-full">
      <WorkflowParent setSelectedId={handleSelectedIdChange} />
      <WorkflowChild selectedId={selectedIdRef.current}/>
    </div>
  );
};

export default WorkflowForm;
