import { useEffect } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import { useWorkflowStore } from "../../store/workflowStore";
import WorkflowRowSelect from "./WorkflowRowSelect";
import WorkflowComponent from "./WorkflowComponent";
import { WorkFlowDoFlowRequest, WorkflowResponse, WorkflowRowSelectResponse } from "../../types/workflow";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

type Props = {
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>
  workFlowResponse: WorkflowResponse;
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  isLoadingRowSelect: boolean;
  errorRowSelect: Error | null;
  doFlow: UseMutateAsyncFunction<any, Error, WorkFlowDoFlowRequest, unknown>;
  isLoadingdoFlow: boolean;
  getWorkTable: () => void;
  getWorkTableRowSelect:() => void;
};

export const WorkflowChild = ({
  selectedId,
  setSelectedId,
  workFlowResponse,
  workFlowRowSelectResponse,
  isLoadingRowSelect,
  errorRowSelect,
  doFlow,
  isLoadingdoFlow,
  getWorkTable,
  getWorkTableRowSelect
}: Props) => {
  //const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);
  const { chartId, systemId } = useGeneralContext();
  const { setField } = useWorkflowStore();
  const { page, pageSize, dateTime, code, cost, flowMapId, name, dsc } =
    useWorkflowStore();

  useEffect(() => {
    setField("chartId", chartId);
  
    // Set workTableId based on priority:
    // 1. If selectedId is provided and valid, use it
    // 2. If workflow parameters changed and no valid selection, use first record
    // 3. If no data available, use 0
    if (selectedId !== 0) {
      //console.log(selectedId,"selectedId in child")
      setField("workTableId", selectedId);
    } else if ( workFlowResponse.workTables.length > 0) {
      setField("workTableId", workFlowResponse.workTables[0].id);
    } else if (workFlowResponse.workTables.length === 0) {
      setField("workTableId", 0);
    }

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
          doFlow={doFlow}
          isLoadingdoFlow={isLoadingdoFlow}
          isLoading={isLoadingRowSelect}
          error={errorRowSelect}
          getWorkTable={getWorkTable}
          getWorkTableRowSelect={getWorkTableRowSelect}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
      <WorkflowComponent
        workFlowRowSelectResponse={workFlowRowSelectResponse}
      />
    </>
  );
};
