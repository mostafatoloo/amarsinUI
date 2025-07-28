import InvoiceShow from "../invoice/InvoiceShow";
import WarehouseShow from "../warehouse/WarehouseShow";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import InvoiceReceiptShow from "../invoiceReceipt/InvoiceReceiptShow";
import RegRecievedCheque from "../cheque/RegRecievedCheque";
import PaymentInvoiceShow from "../paymentInvoices/PaymentInvoiceShow";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

export default function WorkflowComponent({
  workFlowRowSelectResponse,
}: Props) {
  let componentToRender1: React.ReactNode | null = null;
  let componentToRender2: React.ReactNode | null = null;

  switch (workFlowRowSelectResponse.workTableForms.form1ViewPath) {
    case "Invoice/_Show":
      componentToRender1 = (
        <InvoiceShow workFlowRowSelectResponse={workFlowRowSelectResponse} />
      );
      break;
    case "WarehouseTemporaryReceipt/_WarehouseTemporaryReceiptIndent":
      componentToRender1 = (
        <WarehouseShow workFlowRowSelectResponse={workFlowRowSelectResponse} />
      );
      break;
    case "Indent/_CreateIndent":
      componentToRender1 = (
        <InvoiceReceiptShow
          canEditForm={workFlowRowSelectResponse.workTableForms.canEditForm1}
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Payment/_Cheque":
      componentToRender1 = (
        <RegRecievedCheque
          canEditForm={workFlowRowSelectResponse.workTableForms.canEditForm1}
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Payment/_PaymentInvoices":
      componentToRender1 = (
        <PaymentInvoiceShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          canEditForm={workFlowRowSelectResponse.workTableForms.canEditForm1}
        />
      );
      break;

    default:
      componentToRender1 = null;
      break;
  }
  switch (workFlowRowSelectResponse.workTableForms.form2ViewPath) {
    case "Invoice/_Show":
      componentToRender2 = (
        <InvoiceShow workFlowRowSelectResponse={workFlowRowSelectResponse} />
      );
      break;
    case "WarehouseTemporaryReceipt/_WarehouseTemporaryReceiptIndent":
      componentToRender2 = (
        <WarehouseShow workFlowRowSelectResponse={workFlowRowSelectResponse} />
      );
      break;
    case "Indent/_CreateIndent":
      componentToRender2 = (
        <InvoiceReceiptShow
          canEditForm={workFlowRowSelectResponse.workTableForms.canEditForm2}
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Payment/_Cheque":
      componentToRender2 = (
        <RegRecievedCheque
          canEditForm={workFlowRowSelectResponse.workTableForms.canEditForm2}
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Payment/_PaymentInvoices":
      componentToRender2 = (
        <PaymentInvoiceShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          canEditForm={workFlowRowSelectResponse.workTableForms.canEditForm2}
        />
      );
      break;
    default:
      componentToRender2 = null;
      break;
  }

  return (
    <div>
      {componentToRender1}
      {componentToRender2}
    </div>
  );
}
