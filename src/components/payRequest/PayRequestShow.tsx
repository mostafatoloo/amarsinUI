import { useEffect } from "react";
import { usePayRequest } from "../../hooks/usePayRequest";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import PayRequestShowHeader from "./PayRequestShowHeader";
import { usePayRequestStore } from "../../store/payRequestStore";
import { useAuthStore } from "../../store/authStore";
import { AuthApiResponse } from "../../types/auth";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

const PayRequestShow = ({ workFlowRowSelectResponse }: Props) => {
  const { payRequestResponse } = usePayRequest();
  const { setField : setPayRequestField} = usePayRequestStore();
  const { authApiResponse } = useAuthStore();
  const initData = authApiResponse?.data.result.initData;

  useEffect(() => {
    //console.log(workFlowRowSelectResponse?.workTableRow.formId);
    setPayRequestField("Id", workFlowRowSelectResponse?.workTableRow.formId);
    setPayRequestField("acc_year", initData?.yearId);
    setPayRequestField("acc_system", initData?.systemId);
  }, [workFlowRowSelectResponse?.workTableRow.formId, initData?.yearId, initData?.systemId]);


  return (
    <div>
      <PayRequestShowHeader
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        payRequestResponse={payRequestResponse}
        authApiResponse={authApiResponse as AuthApiResponse}
      />
    </div>
  );
};

export default PayRequestShow;
