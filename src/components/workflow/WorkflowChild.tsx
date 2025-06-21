import { useEffect, useState } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import { useWorkflowRowSelectStore } from "../../store/workflowStore";
import { useWorkflowStore } from "../../store/workflowStore";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useWorkflowRowSelect } from "../../hooks/useWorkflow";
import WorkflowRowSelect from "./WorkflowRowSelect";
import WorkflowComponent from "./WorkflowComponent";

type Props = {
  selectedId: number;
};

export const WorkflowChild = ({ selectedId }: Props) => {
  const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);
  const { chartId, systemId } = useGeneralContext();
  const { setField } = useWorkflowRowSelectStore();
  const { page, pageSize, dateTime, code, cost, flowMapId, name, dsc } =
    useWorkflowStore();
  const { workFlowResponse } = useWorkflow();
  const { workFlowRowSelectResponse } = useWorkflowRowSelect();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setField("chartId", chartId);
    setField("workTableId", currentSelectedId);
  }, [currentSelectedId, chartId]);

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
        <WorkflowRowSelect />
      )}
      <WorkflowComponent
        formViewPath={workFlowRowSelectResponse.workTableForms.form1ViewPath}
      />
    </>
  );
};
