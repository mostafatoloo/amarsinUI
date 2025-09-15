import WorkflowRowSelectHeader from "./WorkflowRowSelectHeader";
import { Skeleton } from "@mui/material";
import {
  WorkFlowDoFlowRequest,
  WorkflowRowSelectResponse,
} from "../../types/workflow";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  doFlow: UseMutateAsyncFunction<any, Error, WorkFlowDoFlowRequest, unknown>;
  isLoadingdoFlow:boolean;
  isLoading: boolean;
  error: Error | null;
  getWorkTable: () => void;
};

const WorkflowRowSelect = ({
  workFlowRowSelectResponse,
  doFlow,
  isLoadingdoFlow,
  isLoading,
  error,
  getWorkTable,
}: Props) => {
  if (error) return <div>Error: {error.message} </div>;
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : workFlowRowSelectResponse.err !== 0 ? (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          {workFlowRowSelectResponse.msg}
        </p>
      ) : (
        <div className="w-full mt-2">
          <WorkflowRowSelectHeader
            workFlowRowSelectResponse={workFlowRowSelectResponse}
            doFlow={doFlow}
            isLoadingdoFlow={isLoadingdoFlow}
            getWorkTable={getWorkTable}
          />
        </div>
      )}
    </div>
  );
};

export default WorkflowRowSelect;
