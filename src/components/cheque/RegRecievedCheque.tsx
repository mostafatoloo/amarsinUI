//کمک حسابداری
import { useEffect } from "react";
import { useCheques } from "../../hooks/useCheques";
import { useChequeStore } from "../../store/chequeStore";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import RegRecievedChequeImg from "./RegRecievedChequeImg";
import RegRecievedChequeInfo from "./RegRecievedChequeInfo";
//import RegRecievedChequeInfoSanad from "./RegRecievedChequeInfoSanad";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  refetchSwitch: boolean;
  setRefetchSwitch: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegRecievedCheque = ({
  workFlowRowSelectResponse,
  refetchSwitch,
  setRefetchSwitch,
}: Props) => {
  const {
    loadPaymentResponse,
    isLoading: isLoadingLoadPayment,
    updateFields,
    isLoadingUpdateFields,
    cashPosSystemSearch,
    paymentAttachmentResponse,
    isLoadingPaymentAttachment,
    getPayment,
    sayadChequeInquiryByPaymentIdResponse,
  } = useCheques();

  const {setField,formId:chequeFormId}=useChequeStore()
  const canEditForm = workFlowRowSelectResponse.workTableForms.canEditForm1;
  // refetch getPayment if refetchSwitch is true
  useEffect(() => {
    if (!refetchSwitch) return;
    if (refetchSwitch) {
      getPayment();
      setRefetchSwitch(false);
    }
  }, [refetchSwitch]);
  ////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if(chequeFormId!==workFlowRowSelectResponse.workTableRow.formId){
      setField("formId", workFlowRowSelectResponse.workTableRow.formId);
    }
  }, [workFlowRowSelectResponse.workTableRow.formId, setField,chequeFormId]);
  return (
    <div className="flex flex-col md:flex-row w-full text-sm gap-2 text-gray-600">
      <RegRecievedChequeInfo
        canEditForm={canEditForm}
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        loadPaymentResponse={loadPaymentResponse}
        isLoadingLoadPayment={isLoadingLoadPayment}
        updateFields={updateFields}
        isLoadingUpdateFields={isLoadingUpdateFields}
        cashPosSystemSearch={cashPosSystemSearch}
        sayadChequeInquiryByPaymentIdResponse={sayadChequeInquiryByPaymentIdResponse}
      />
      <RegRecievedChequeImg
        paymentAttachmentResponse={paymentAttachmentResponse}
        isLoadingPaymentAttachment={isLoadingPaymentAttachment}
        setField={setField}
      />
    </div>
  );
};

export default RegRecievedCheque;
