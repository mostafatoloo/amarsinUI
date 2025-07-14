interface LoadPaymentResponse {
    meta: {
      errorCode: number;
      message: string;
      type: string; // Example: "Payment"
    };
    data: {
      result: {
        err: number;
        msg: string;
        payment: Payment;
      };
    };
  }
  
  interface Payment {
    id: number;
    customerId: number;
    acc_System: number;
    systemTitle: string;
    acc_Year: number;
    yearTitle: string;
    srName: string;
    marketerSrName: string;
    kind: number;
    payKind: number;
    dat: string;    // date in Persian calendar format
    sayadi: string;
    sarDate: string; // date in Persian calendar format
    usrId: number;
    prsn: string;
    bankId: number;
    bankName_Partners: string;
    fixSerial: string;
    no: string;
    transferenceOwner: string;
    cash_PosSystem: number;
    cash_PosSystemTitle: string;
    dsc: string;
    partner: number;
    accNo: string;
    amount: string; // amount as string
    attachCount: number;
    canEdit: boolean;
    acc_BankAccountId: number;
    assignedAccountName: string;
    sanadNum: string;
    sanadDate: string;
    sayadiStatus: number;
    sayadiMessage: string;
  }
  export interface ChequeState {
    id: number;
    loadPaymentResponse: LoadPaymentResponse;
    setField: (field: string, value: any) => void;
    setLoadPaymentResponse: (
      loadPaymentResponse: LoadPaymentResponse
    ) => void;
  }
  