import { useEffect } from "react";
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
  getWorkTable: () => void;
  workFlowResponse: WorkflowResponse;
};

export const WorkflowChild = ({ selectedId, handleSelectedIdChange, getWorkTable, workFlowResponse }: Props) => {
  //const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);
  const { chartId, systemId } = useGeneralContext();
  const { setField } = useWorkflowRowSelectStore();
  const { page, pageSize, dateTime, code, cost, flowMapId, name, dsc } =
    useWorkflowStore();
  const { workFlowRowSelectResponse, isLoading, error } = useWorkflowRowSelect();

  /*useEffect(() => {
    const handleSelectedIdChange = (event: CustomEvent) => {
      setCurrentSelectedId(event.detail);
    };

    window.addEventListener(
      "selectedIdChanged",
      handleSelectedIdChange as EventListener
    );
    return () => {
      window.removeEventListener(
        "selectedIdChanged",
        handleSelectedIdChange as EventListener
      );
    };
  }, []);*/

  useEffect(() => {
    console.log("selectedId", selectedId);
    setField("chartId", chartId);
    setField("workTableId", selectedId)//currentSelectedId);
    //getWorkTableRowSelect()
  }, [selectedId,//currentSelectedId, 
    chartId]);

  useEffect(() => {
    setField(
      "workTableId",
      workFlowResponse.workTables.length > 0
        ? workFlowResponse.workTables[0].id
        : 0
    );
  }, [
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
        formViewPath={workFlowRowSelectResponse.workTableForms.form1ViewPath}
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        handleSelectedIdChange={handleSelectedIdChange}
        getWorkTable={getWorkTable}
      />
    </>
  );
};
