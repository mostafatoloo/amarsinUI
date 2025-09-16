import { create } from "zustand";
import { PayRequestState } from "../types/payRequest";
import { RpCustomerBillsResponse } from "../types/sales";
export const usePayRequestStore = create<PayRequestState>()((set) => ({
  //for PayRequest
  id: 0,
  yearId: 0,
  systemId: 0,
  state: -1,
  regFDate: "",
  regTDate: "",
  fDate: "",
  tDate: "",
  pageNumber: 1,
  srchId: 0,
  srchDate: "",
  srchTime: "",
  srchDsc: "",
  srchAccepted: 0,
  srchUsrName: "",
  srchStep: "",
  sortId: 0,
  sortDat: 0,
  sortTime: 0,
  sortDsc: 0,
  sortAccepted: 0,
  sortUsrName: 0,
  sortStep: 0,  
  srchSrName: "",
  srchAmount: 0,
  sortSrName: 0,
  sortAmount: 0,
  payRequestResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: {
        err: 0,
        msg: "",
        payRequest: {
          total_count: 0,
          payRequests: [],
        },
        payRequests: [],
        payRequestDtls: [],
        invcs: [],
      },
    },
  },
  //for PayRequest/PayRequestInvoices
  payRequestInvoicesResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: {
        err: 0,
        msg: "",
        invoices: [],
      },
    },
  },
  payRequestId: 0,
  systemIdPayRequestInvoice: 0,
  yearIdPayRequestInvoice: 0,
  customerId: 0,
  //for SalesReport/RpCustomerBills
  customerIdRpCustomerBills: 0,
  systemIdRpCustomerBills: 0,
  yearIdRpCustomerBills: 0,
  fDateRpCustomerBills: "",
  tDateRpCustomerBills: "",
  rpCustomerBillsResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: [],
    },
  },
  //Payment/chequeBookSearch requests
  acc_systemChequeBookSearch:4,
  searchChequeBookSearch: "",
  pageChequeBookSearch: 1,
  lastIdChequeBookSearch: 0,
  chequeBookSearchResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: {
        total_count: 0,
        results: [],
      },
    },
  },
  //Payment/chequeBookDtlSearch requests
  chequeBookIdChequeBookDtlSearch: 0,
  pageChequeBookDtlSearch: 1,
  lastIdChequeBookDtlSearch: 0,
  searchChequeBookDtlSearch: "",
  chequeBookDtlSearchResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: {
        total_count: 0,
        results: [],
      },
    },
  },
  //Payment/chequeBookDtlById requests
  chequeBookDtlId: 0,
  chequeBookDtlByIdResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: {
        err: 0,
        msg: "",
        checkBookDtl: {
          id: 0,
          chqBkNo: "",
        },
      },
    },
  },
  //for PayRequest/save
  payRequestSaveResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: {
        id: 0,
        err: 0,
        msg: "",
        dtlErrMsgs: [],
      },
    },
  },
  //for PayRequest/doFirstFlow
  payRequestDoFirstFlowResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: {
        systemId: 0,
        id: 0,
        err: 0,
        msg: "",
        hasFlow: false,
      },
    },
  },
  //for PayRequest/del
  payRequestDelResponse: {
    meta: {
      errorCode: 0,
      message: "",
      type: "",
    },
    data: {
      result: {
        systemId: 0,
        id: 0,
        err: 0,
        msg: "",
        hasFlow: false,
      },
    },
  },
  //for PayRequest/doFirstFlow
  setPayRequestDoFirstFlowResponse: (payRequestDoFirstFlowResponse) =>
    set({ payRequestDoFirstFlowResponse }),
  //for PayRequest/del
  setPayRequestDelResponse: (payRequestDelResponse) =>
    set({ payRequestDelResponse }),
  setField: (field: string | number | symbol, value: any) => {
    //console.log(field, value);
    set((state) => ({ ...state, [field]: value }));
  },
  setPayRequestResponse: (payRequestResponse) => set({ payRequestResponse }),
  setPayRequestInvoicesResponse: (payRequestInvoicesResponse) =>
    set({ payRequestInvoicesResponse }),
  setRpCustomerBillsResponse: (
    rpCustomerBillsResponse: RpCustomerBillsResponse
  ) => set({ rpCustomerBillsResponse }),
  setChequeBookSearchResponse: (chequeBookSearchResponse) =>
    set({ chequeBookSearchResponse }), //for Payment/chequeBookSearch
  setChequeBookDtlSearchResponse: (chequeBookDtlSearchResponse) =>
    set({ chequeBookDtlSearchResponse }), //for Payment/chequeBookDtlSearch
  setChequeBookDtlByIdResponse: (chequeBookDtlByIdResponse) =>
    set({ chequeBookDtlByIdResponse }), //for Payment/chequeBookDtlById
  setPayRequestSaveResponse: (payRequestSaveResponse) =>
    set({ payRequestSaveResponse }), //for PayRequest/PayRequestSave
}));
