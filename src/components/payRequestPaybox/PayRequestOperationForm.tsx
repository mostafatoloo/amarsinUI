import PayRequestShow from "../payRequest/PayRequestShow";
import { PayRequest } from "../../types/payRequest";
import { DefinitionDateTime, DefinitionInvironment } from "../../types/definitionInvironment";

type Props = {
  selectedPayRequest: PayRequest | null;
  isNew: boolean;
  setIsNew: (isNew: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  definitionDateTime: DefinitionDateTime;
  definitionInvironment: DefinitionInvironment;
};
const PayRequestOperationForm = ({
  selectedPayRequest,
  isNew,
  setIsNew,
  setIsEdit,
  definitionDateTime,
  definitionInvironment,
}: Props) => {
  ///////////////////////////////////////////////////////
  const workFlowRowSelectResponse = {
    err: 0,
    msg: "PayRequestOperationForm",
    workTableRow: {
      id: 974431,
      regFDate: selectedPayRequest?.dat ?? "",
      regTime: selectedPayRequest?.tim ?? "",
      regDateTime: selectedPayRequest?.dat + " - " + selectedPayRequest?.tim,
      formId: isNew ? 0 : selectedPayRequest?.id ?? 0,
      formTitle: "درخواست پرداخت",
      formCode: selectedPayRequest?.id.toString() ?? "",
      formCost: 0.0,
      fChartName: "مدیر عامل (برنامه نویس)",
      flowMapTitle: "ثبت اولیه",
      dsc: selectedPayRequest?.dsc ?? "",
      operation: 0,
      wfmS_FlowMapId: 0,
      wfmS_FlowId: selectedPayRequest?.flwId ?? 0,
      flowNo: 0,
      canEditForm1: true,
      canEditForm2: true,
      printForm1: true,
      printForm2: true,
    },
    flowButtons: [],
    workTableForms: {
      form1Title: "درخواست پرداخت",
      form1ViewPath: "PayRequest/_PayRequest",
      canEditForm1: true,
      canEditForm1Mst1: true,
      canEditForm1Mst2: true,
      canEditForm1Mst3: true,
      canEditForm1DtlDel: true,
      canEditForm1Dtl1: false,
      canEditForm1Dtl2: true,
      canEditForm1Dtl3: true,
      form2Title: "",
      form2ViewPath: "",
      canEditForm2: true,
    },
    flowDescriptions: [
      {
        usrName: "برنامه نویس",
        dsc: selectedPayRequest?.dsc ?? "",
      },
    ],
  };

  return (
    <div>
      <PayRequestShow
        workFlowRowSelectResponse={workFlowRowSelectResponse}
        isNew={isNew}
        setIsNew={setIsNew}
        setIsEdit={setIsEdit}
        definitionDateTime={definitionDateTime}
        definitionInvironment={definitionInvironment}
      />
    </div>
  );
};

export default PayRequestOperationForm;
