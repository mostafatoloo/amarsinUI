import { useEffect, useRef } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import { useWorkflowRowSelectStore } from "../../store/workflowStore";
import { useWorkflowStore } from "../../store/workflowStore";
import { useWorkflowRowSelect } from "../../hooks/useWorkflow";
import WorkflowRowSelect from "./WorkflowRowSelect";
import WorkflowComponent from "./WorkflowComponent";
import { WorkflowResponse } from "../../types/workflow";

type Props = {
  selectedId: number;
  handleSelectedIdChange: (id: number) => void;
  workFlowResponse: WorkflowResponse;
};

export const WorkflowChild = ({
  selectedId,
  handleSelectedIdChange,
  workFlowResponse,
}: Props) => {
  //const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);
  const { chartId, systemId } = useGeneralContext();
  const { setField } = useWorkflowRowSelectStore();
  const { page, pageSize, dateTime, code, cost, flowMapId, name, dsc } =
    useWorkflowStore();
  const { workFlowRowSelectResponse, isLoading, error } =
    useWorkflowRowSelect();

  // Keep track of previous workflow parameters to detect actual changes
  const prevParamsRef = useRef({
    systemId,
    chartId,
    page,
    pageSize,
    dateTime,
    code,
    cost,
    flowMapId,
    name,
    dsc,
  });

  useEffect(() => {
    setField("chartId", chartId);
    
    const currentParams = {
      systemId,
      chartId,
      page,
      pageSize,
      dateTime,
      code,
      cost,
      flowMapId,
      name,
      dsc,
    };

    // Check if workflow parameters actually changed
    const paramsChanged = JSON.stringify(currentParams) !== JSON.stringify(prevParamsRef.current);
    
    // Set workTableId based on priority:
    // 1. If selectedId is provided and valid, use it
    // 2. If workflow parameters changed and no valid selection, use first record
    // 3. If no data available, use 0
    if (selectedId !== 0) {
      setField("workTableId", selectedId);
    } else if (paramsChanged && workFlowResponse.workTables.length > 0) {
      setField("workTableId", workFlowResponse.workTables[0].id);
    } else if (workFlowResponse.workTables.length === 0) {
      setField("workTableId", 0);
    }

    // Update the previous params reference
    prevParamsRef.current = currentParams;
  }, [
    selectedId,
    chartId,
    systemId,
    page,
    pageSize,
    dateTime,
    code,
    cost,
    flowMapId,
    name,
    dsc,
  ]);

  return (
    <>
      {workFlowResponse.err === 0 && workFlowResponse.workTables.length > 0 && (
        <WorkflowRowSelect
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          isLoading={isLoading}
          error={error}
        />
      )}
      <WorkflowComponent
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        handleSelectedIdChange={handleSelectedIdChange}
        selectedId={selectedId}
      />
    </>
  );
};
