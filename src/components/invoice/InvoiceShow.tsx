import InvoiceShowHeader from "./InvoiceShowHeader";
import InvoiceShowTable from "./InvoiceShowTable";
import { WorkflowRowSelectResponse } from "../../types/workflow";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  caption: string;
};

const InvoiceShow = ({ workFlowRowSelectResponse, caption }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <InvoiceShowHeader workFlowRowSelectResponse={workFlowRowSelectResponse} />
      <p className="mt-2 px-2 text-sm">اقلام</p>
      <InvoiceShowTable caption={caption} />
    </div>
  );
};

export default InvoiceShow;
