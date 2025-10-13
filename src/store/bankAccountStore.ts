import { create } from "zustand";
import { BankAccountState } from "../types/bankAccount";
export const useBankAccountStore = create<BankAccountState>()((set) => ({
  //bankAccountSearch
  systemId: 0,
  search: "",
  page: 1,
  lastId: 0,
  bankAccountSearchResponse: {
    meta: { errorCode: 0, message: null, type: "" },
    data: { result: [] },
  },
  //getChequeAssignBankAccount
  paymentId: 0,
  asnadId: 0,
  getChequeAssignBankAccountResponse: {
    meta: { errorCode: 0, message: null, type: "" },
    data: { result: { id: 0, name: "" } },
  },
  //chequeAssignBankAccount
  chequeAssignBankAccountResponse: {
    meta: { errorCode: 0, message: null, type: "" },
    data: { result: 0 },
  },
  setField: (field: string, value: any) =>
    set((state) => ({ ...state, [field]: value })),
  setBankAccountSearchResponse: (bankAccountSearchResponse) =>
    set({ bankAccountSearchResponse }),
  setGetChequeAssignBankAccountResponse: (getChequeAssignBankAccountResponse) =>
    set({ getChequeAssignBankAccountResponse }),
  setChequeAssignBankAccountResponse: (chequeAssignBankAccountResponse) =>
    set({ chequeAssignBankAccountResponse }),
}));
