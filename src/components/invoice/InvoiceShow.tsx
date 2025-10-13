import InvoiceShowHeader from "./InvoiceShowHeader";
import InvoiceShowTable from "./InvoiceShowTable";
import { WorkflowRowSelectResponse } from "../../types/workflow";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  caption: string;
  refetchSwitch: boolean;
  setRefetchSwitch: React.Dispatch<React.SetStateAction<boolean>>;
};

const InvoiceShow = ({
  workFlowRowSelectResponse,
  caption,
  refetchSwitch,
  setRefetchSwitch,
}: Props) => {
  return (
    <div className="w-full flex flex-col">
      <InvoiceShowHeader
        workFlowRowSelectResponse={workFlowRowSelectResponse}
      />
      <p className="mt-2 px-2 text-sm">اقلام</p>
      <InvoiceShowTable
        caption={caption}
        refetchSwitch={refetchSwitch}
        setRefetchSwitch={setRefetchSwitch}
      />
    </div>
  );
};

export default InvoiceShow;
