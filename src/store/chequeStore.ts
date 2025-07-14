import { create } from "zustand";
import { ChequeState } from "../types/cheque";

export const useChequeStore = create<ChequeState>()((set) => ({
  loadPaymentResponse: {
    meta: { errorCode: 0, message: "", type: "" },
    data: {
      result: {
        err: 0,
        msg: "",
        payment: {
          id: 0,
          customerId: 0,
          acc_System: 0,
          systemTitle: "",
          acc_Year: 0,
          yearTitle: "",
          srName: "",
          marketerSrName: "",
          kind: 0,
          payKind: 0,
          dat: "",
          sayadi: "",
          sarDate: "",
          usrId: 0,
          prsn: "",
          bankId: 0,
          bankName_Partners: "",
          fixSerial: "",
          no: "",
          transferenceOwner: "",
          cash_PosSystem: 0,
          cash_PosSystemTitle: "",
          dsc: "",
          partner: 0,
          accNo: "",
          amount: "",
          attachCount: 0,
          canEdit: false,
          acc_BankAccountId: 0,
          assignedAccountName: "",
          sanadNum: "",
          sanadDate: "",
          sayadiStatus: 0,
          sayadiMessage: "",
        },
      },
    },
  },
  id: 0,
  setField: (field: string, value: any) =>
    set((state) => ({ ...state, [field]: value })),
  setLoadPaymentResponse: (loadPaymentResponse) =>
    set({ loadPaymentResponse }),
}));
