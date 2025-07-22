import { useCheques } from "../../hooks/useCheques";
import { useChequeStore } from "../../store/chequeStore";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import RegRecievedChequeImg from "./RegRecievedChequeImg";
import RegRecievedChequeInfo from "./RegRecievedChequeInfo";

type Props = {
  canEditForm: boolean;
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  handleSelectedIdChange: (id: number) => void;
  selectedId: number;
};

const RegRecievedCheque = ({
  canEditForm,
  workFlowRowSelectResponse,
  handleSelectedIdChange,
  selectedId,
}: Props) => {
  const {
    loadPaymentResponse,
    isLoading: isLoadingLoadPayment,
    updateFields,
    isLoadingUpdateFields,
    cashPosSystemSearch,
    paymentAttachmentResponse,
    isLoadingPaymentAttachment,
  } = useCheques();

  const {setField}=useChequeStore()

  return (
    <div className="flex flex-col md:flex-row w-full text-sm gap-2 text-gray-600">
      <RegRecievedChequeInfo
        canEditForm={canEditForm}
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        handleSelectedIdChange={handleSelectedIdChange}
        selectedId={selectedId}
        loadPaymentResponse={loadPaymentResponse}
        isLoadingLoadPayment={isLoadingLoadPayment}
        updateFields={updateFields}
        isLoadingUpdateFields={isLoadingUpdateFields}
        cashPosSystemSearch={cashPosSystemSearch}
      />
      <RegRecievedChequeImg
        formId={workFlowRowSelectResponse.workTableRow.formId}
        paymentAttachmentResponse={paymentAttachmentResponse}
        isLoadingPaymentAttachment={isLoadingPaymentAttachment}
        setField={setField}
      />
    </div>
  );
};

export default RegRecievedCheque;
