import { useEffect } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import { useWorkflowStore } from "../../store/workflowStore";
import WorkflowRowSelect from "./WorkflowRowSelect";
import WorkflowComponent from "./WorkflowComponent";
import {
  WorkFlowDoFlowRequest,
  WorkFlowDoFlowResponse,
  WorkflowResponse,
  WorkflowRowSelectResponse,
} from "../../types/workflow";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

type Props = {
  isLoading: boolean;
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  workFlowResponse: WorkflowResponse;
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  isLoadingRowSelect: boolean;
  errorRowSelect: Error | null;
  doFlow: UseMutateAsyncFunction<any, Error, WorkFlowDoFlowRequest, unknown>;
  workFlowDoFlowResponse: WorkFlowDoFlowResponse;
  isLoadingdoFlow: boolean;
  refetchWorkTable: () => void;
  refetchWorkTableRowSelect: () => void;
  refetchSwitch: boolean;
  setRefetchSwitch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WorkflowChild = ({
  isLoading,
  selectedId,
  setSelectedId,
  workFlowResponse,
  workFlowRowSelectResponse,
  isLoadingRowSelect,
  errorRowSelect,
  doFlow,
  workFlowDoFlowResponse,
  isLoadingdoFlow,
  refetchWorkTable,
  refetchWorkTableRowSelect,
  refetchSwitch,
  setRefetchSwitch,
}: Props) => {
  //const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);
  const { chartId, systemId } = useGeneralContext();
  const { setField } = useWorkflowStore();
  const {
    page,
    pageSize,
    dateTime,
    code,
    cost,
    flowMapId,
    name,
    dsc,
    workTableId,
  } = useWorkflowStore();
  
  useEffect(()=>{
    setField("workTableId", -1);
  },[])

  useEffect(() => {
    setField("chartId", chartId);
    // Set workTableId based on priority:
    // 1. If selectedId is provided and valid, use it
    // 2. If workflow parameters changed and no valid selection, use first record
    // 3. If no data available, use 0
    /*console.log(
      chartId,
      workTableId,
      selectedId,
      workFlowResponse.workTables[0]?.id,
      isLoading,
      "selectedId in child"
    );*/
    if (selectedId === workTableId) {
      return;
    }
    if (selectedId !== 0) {
      setField("workTableId", selectedId);
      //console.log("enter 1");
    } else if (workFlowResponse.workTables.length > 0) {
      setField("workTableId", workFlowResponse.workTables[0].id);
      //console.log("enter 2");
    } else if (workFlowResponse.workTables.length === 0) {
      setField("workTableId", -1);
      //console.log("enter 3");
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
    isLoading,
  ]);

  return (
    <>
      {workFlowResponse.err === 0 && workFlowResponse.workTables.length > 0 && (
        <WorkflowRowSelect
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          doFlow={doFlow}
          workFlowDoFlowResponse={workFlowDoFlowResponse}
          isLoadingdoFlow={isLoadingdoFlow}
          isLoading={isLoadingRowSelect}
          error={errorRowSelect}
          refetchWorkTable={refetchWorkTable}
          refetchWorkTableRowSelect={refetchWorkTableRowSelect}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
      <WorkflowComponent
        doFlow={doFlow}
        isLoadingdoFlow={isLoadingdoFlow}
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        refetchSwitch={refetchSwitch}
        setRefetchSwitch={setRefetchSwitch}
        refetchWorkTable={refetchWorkTable}
        refetchWorkTableRowSelect={refetchWorkTableRowSelect}
      />
    </>
  );
};
