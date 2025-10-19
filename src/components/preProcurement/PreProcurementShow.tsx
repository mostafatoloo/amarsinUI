//  کارشناس تدارکات -> ثبت پیش فاکتور کالا خدمات
import { useEffect, useState } from "react";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { usePreProcurementStore } from "../../store/preProcurementStore";
import { usePreProcurement } from "../../hooks/usePreProcurement";
import PreProcurementShowHeader from "./PreProcurementShowHeader";
import ModalForm from "../layout/ModalForm";
import PayRequestAttachment from "../payRequest/PayRequestAttachment";
import PreProcurementShowTable from "./PreProcurementShowTable";
import { useGeneralContext } from "../../context/GeneralContext";
import { useAttachmentStore } from "../../store/attachmentStore";
import { v4 as uuidv4 } from "uuid";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  refetchSwitch: boolean;
  setRefetchSwitch: (refetchSwitch: boolean) => void;
};

const PreProcurementShow = ({
  workFlowRowSelectResponse,
  refetchSwitch,
  setRefetchSwitch,
}: Props) => {
  const {
    refetchPreProcurement,
    preProcurementResponse,
    isLoadingPreProcurement,
  } = usePreProcurement();
  const { setField } = usePreProcurementStore();
  const { setField: setAttachmentField } = useAttachmentStore();
  const { systemId, yearId } = useGeneralContext();
  const [showAttachment, setShowAttachment] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [guid, setGuid] = useState<string>("");
  // for refetchPreProcurement if refetchSwitch is true
  useEffect(() => {
    if (!refetchSwitch) return;
    if (refetchSwitch) {
      refetchPreProcurement();
      setRefetchSwitch(false);
    }
  }, [refetchSwitch]);
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setField("id", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId]);
  ////////////////////////////////////////////////////////for defining guid
  /*useEffect(() => {
        if (isNew) {
          setGuid(uuidv4());
        } else {
          setGuid(
            payRequestResponse.data.result.payRequest.payRequests?.[0]?.guid ?? ""
          );
        }
      }, [isNew, payRequestResponse.data.result.payRequest.payRequests?.[0]?.guid]);
    */
  useEffect(() => {
    setGuid(uuidv4());
    console.log("cnt", cnt);
  }, []);
  ////////////////////////////////////////////////////////
  useEffect(() => {
    console.log("give attachment fields");
    setAttachmentField("systemId", systemId);
    setAttachmentField("yearId", yearId);
    setAttachmentField("formId", workFlowRowSelectResponse.workTableRow.formId);
    setAttachmentField("prefix", "PreProcurement");
    setAttachmentField("GUID", guid);
  }, [workFlowRowSelectResponse.workTableRow.formId, systemId, yearId, guid]);

  return (
    <div>
      <PreProcurementShowHeader
        preProcurementResponse={preProcurementResponse}
        canEditForm={false}
        setShowAttachment={setShowAttachment}
      />
      <div className="flex items-center w-full justify-between gap-2 py-1">
        <p className="px-2 text-sm">اقلام</p>
        <hr className="w-full border-2 border-gray-300" />
      </div>
      <PreProcurementShowTable
        preProcurementResponse={preProcurementResponse}
        isLoadingPreProcurement={isLoadingPreProcurement}
        canEditForm={false}
      />
      <ModalForm
        isOpen={showAttachment}
        onClose={() => setShowAttachment(false)}
        title="ضمائم فرآیند خرید کالا/خدمت"
        width="1/2"
        height="90vh"
      >
        <PayRequestAttachment
          formId={
            //isNew || workFlowRowSelectResponse.msg === "PayRequestOperationForm" //is not in workflow menu
            //? 0
            //:
            workFlowRowSelectResponse.workTableRow.formId
          }
          prefix={"PreProcurement"}
          setCnt={setCnt}
          guid={guid}
        />
      </ModalForm>
    </div>
  );
};

export default PreProcurementShow;
