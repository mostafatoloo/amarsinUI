import { useEffect, useState } from "react";
import { useInvoiceReturnRequest } from "../../hooks/useInvoiceReturnRequest";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { useInvoiceReturnRequestStore } from "../../store/invoiceReturnRequestStore";
//import { useGeneralContext } from "../../context/GeneralContext";
//import { useAttachmentStore } from "../../store/attachmentStore";
import InvoiceReturnRequestShowHeader from "./InvoiceReturnRequestShowHeader";
import ModalForm from "../layout/ModalForm";
import InvoiceReturnRequestShowTable from "./InvoiceReturnRequestShowTable";
import InvoiceReturnRequestInvoiceList from "./InvoiceReturnRequestInvoiceList";
import InvoiceReturnRequestAttachments from "./InvoiceReturnRequestAttachments";
import { v4 as uuidv4 } from "uuid";

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
  const {
    refetchInvoiceReturnRequestShow,
    invoiceReturnRequestShowResponse,
    isLoadingInvoiceReturnRequestShow,
    invoiceReturnRequestInvoiceListResponse,
    isLoadingInvoiceReturnRequestInvoiceList,
    invoiceReturnRequestRegisterDtl,
  } = useInvoiceReturnRequest();
  const { setField, invoiceReturnRequestId } = useInvoiceReturnRequestStore();
  //const { setField: setAttachmentField } = useAttachmentStore();
  //const { systemId, yearId } = useGeneralContext();
  const [showAttachment, setShowAttachment] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [guid, setGuid] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);
  const [prefix, setPrefix] = useState("InvoiceReturnRequest");
  const [dsc, setDsc] = useState("");

  const [editClicked, setEditClicked] = useState(false);

  if (
    invoiceReturnRequestId !== workFlowRowSelectResponse.workTableRow.formId
  ) {
    setField(
      "invoiceReturnRequestId",
      workFlowRowSelectResponse.workTableRow.formId
    );
  }

  // for refetchInvoiceReturnRequestShow if refetchSwitch is true
  useEffect(() => {
    if (!refetchSwitch) return;
    if (refetchSwitch) {
      refetchInvoiceReturnRequestShow();
      setRefetchSwitch(false);
    }
  }, [refetchSwitch]);
  ////////////////////////////////////////////////////////for defining guid
  useEffect(() => {
    setGuid(uuidv4());
    console.log("cnt", cnt);
  }, []);

  ////////////////////////////////////////////////////////////////////////  ////////////////////////////////////////////////////////////////////////
  const handleEditClickClose = () => {
    setEditClicked(false);
    // setOtId(0);
  };
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
      <InvoiceReturnRequestShowTable
        invoiceReturnRequestShowResponse={invoiceReturnRequestShowResponse}
        isLoadingInvoiceReturnRequestShow={isLoadingInvoiceReturnRequestShow}
        setEditClicked={setEditClicked}
      />
      <ModalForm
        isOpen={showAttachment}
        onClose={() => setShowAttachment(false)}
        title="ضمائم مرجوعی"
        width="1/2"
        height="90vh"
      >
        <InvoiceReturnRequestAttachments
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formId={workFlowRowSelectResponse.workTableRow.formId} //PreProcurementId
          prefix={prefix} //form
          setPrefix={setPrefix}
          setCnt={setCnt}
          guid={guid}
        />
      </ModalForm>
      {/*open order cup list if editIcon is clicked*/}
      <ModalForm
        isOpen={editClicked}
        onClose={handleEditClickClose}
        title="لیست اقلام مرتبط"
        width="1/2"
      >
        <InvoiceReturnRequestInvoiceList
          invoiceReturnRequestInvoiceListResponse={invoiceReturnRequestInvoiceListResponse}
          isLoadingInvoiceReturnRequestInvoiceList={isLoadingInvoiceReturnRequestInvoiceList}
          invoiceReturnRequestRegisterDtl={invoiceReturnRequestRegisterDtl}
          handleEditClickClose={handleEditClickClose}
        />
      </ModalForm>
    </div>
  );
};

export default InvoiceReturnRequestShow;
