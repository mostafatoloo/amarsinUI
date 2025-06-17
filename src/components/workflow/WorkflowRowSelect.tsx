import { useWorkflowRowSelect } from "../../hooks/useWorkflow";
import Skeleton from "../layout/Skeleton";
import WorkflowRowSelectHeader from "./WorkflowRowSelectHeader";

const WorkflowRowSelect = () => {
  const { error, isLoading, workFlowRowSelectResponse } =
    useWorkflowRowSelect();

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
          <WorkflowRowSelectHeader/>
        </div>
      )}
    </div>
  );
};

export default WorkflowRowSelect;
