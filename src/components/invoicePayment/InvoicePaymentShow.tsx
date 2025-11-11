import { WorkflowRowSelectResponse } from "../../types/workflow";
import InvoicePaymentShowHeader from "./InvoicePaymentShowHeader";
import { useInvoice } from "../../hooks/useInvoice";
import { useInvoiceStore } from "../../store/invoiceStore";
import InvoicePaymentShowTable from "./InvoicePaymentShowTable";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

const InvoicePaymentShow = ({ workFlowRowSelectResponse }: Props) => {
  const {
    invoicePaymentResponse,
    isLoadingInvoicePayment,
    invoicePaymentSave,
    isLoadingInvoicePaymentSave,
    invoicePaymentSaveResponse
  } = useInvoice();
  const { setField: setInvoicePaymentField, invoiceId } = useInvoiceStore();
  ////////////////////////////////////////////////////////////////////////
  if (invoiceId !== workFlowRowSelectResponse?.workTableRow.formId) {
    setInvoicePaymentField(
      "invoiceId",
      workFlowRowSelectResponse?.workTableRow.formId
    );
  }
  /*useEffect(() => {
    //console.log(workFlowRowSelectResponse?.workTableRow.formId);
    setInvoicePaymentField("invoiceId", workFlowRowSelectResponse?.workTableRow.formId);
  }, [workFlowRowSelectResponse?.workTableRow.formId]);*/

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center w-full justify-between gap-2 py-1">
        <p className="px-2 text-sm w-32">دریافت/پرداخت</p>
        <hr className="w-full border-2 border-gray-300" />
      </div>
      <InvoicePaymentShowHeader
        invoicePaymentResponse={invoicePaymentResponse}
        canEditForm={workFlowRowSelectResponse.workTableForms.canEditForm1}
        invoicePaymentSave={invoicePaymentSave}
        isLoadingInvoicePaymentSave={isLoadingInvoicePaymentSave}
        invoicePaymentSaveResponse={invoicePaymentSaveResponse}
      />
      <div className="flex items-center w-full justify-between gap-2 py-1">
        <p className="px-2 text-sm w-16">لیست</p>
        <hr className="w-full border-2 border-gray-300" />
      </div>
      <InvoicePaymentShowTable
        invoicePaymentResponse={invoicePaymentResponse}
        isLoading={isLoadingInvoicePayment}
      />
    </div>
  );
};

export default InvoicePaymentShow;
