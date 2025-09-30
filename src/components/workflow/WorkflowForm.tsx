import { useState } from "react";
import WorkflowParent from "./WorkflowParent";
import { WorkflowChild } from "./WorkflowChild";
import {
  WorkFlowDoFlowRequest,
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
  isLoadingdoFlow: boolean;
  getWorkTable: (options?: RefetchOptions) => Promise<QueryObserverResult<WorkflowResponse, Error>>
};

const WorkflowForm = ({
  workFlowResponse,
  error,
  isLoading,
  isLoadingRowSelect,
  workFlowRowSelectResponse,
  errorRowSelect,
  doFlow,
  isLoadingdoFlow,
  getWorkTable
}: Props) => {
  const [selectedId, setSelectedId] = useState<number>(148201);

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
