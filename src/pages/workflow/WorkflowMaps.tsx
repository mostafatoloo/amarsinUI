import { useCallback, useEffect, useRef, useState } from "react";
import WorkflowMapHeader from "../../components/workflow/workflowMap/WorkflowMapHeader";
import { useGeneralContext } from "../../context/GeneralContext";
import { DefinitionInvironment } from "../../types/definitionInvironment";
import { useWorkflowStore } from "../../store/workflowStore";
import { useWorkflow } from "../../hooks/useWorkflow";
import AutoComplet from "../../components/controls/AutoComplet";
import { DefaultOptionType } from "../../types/general";
import WorkFlowMap from "../../components/workflow/workflowMap/WorkFlowMap";
import { debounce } from "lodash";

type Props = {
  definitionInvironment: DefinitionInvironment;
};

const WorkflowMaps = ({ definitionInvironment }: Props) => {
  const {
    workFlowFlowNosSearchResponse,
    workFlowFlowMapsResponse,
    isLoadingWorkFlowFlowMaps,
    isRefetchingWorkFlowFlowMaps,
  } = useWorkflow();
  const { systemId } = useGeneralContext();
  const { setField } = useWorkflowStore();
  const [isNew, setIsNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [processTitle, setProcessTitle] = useState<DefaultOptionType | null>(
    null
  );
  //for api/WFMS/flowNosSearch?SystemId=4&Search=
  useEffect(() => {
    setField("systemIdFlowNosSearch", systemId);
    setField("pageFlowNosSearch", 1);
    setField("lastIdFlowNosSearch", 0);
    handleDebounceFilterChange("searchFlowNosSearch", search);
  }, [systemId, search]);

  ///////////////////////////////////////////////////////
  const abortControllerRef = useRef<AbortController | null>(null);
  const handleDebounceFilterChange = useCallback(
    debounce((field: string, value: string | number) => {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();

      setField(field, value);
    }, 500),
    [setField]
  );
  ////////////////////////////////////////////////////////

  const handleDelete = () => {
    setIsDelete(true);
    console.log(isDelete);
  };

  const handleEdit = () => {
    setIsEdit(true);
    console.log(isEdit,isNew);
  };

  const refetch = () => {
    console.log("refetch");
  };

  return (
    <div
      className={`sm:h-full overflow-y-scroll flex flex-col bg-gray-200 pt-2 gap-2`}
    >
      {/* Top header */}
      <WorkflowMapHeader
        setIsNew={setIsNew}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        refetch={refetch}
        definitionInvironment={definitionInvironment}
      />
      {/* search */}
      <div className="flex w-full justify-center items-center gap-2 text-sm px-2">
        <label htmlFor="processTitle" className="w-24 text-left">
          عنوان فرایند:
        </label>
        <AutoComplet
          options={workFlowFlowNosSearchResponse.data.result.map((b) => ({
            id: b.id,
            title: b.text,
          }))}
          value={processTitle}
          handleChange={(_event, newValue) => {
            return setProcessTitle(newValue as DefaultOptionType);
          }}
          setSearch={setSearch}
          showLabel={false}
          inputPadding="4px !important"
          backgroundColor="white"
          showClearIcon={false}
        />
      </div>
      <WorkFlowMap
        processTitle={processTitle as DefaultOptionType}
        workFlowMapResponse={workFlowFlowMapsResponse}
        isLoading={isLoadingWorkFlowFlowMaps || isRefetchingWorkFlowFlowMaps}
      />
    </div>
  );
};

export default WorkflowMaps;
