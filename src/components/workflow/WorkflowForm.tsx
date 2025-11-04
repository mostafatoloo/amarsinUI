import { useState } from "react";
import WorkflowParent from "./WorkflowParent";
import { WorkflowChild } from "./WorkflowChild";
import {
  WorkFlowDoFlowRequest,
  WorkFlowDoFlowResponse,
  WorkflowResponse,
  WorkflowRowSelectResponse,
} from "../../types/workflow";
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from "@tanstack/react-query";

type Props = {
  workFlowResponse: WorkflowResponse;
  error: Error | null;
  isLoading: boolean;
  isLoadingRowSelect: boolean;
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  errorRowSelect: Error | null;
  doFlow: UseMutateAsyncFunction<any, Error, WorkFlowDoFlowRequest, unknown>;
  workFlowDoFlowResponse: WorkFlowDoFlowResponse;
  isLoadingdoFlow: boolean;
  refetchWorkTable: (options?: RefetchOptions) => Promise<QueryObserverResult<WorkflowResponse, Error>>
  refetchWorkTableRowSelect: ()=>void
  isRefetchingWorkTable: boolean;
  isRefetchingWorkTableRowSelect: boolean;
  refetchSwitch: boolean;
  setRefetchSwitch: React.Dispatch<React.SetStateAction<boolean>>
};

const WorkflowForm = ({
  workFlowResponse,
  error,
  isLoading,
  isLoadingRowSelect,
  workFlowRowSelectResponse,
  errorRowSelect,
  doFlow,
  workFlowDoFlowResponse,
  isLoadingdoFlow,
  refetchWorkTable,
  refetchWorkTableRowSelect,
  isRefetchingWorkTable,
  isRefetchingWorkTableRowSelect,
  refetchSwitch,
  setRefetchSwitch
}: Props) => {
  const [selectedId, setSelectedId] = useState<number>(-1);

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
        isLoadingdoFlow={isLoadingdoFlow}
        isRefetchingWorkTable={isRefetchingWorkTable}
        isRefetchingWorkTableRowSelect={isRefetchingWorkTableRowSelect}
      />
      <WorkflowChild
        selectedId={selectedId} //{selectedIdRef.current}
        setSelectedId={setSelectedId}
        workFlowResponse={workFlowResponse}
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        isLoading={isLoading} // for parent table loading
        isLoadingRowSelect={isLoadingRowSelect} // for child table loading
        errorRowSelect={errorRowSelect}
        doFlow={doFlow}
        workFlowDoFlowResponse={workFlowDoFlowResponse}
        isLoadingdoFlow={isLoadingdoFlow}
        refetchWorkTable={refetchWorkTable}
        refetchWorkTableRowSelect={refetchWorkTableRowSelect}
        refetchSwitch={refetchSwitch}
        setRefetchSwitch={setRefetchSwitch}
      />
    </div>
  );
};

export default WorkflowForm;
