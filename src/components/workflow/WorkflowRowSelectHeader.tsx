import { UseMutateAsyncFunction } from "@tanstack/react-query";
import OkForm from "../../assets/images/GrayThem/img24_3.png";
import CancelForm from "../../assets/images/GrayThem/img24_4.png";
import {
  WorkFlowDoFlowRequest,
  WorkflowRowSelectResponse,
} from "../../types/workflow";
import { convertToFarsiDigits } from "../../utilities/general";
import { useGeneralContext } from "../../context/GeneralContext";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ModalMessage from "../layout/ModalMessage";
import { useWorkflowStore } from "../../store/workflowStore";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  doFlow: UseMutateAsyncFunction<any, Error, WorkFlowDoFlowRequest, unknown>;
  isLoadingdoFlow: boolean;
  getWorkTable: () => void;
};

const WorkflowRowSelectHeader = ({
  workFlowRowSelectResponse,
  doFlow,
  isLoadingdoFlow,
  getWorkTable,
}: Props) => {
  const flowButtons = workFlowRowSelectResponse.flowButtons;
  const flowDescriptions = workFlowRowSelectResponse.flowDescriptions;
  const { workFlowDoFlowResponse } = useWorkflowStore();
  const { chartId, systemId, yearId } = useGeneralContext();
  const [dsc, setDsc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isModalOpen) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
        getWorkTable();
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen]);

  const handleDoFlow = (
    e: React.MouseEvent<HTMLButtonElement>,
    flowMapId: number
  ) => {
    e.preventDefault();
    const request: WorkFlowDoFlowRequest = {
      chartId,
      systemId,
      yearId,
      workTableId: workFlowRowSelectResponse.workTableRow.id,
      flowMapId: flowMapId,
      formId: workFlowRowSelectResponse.workTableRow.formId,
      flowNo: 0,
      flowId: workFlowRowSelectResponse.workTableRow.wfmS_FlowId,
      dsc,
      date: "",
      params: "",
      idempotencyKey: uuidv4(),
    };
    console.log(request, "request");
    doFlow(request);
    setIsModalOpen(true);

  };
  return (
    <form className="p-1 gap-1 flex flex-col sm:flex-row bg-gray-200 border border-gray-300 rounded-md w-full">
      <div className="w-full sm:w-2/3 flex flex-col gap-1">
        <div className="flex w-full">
          <label className="text-sm">هامش:</label>
          <textarea
            className="p-1 text-sm border border-slate-300 rounded-md w-full"
            value={dsc}
            onChange={(e) => setDsc(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {flowButtons.length > 0 &&
            flowButtons.map((fb) => {
              return (
                <div
                  className="flex justify-center p-1 text-sm border border-slate-300 rounded-md cursor-pointer hover:font-bold hover:bg-gray-100"
                  key={fb.id}
                >
                  <button
                    className="flex justify-center items-center gap-1"
                    title={String(fb.id)}
                    onClick={(e) => handleDoFlow(e, fb.id)}
                  >
                    {fb.imageIndex === 3 ? (
                      <img src={OkForm} alt="ok" />
                    ) : (
                      <img src={CancelForm} alt="cancel" />
                    )}
                    {fb.name}
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <div className="px-2 border text-gray-600 border-gray-300 rounded-md w-full md:w-1/3">
        {flowDescriptions.length > 0 &&
          flowDescriptions.map((fd, index) => {
            return (
              <p className="text-sm" key={index}>
                {convertToFarsiDigits(fd.usrName)}:{" "}
                {convertToFarsiDigits(fd.dsc)}
              </p>
            );
          })}
      </div>
      {!isLoadingdoFlow && (
        <ModalMessage
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          backgroundColor={
            workFlowDoFlowResponse?.meta.errorCode === -1
              ? "bg-green-200"
              : "bg-red-200"
          }
          bgColorButton={
            workFlowDoFlowResponse?.meta.errorCode === -1
              ? "bg-green-500"
              : "bg-red-500"
          }
          color="text-white"
          message={workFlowDoFlowResponse?.meta.message || ""}
          visibleButton={false}
        />
      )}
    </form>
  );
};

export default WorkflowRowSelectHeader;
