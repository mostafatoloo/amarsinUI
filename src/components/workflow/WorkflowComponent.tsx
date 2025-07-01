import InvoiceShow from "../invoice/InvoiceShow";
import WarehouseShow from "../warehouse/WarehouseShow";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import InvoiceReceiptShow from "../invoiceReceipt/invoiceReceiptShow";

type Props = {
  formViewPath: string;
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

export default function WorkflowComponent({ formViewPath, workFlowRowSelectResponse }: Props) {
  let componentToRender;
  
  switch (formViewPath) {
    case "Invoice/_Show":
      componentToRender = <InvoiceShow workFlowRowSelectResponse={workFlowRowSelectResponse} />;
      break;
    case "WarehouseTemporaryReceipt/_WarehouseTemporaryReceiptIndent":
      componentToRender = <WarehouseShow workFlowRowSelectResponse={workFlowRowSelectResponse} />;
      break;
    case "Indent/_CreateIndent":
      componentToRender = <InvoiceReceiptShow workFlowRowSelectResponse={workFlowRowSelectResponse} />;      
      break;
    default:
      componentToRender = null;
      break;
  }

  return <div>{componentToRender}</div>;
}
