import InvoiceShow from "../invoice/InvoiceShow";
import WarehouseShow from "../warehouse/WarehouseShow";

type Props = {
  formViewPath: string;
};
export default function WorkflowComponent({ formViewPath }: Props) {
  let componentToRender;

  switch (formViewPath) {
    case "Invoice/_Show":
      componentToRender = <InvoiceShow />;
      break;
    case "WarehouseTemporaryReceipt/_WarehouseTemporaryReceiptIndent":
      componentToRender = <WarehouseShow />;
      break;
    default:
      componentToRender = null;
      break;
  }

  return <div>{componentToRender}</div>;
}
