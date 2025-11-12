import { UseMutateAsyncFunction } from "@tanstack/react-query";
import OkForm from "../../assets/images/GrayThem/img24_3.png";
import CancelForm from "../../assets/images/GrayThem/img24_4.png";
import {
  WorkFlowDoFlowRequest,
  WorkFlowDoFlowResponse,
  WorkflowRowSelectResponse,
} from "../../types/workflow";
import { convertToFarsiDigits } from "../../utilities/general";
import { useGeneralContext } from "../../context/GeneralContext";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ModalMessage from "../layout/ModalMessage";
import ModalForm from "../layout/ModalForm";
import WorkflowComponent from "./WorkflowComponent";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  doFlow: UseMutateAsyncFunction<any, Error, WorkFlowDoFlowRequest, unknown>;
  workFlowDoFlowResponse: WorkFlowDoFlowResponse;
  isLoadingdoFlow: boolean;
  refetchWorkTable: () => void;
  refetchWorkTableRowSelect: () => void;
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
};

const WorkflowRowSelectHeader = ({
  workFlowRowSelectResponse,
  doFlow,
  workFlowDoFlowResponse,
  isLoadingdoFlow,
  refetchWorkTable,
  refetchWorkTableRowSelect,
  selectedId,
  setSelectedId,
}: Props) => {
  const flowButtons = workFlowRowSelectResponse.flowButtons;
  const flowDescriptions = workFlowRowSelectResponse.flowDescriptions;
  const { chartId, systemId, yearId } = useGeneralContext();
  const [dsc, setDsc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  //for open/close DocumentChangeDate form
  const [isDoFlowClicked, setIsDoFlowClicked] = useState(false);
  const [isDocumentChangeDateOpen, setIsDocumentChangeDateOpen] =
    useState(false);
  //for DocumentChangeDate param
  const [flowMapId, setFlowMapId] = useState(-1); // for DocumentChangeDate param
  const [newWorkFlowRowSelectResponse, setNewWorkFlowRowSelectResponse] =
    useState(workFlowRowSelectResponse);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isModalOpen) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
        //setSelectedId(selectedId);
        if (workFlowDoFlowResponse.meta.errorCode === -1) {
          let tempId = selectedId;
          refetchWorkTableRowSelect();
          refetchWorkTable();
          setSelectedId(tempId);
        }
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen]);

  const handleDoFlow = async (
    e: React.MouseEvent<HTMLButtonElement>,
    flowMapId: number
  ) => {
    e.preventDefault();
    setIsDoFlowClicked(true);
    setFlowMapId(flowMapId);
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
    try {
      await doFlow(request);
    } catch (error) {}
  };

  useEffect(() => {
    if (isDoFlowClicked) {
      if (
        workFlowDoFlowResponse.data.result.formAfterClick.viewPath === "" ||
        workFlowDoFlowResponse.data.result.formAfterClick.viewPath === null
      ) {
        setIsModalOpen(true);
      } else {
        setNewWorkFlowRowSelectResponse((prev) => {
          return {
            ...prev,
            workTableForms: {
              ...prev.workTableForms,
              form1ViewPath:
                workFlowDoFlowResponse.data.result.formAfterClick.viewPath ??
                "",
              form2ViewPath: "",
            },
          };
        });
        setIsDocumentChangeDateOpen(true);
      }
    }
  }, [workFlowDoFlowResponse]);

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

      <div className="px-2 border text-gray-600 border-gray-300 md:h-20 md:overflow-y-auto rounded-md w-full md:w-1/3">
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
            workFlowDoFlowResponse?.meta.errorCode <= 0
              ? "bg-green-200"
              : "bg-red-200"
          }
          bgColorButton={
            workFlowDoFlowResponse?.meta.errorCode <= 0
              ? "bg-green-500"
              : "bg-red-500"
          }
          color="text-white"
          message={workFlowDoFlowResponse?.meta.message || ""}
          visibleButton={false}
        />
      )}
      {!isLoadingdoFlow &&
        isDocumentChangeDateOpen && //just for DocumentChangeDate form
        !(
          workFlowDoFlowResponse.data.result.formAfterClick.viewPath === "" ||
          workFlowDoFlowResponse.data.result.formAfterClick.viewPath === null
        ) && (
          <ModalForm
            isOpen={isDocumentChangeDateOpen}
            onClose={() => {
              setIsDocumentChangeDateOpen(false);
            }}
            children={
              <WorkflowComponent
                doFlow={doFlow}
                workFlowRowSelectResponse={newWorkFlowRowSelectResponse}
                refetchSwitch={false}
                setRefetchSwitch={() => {}}
                isLoadingdoFlow={isLoadingdoFlow}
                refetchWorkTable={refetchWorkTable}
                refetchWorkTableRowSelect={refetchWorkTableRowSelect}
                dsc={dsc}
                flowMapId={flowMapId}
                setIsDocumentChangeDateOpen={setIsDocumentChangeDateOpen}
              />
            }
            title="تاریخ سند"
            width="1/3"
            height="1/2"
          />
        )}
    </form>
  );
};

export default WorkflowRowSelectHeader;
