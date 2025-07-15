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
//api/Payment/updateFields
  type UpdateFieldsResponse = {
    meta: Meta;
    data: {
      result: {
        id: number;
        errorCode: number;
        message: string;
        details: Array<{
          id: number;
          errorCode: number;
          message: string;
        }>;
      };
    };
  };

  type UpdateFieldsRequest = {
    fieldName: string;
    value: string;
    value2: string;
  };

  type UpdateStatus = {
    [key: string]: {
      errorCode: number;
    };
  };

  export interface ChequeState {
    id: number;
    updateStatus: UpdateStatus;
    loadPaymentResponse: LoadPaymentResponse;
    updateFieldsResponse: UpdateFieldsResponse;
    setField: (field: string, value: any) => void;
    setLoadPaymentResponse: (
      loadPaymentResponse: LoadPaymentResponse
    ) => void;
    setUpdateFieldsResponse: (
      updateFieldsResponse: UpdateFieldsResponse
    ) => void;
    setUpdateStatus: (updateStatus: UpdateStatus) => void;
  }
  