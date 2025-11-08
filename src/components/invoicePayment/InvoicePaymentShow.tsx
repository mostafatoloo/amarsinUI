import { useEffect } from "react";
import { WorkflowRowSelectResponse } from "../../types/workflow";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

const InvoicePaymentShow = ({ workFlowRowSelectResponse }: Props) => {
  useEffect(() => {
    console.log(workFlowRowSelectResponse?.msg);
  });
  return (
    <div className="w-full flex flex-col">
      <p className="mt-2 px-2 text-sm">دریافت/پرداخت</p>
    </div>
  );
};

export default InvoicePaymentShow;
