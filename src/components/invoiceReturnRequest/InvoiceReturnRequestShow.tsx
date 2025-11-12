import { useEffect, useState } from "react";
import { useInvoiceReturnRequest } from "../../hooks/useInvoiceReturnRequest";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { useInvoiceReturnRequestStore } from "../../store/invoiceReturnRequestStore";
import { useGeneralContext } from "../../context/GeneralContext";
import { useAttachmentStore } from "../../store/attachmentStore";
import InvoiceReturnRequestShowHeader from "./InvoiceReturnRequestShowHeader";
import ModalForm from "../layout/ModalForm";
import PreProcurementAttachment from "../preProcurement/PreProcurementAttachment";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  refetchSwitch: boolean;
  setRefetchSwitch: (refetchSwitch: boolean) => void;
};

const InvoiceReturnRequestShow = ({
  workFlowRowSelectResponse,
  refetchSwitch,
  setRefetchSwitch,
}: Props) => {
  const { refetchInvoiceReturnRequestShow, invoiceReturnRequestShowResponse } = useInvoiceReturnRequest();
  const { setField, invoiceReturnRequestId } = useInvoiceReturnRequestStore();
  const { setField: setAttachmentField } = useAttachmentStore();
  //const { systemId, yearId } = useGeneralContext();
  const [showAttachment, setShowAttachment] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [guid, setGuid] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);
  const [prefix, setPrefix] = useState("Procurement");
  const [dsc,setDsc]=useState("")

  if (invoiceReturnRequestId!==workFlowRowSelectResponse.workTableRow.formId)
    {
      setField("invoiceReturnRequestId", workFlowRowSelectResponse.workTableRow.formId);
    }

  // for refetchInvoiceReturnRequestShow if refetchSwitch is true
  useEffect(() => {
    if (!refetchSwitch) return;
    if (refetchSwitch) {
      refetchInvoiceReturnRequestShow();
      setRefetchSwitch(false);
    }
  }, [refetchSwitch]);
  return (
    <div>
      <InvoiceReturnRequestShowHeader
        invoiceReturnRequestShowResponse={invoiceReturnRequestShowResponse}
        canEditForm={false}
        dsc={dsc}
        setDsc={setDsc}
        setShowAttachment={setShowAttachment}
      />
      <div className="flex items-center w-full justify-between gap-2 py-1">
        <p className="px-2 text-sm">اقلام</p>
        <hr className="w-full border-2 border-gray-300" />
      </div>
      {/*<PreProcurementShowTable
        preProcurementResponse={preProcurementResponse}
        isLoadingPreProcurement={isLoadingPreProcurement}
        canEditForm={false}
      />*/}
      <ModalForm
        isOpen={showAttachment}
        onClose={() => setShowAttachment(false)}
        title="ضمائم فرآیند خرید کالا/خدمت"
        width="1/2"
        height="90vh"
      >
        <PreProcurementAttachment
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formId={workFlowRowSelectResponse.workTableRow.formId} //PreProcurementId
          prefix={prefix} //form
          setPrefix={setPrefix}
          setCnt={setCnt}
          guid={guid}
        />
      </ModalForm>
    </div>
  );
};

export default InvoiceReturnRequestShow;
