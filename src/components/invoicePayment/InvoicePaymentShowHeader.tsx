import { useEffect, useMemo, useState } from "react";
import AutoComplete from "../controls/AutoComplete";
import { DefaultOptionType } from "../../types/general";
import { useCustomers } from "../../hooks/useCustomers";
import {
  convertToFarsiDigits,
  convertToLatinDigits,
  convertToPersianDate,
  currencyStringToNumber,
  handleCurrencyInputChange,
} from "../../utilities/general";
import {
  InvoicePaymentResponse,
  InvoicePaymentSaveRequest,
  InvoicePaymentSaveResponse,
} from "../../types/invoice";
import { useBankAccount } from "../../hooks/useBankAccount";
import { usePayment } from "../../hooks/usePayment";
import { usePaymentStore } from "../../store/paymentStore";
import { useCustomerStore } from "../../store/customerStore";
import { useGeneralContext } from "../../context/GeneralContext";
import { useBankAccountStore } from "../../store/bankAccountStore";
import { useCheques } from "../../hooks/useCheques";
import { useChequeStore } from "../../store/chequeStore";
import Input from "../controls/Input";
import { usePayRequest } from "../../hooks/usePayRequest";
import { usePayRequestStore } from "../../store/payRequestStore";
import PersianDatePicker from "../controls/PersianDatePicker";
import { useBanks } from "../../hooks/useBanks";
import { useBankStore } from "../../store/bankStore";
import ConfirmCard from "../layout/ConfirmCard";
import Button from "../controls/Button";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useInvoiceStore } from "../../store/invoiceStore";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../../utilities/color";

type Props = {
  invoicePaymentResponse: InvoicePaymentResponse;
  canEditForm: boolean;
  invoicePaymentSave: UseMutateAsyncFunction<
    any,
    Error,
    InvoicePaymentSaveRequest,
    unknown
  >;
  isLoadingInvoicePaymentSave: boolean;
  invoicePaymentSaveResponse: InvoicePaymentSaveResponse;
};

const InvoicePaymentShowHeader = ({
  invoicePaymentResponse,
  canEditForm,
  invoicePaymentSave,
  isLoadingInvoicePaymentSave,
  invoicePaymentSaveResponse,
}: Props) => {
  //برای نقدی
  const [fishNo, setFishNo] = useState("");
  const { invoiceId } = useInvoiceStore();
  const { cashPosSystemSearch } = useCheques();
  const { setField: setCashPosSystemField } = useChequeStore();
  const [cashPosSystem, setCashPosSystem] = useState<DefaultOptionType | null>( //برای صندوق
    null
  );
  const [cashPosSystemSearchString, setCashPosSystemSearchString] =
    useState<string>("");
  //برای پوز
  const { posList, chequeBookGetById } = usePayment();

  const [cash_PosSystem, setCash_PosSystem] =
    useState<DefaultOptionType | null>(null);
  const [posSearch, setPosSearch] = useState<string>("");
  //برای چک
  const [prsn, setPrsn] = useState(""); // در وجه
  const [sayadi, setSayadi] = useState(""); //  صیادی
  const [bank, setBank] = useState<DefaultOptionType | null>(null); // بانک (id:bankId)(title:bankName_Partners)
  const [bankSearch, setBankSearch] = useState("");
  const [transferenceOwner, setTransferenceOwner] = useState(""); // شعبه
  const [fixSerial, setFixSerial] = useState(""); // برای سریال
  const [accNo, setAccNo] = useState(""); //  برای شبا
  const { chequeBookSearchResponse, chequeBookDtlSearchResponse } =
    usePayRequest();
  const { setField: setPayRequestField } = usePayRequestStore();
  const [chequeBookSearch, setChequeBookSearch] = useState("");
  const [chequeBooks, setChequeBooks] = useState<DefaultOptionType[]>([]);
  const [acc_DefCheq, setAcc_DefCheq] = useState<DefaultOptionType | null>(
    null
  );
  const [cheqNoSearch, setCheqNoSearch] = useState(""); //  برای شماره چک و شماره
  const [cheqNo, setCheqNo] = useState<DefaultOptionType | null>(null);
  const [cheqNos, setCheqNos] = useState<DefaultOptionType[]>([]);
  const [sarDate, setSarDate] = useState<Date | null>(null); //  سررسید   convertToPersianDate(sarDate)
  const [isCheckChequeBook, setIsCheckChequeBook] = useState(false);
  const { banks } = useBanks();
  const { setField: setBankField } = useBankStore();
  //برای واریز به حساب
  const [bankAccount, setBankAccount] = useState<DefaultOptionType | null>(
    null
  );
  const { bankAccountSearchResponse } = useBankAccount();
  const [bankAccountSearch, setBankAccountSearch] = useState<string>("");
  const [peygiri, setPeygiri] = useState("");
  const [karmozd, setKarmozd] = useState("");
  const [Tafkik, setTafkik] = useState(false);
  //برای طرف حساب
  const { customers } = useCustomers();
  const { setField: setCusomerField } = useCustomerStore();
  const [customer, setCustomer] = useState<DefaultOptionType | null>(null);
  const [customerSearch, setCustomerSearch] = useState<string>("");
  const [dat, setDat] = useState<string>("");
  const [payKind, setPayKind] = useState<number>(0);
  const [dsc, setDsc] = useState<string>(""); // توضیحات
  const [amnt, setAmnt] = useState<string>("");
  //برای نحوه پرداخت
  const [paymentKind, setPaymentKind] = useState<DefaultOptionType | null>(
    null
  );
  const [paymentKindSearch, setPaymentKindSearch] = useState<string>("");
  const { setField: setBankAccountField } = useBankAccountStore();
  const { paymentKinds } = usePayment();
  const paymentKindsOrdered = useMemo(
    () => [...paymentKinds].sort((a: any, b: any) => a.id - b.id),
    [paymentKinds]
  );

  const { setField: setPaymentField } = usePaymentStore();
  const [message, setMessage] = useState("");
  const { systemId, yearId } = useGeneralContext();
  // order paymentKinds by id is handled by useMemo above
  useEffect(() => {
    console.log(customerSearch, posSearch);
  }, []);

  useEffect(() => {
    setCustomer({
      id: invoicePaymentResponse.data.result.customerId,
      title: invoicePaymentResponse.data.result.srName,
    });
    setDat(invoicePaymentResponse.data.result.dat);
    const findPaymentKind = paymentKinds.find((b) => b.id === 9);
    setPaymentKind({
      id: findPaymentKind?.id ?? 0,
      title: findPaymentKind?.text ?? "",
    });
    setBankAccount({
      id: 0,
      title: "",
    });
    setPayKind(0);
    setAmnt(convertToFarsiDigits(invoicePaymentResponse.data.result.amnt));
    setAcc_DefCheq({
      id: 0,
      title: "",
    });
  }, [invoicePaymentResponse, paymentKinds]);
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (paymentKind?.id === 9) setDsc("واریز به");
    else
      setDsc(
        `پرداخت ${paymentKind?.title} به ${invoicePaymentResponse.data.result.srName}`
      );

    setSayadi("");
    setAccNo("");
    setCheqNo({ id: 0, title: "" });
    setFixSerial("");
    setBank({ id: 0, title: "" });
    setTransferenceOwner("");
    setIsCheckChequeBook(false);
    setPrsn("");
    setFishNo("");
    setCash_PosSystem({ id: 0, title: "" });
    setMessage("");
  }, [paymentKind?.id]);

  useEffect(() => {
    if (!isCheckChequeBook) {
      setSayadi("");
      setAccNo("");
      setCheqNo({ id: 0, title: "" });
      setFixSerial("");
      setBank({ id: 0, title: "" });
      setTransferenceOwner("");
    }
  }, [isCheckChequeBook]);

  // برای دسته چک
  useEffect(() => {
    setChequeBooks(
      chequeBookSearchResponse.data.result.results.map((p) => {
        return { id: p.id, title: convertToFarsiDigits(p.text) };
      })
    );
  }, [chequeBookSearchResponse.data.result.results]);
  //برای شماره چک
  useEffect(() => {
    chequeBookDtlSearchResponse.data.result.results.length > 0 &&
      setCheqNos(
        chequeBookDtlSearchResponse.data.result.results.map((p) => {
          return { id: p.id, title: convertToFarsiDigits(p.text) };
        })
      );
  }, [chequeBookDtlSearchResponse.data.result.results]);
  //  برای حساب
  useEffect(() => {
    setDsc((prev) => `${prev} ${bankAccount?.title}`);
  }, [bankAccount]);
  //برای پیغام
  useEffect(() => {
    setMessage(invoicePaymentSaveResponse.meta?.message ?? "");
  }, [invoicePaymentSaveResponse]);

  //برای صندوق
  useEffect(() => {
    setCashPosSystemField("systemId", systemId);
    setCashPosSystemField("page", 1);
    setCashPosSystemField("lastId", 0);
    setCashPosSystemField("search", cashPosSystemSearchString);
    setCashPosSystemField("payKind", 0);
  }, [systemId, cashPosSystemSearchString]);
  //initial payment kind search params for api/Payment/KindSearch?search=%D8%B3&page=1&lastId=0
  //برای نحوه پرداخت
  useEffect(() => {
    console.log(paymentKindSearch, "paymentKindSearch");
    setPaymentField("paymentKindSearch", paymentKindSearch);
    setPaymentField("paymentKindSearchPage", 1);
    setPaymentField("paymentKindSearchLastId", 0);
  }, [paymentKindSearch]);

  //for api/Customer/search?search=search&page=1&lastId=0
  //برای طرف حساب
  useEffect(() => {
    setCusomerField("systemId", systemId);
    setCusomerField("yearId", yearId);
    setCusomerField("search", customerSearch);
  }, [customerSearch, systemId, yearId]);

  //fetch data for bankAccountSearch query for api/Payment/bankAccountSearch?search=%D8%A2&page=1&lastId=0&SystemId=1
  //برای حساب
  useEffect(() => {
    setBankAccountField("systemId", systemId);
    setBankAccountField("page", 1);
    setBankAccountField("lastId", 0);
    setBankAccountField("search", bankAccountSearch);
  }, [systemId, bankAccountSearch]);

  //initializing chequeBookSearch requests api/Payment/chequeBookSearch
  useEffect(() => {
    setPayRequestField("acc_systemChequeBookSearch", systemId);
    setPayRequestField("searchChequeBookSearch", chequeBookSearch);
    setPayRequestField("pageChequeBookSearch", 1);
    setPayRequestField("lastIdChequeBookSearch", 0);
    //console.log(chequeBookSearch, "chequeBookSearch in useEffect");
  }, [chequeBookSearch]);
  // api/Payment/chequeBookDtlSearch?ChequeBookId=
  useEffect(() => {
    setPayRequestField("searchChequeBookDtlSearch", cheqNoSearch);
    setPayRequestField("pageChequeBookDtlSearch", 1);
    setPayRequestField("lastIdChequeBookDtlSearch", 0);
    if (acc_DefCheq?.id !== 0) {
      setPayRequestField("chequeBookIdChequeBookDtlSearch", acc_DefCheq?.id);
    }
  }, [cheqNoSearch, acc_DefCheq?.id]);

  //for api/Payment/bankSearch
  useEffect(() => {
    setBankField("page", 1);
    setBankField("lastId", 0);
    setBankField("search", bankSearch);
  }, [bankSearch]);

  //for api/Payment/chequeBookGetById?id=190
  useEffect(() => {
    setPaymentField("checkBookId", acc_DefCheq?.id);
  }, [acc_DefCheq?.id]);

  //change sayadi,... value by changing chequeBookGetById
  useEffect(() => {
    setSayadi(chequeBookGetById?.chqBkNo ?? "");
    setAccNo(chequeBookGetById?.sheba ?? "");
    setCheqNo({
      id: chequeBookGetById?.chequeBookDtlId ?? 0,
      title: convertToFarsiDigits(chequeBookGetById?.cheqNo) ?? "",
    });
    setFixSerial(convertToFarsiDigits(chequeBookGetById.fixChqNo) ?? "");
    setBank({
      id: chequeBookGetById?.bnkId ?? 0,
      title: convertToFarsiDigits(chequeBookGetById?.bnk) ?? "",
    });
    setTransferenceOwner(chequeBookGetById?.brnch ?? "");
  }, [chequeBookGetById]);
  ////////////////////////////////////////////////////////
  useEffect(() => {
    setFishNo(cheqNo?.title ?? "");
  }, [cheqNo]);
  ////////////////////////////////////////////////////////
  //for save
  const handleSubmitSave = async (
    e?: React.MouseEvent<HTMLButtonElement>
  ): Promise<any> => {
    if (e) e.preventDefault();
    let request: InvoicePaymentSaveRequest;
    let cash_Pos = 0;
    if (paymentKind?.id === 0) {
      cash_Pos = cashPosSystem?.id ?? 0;
    } else if (paymentKind?.id === 1) {
      cash_Pos = cash_PosSystem?.id ?? 0;
    } else if (paymentKind?.id === 9) {
      cash_Pos = bankAccount?.id ?? 0;
    }
    request = {
      customerId: customer?.id ?? 0,
      invoiceId,
      paymentId: 0,
      systemId,
      kind: payKind,
      payKind: paymentKind?.id ?? 0,
      yearId,
      sayadi: convertToLatinDigits(sayadi),
      prsn,
      bankId: bank?.id ?? 0,
      bankName_Partners: bank?.title ?? "",
      fixSerial: convertToLatinDigits(fixSerial),
      no: convertToLatinDigits(fishNo),
      transferenceOwner: convertToLatinDigits(transferenceOwner),
      cash_PosSystem: cash_Pos,
      accNo: convertToLatinDigits(accNo),
      acc_DefCheq: acc_DefCheq?.id ?? 0,
      sarDate: sarDate !== null ? convertToPersianDate(sarDate) : "",
      amount: currencyStringToNumber(convertToLatinDigits(amnt)).toString(),
      dsc: convertToLatinDigits(dsc),
      updateAcepted: true,
      idempotencyKey: uuidv4(),
    };
    console.log(request);
    try {
      const response = await invoicePaymentSave(request);
      //setIsModalOpen(true);
      return response;
      //console.log("response");
    } catch (error) {
      console.error("Error ثبت :", error);
    }
  };
  //for نقدی
  const ShowFieldOfPaymentKind0 = (
    <>
      <div className="w-full md:w-1/2 flex">
        <label className="p-1 w-24 text-left">شماره فیش:</label>
        <input
          type="text"
          value={convertToFarsiDigits(fishNo)}
          onChange={(e) => setFishNo(e.target.value)}
          disabled={!canEditForm}
          className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <label className="p-1 w-24 text-left"> صندوق:</label>
        <div className="flex w-full rounded-md">
          <AutoComplete
            options={cashPosSystemSearch.map((b: any) => ({
              id: b.id,
              title: b.text,
            }))}
            value={cashPosSystem}
            setSearch={setCashPosSystemSearchString}
            showLabel={false}
            inputPadding="0 !important"
            backgroundColor="white"
            textColor="gray"
            showClearIcon={false}
            handleChange={(_event, newValue) => {
              setCashPosSystem(newValue as DefaultOptionType | null);
            }}
          />
        </div>
      </div>
    </>
  );
  //for پوز
  const ShowFieldOfPaymentKind1 = (
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <label className="p-1 w-24 text-left"> پوز:</label>
      <div className="flex w-full rounded-md">
        <AutoComplete
          options={posList.map((b) => ({
            id: b.id,
            title: b.name,
          }))}
          value={cash_PosSystem}
          setSearch={setPosSearch}
          showLabel={false}
          inputPadding="0 !important"
          backgroundColor="white"
          showClearIcon={false}
          handleChange={(_event, newValue) => {
            setCash_PosSystem(newValue as DefaultOptionType | null);
          }}
        />
      </div>
    </div>
  );
  //for واریز به حساب
  const ShowFieldOfPaymentKind9 = (
    <>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <label className="p-1 w-24 text-left"> حساب:</label>
        <div className="flex w-full rounded-md">
          <AutoComplete
            options={bankAccountSearchResponse.map((b) => ({
              id: b.id,
              title: b.text,
            }))}
            value={bankAccount}
            setSearch={setBankAccountSearch}
            showLabel={false}
            inputPadding="0 !important"
            backgroundColor="white"
            showClearIcon={false}
            handleChange={(_event, newValue) => {
              setBankAccount(newValue as DefaultOptionType | null);
            }}
          />
        </div>
      </div>
      <div className="w-full md:w-1/4 flex">
        <label className="p-1 w-20 md:w-12 text-left">پیگیری:</label>
        <input
          type="text"
          value={convertToFarsiDigits(peygiri)}
          onChange={(e) => setPeygiri(e.target.value)}
          disabled={!canEditForm}
          className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="w-full md:w-1/4 flex gap-2">
        <div className="w-full md:w-1/2 flex">
          <label className="p-1 w-20 md:w-12 text-left">کارمزد:</label>
          <input
            type="text"
            value={convertToFarsiDigits(karmozd)}
            onChange={(e) => setKarmozd(e.target.value)}
            disabled={!canEditForm}
            className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-start items-center gap-2 w-full md:w-1/2">
          <input
            type="checkbox"
            name="isSeparated"
            checked={Tafkik}
            onChange={(e) => setTafkik(e.target.checked)}
            disabled={!canEditForm}
          />
          <label>تفکیک شده</label>
        </div>
      </div>
    </>
  );
  //for چک
  //console.log(chequeBooks,"chequeBooks")
  const ShowFieldOfPaymentKind2_part1 = (
    <>
      <div className="w-full md:w-1/4 flex ">
        <label className="p-1 w-28 text-left">در وجه:</label>
        <input
          type="text"
          value={convertToFarsiDigits(prsn)}
          onChange={(e) => setPrsn(e.target.value)}
          disabled={!canEditForm}
          className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="px-4">
          <input
            type="checkbox"
            name="isSeparated"
            checked={isCheckChequeBook}
            onChange={(e) => setIsCheckChequeBook(e.target.checked)}
            disabled={!canEditForm}
          />
        </div>
        <label className="p-1 w-20 text-left">دسته چک:</label>
        <div className="flex w-full rounded-md">
          <AutoComplete
            options={chequeBooks.map((b) => ({
              id: b.id,
              title: convertToLatinDigits(b.title),
            }))}
            value={acc_DefCheq}
            handleChange={(_event, newValue) => {
              if (newValue) {
                const selectedOption = newValue as DefaultOptionType;
                return setAcc_DefCheq({
                  ...selectedOption,
                  title: convertToFarsiDigits(selectedOption.title),
                });
              }
              return setAcc_DefCheq(null);
            }}
            setSearch={setChequeBookSearch}
            disabled={!isCheckChequeBook}
            backgroundColor={!isCheckChequeBook ? "inherit" : "white"}
            showClearIcon={false}
            inputPadding="0 !important"
          />
        </div>
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center">
        <label className="p-1 w-12 text-left">صیادی:</label>
        <input
          type="text"
          value={convertToFarsiDigits(sayadi)}
          onChange={(e) => setSayadi(e.target.value)}
          disabled={!canEditForm}
          className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
    </>
  );
  //for چک- cont
  const ShowFieldOfPaymentKind2_part2 = (
    <>
      {/*fourth row*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
        <div className="w-full md:w-1/4 flex justify-center items-center">
          <label className="p-1 w-28 text-left">شبا:</label>
          <input
            type="text"
            value={convertToFarsiDigits(accNo)}
            onChange={(e) => setAccNo(e.target.value)}
            disabled={isCheckChequeBook}
            className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex w-1/4 items-center gap-1">
          <label className="w-36 text-left">شماره چک:</label>
          <div className="flex w-full-minus-24 justify-center items-center gap-2">
            {isCheckChequeBook ? (
              <div className="flex w-full rounded-md">
                <AutoComplete
                  options={cheqNos.map((b) => ({
                    id: b.id,
                    title: convertToLatinDigits(b.title),
                  }))}
                  value={cheqNo}
                  handleChange={(_event, newValue) => {
                    if (newValue) {
                      const selectedOption = newValue as DefaultOptionType;
                      return setCheqNo({
                        ...selectedOption,
                        title: convertToFarsiDigits(selectedOption.title),
                      });
                    }
                    return setCheqNo(null);
                  }}
                  setSearch={setCheqNoSearch}
                  showLabel={false}
                  backgroundColor={"white"}
                  showClearIcon={false}
                  inputPadding="0 !important"
                />
              </div>
            ) : (
              <div className="flex w-full justify-center items-center gap-2">
                <Input
                  name="fishNo"
                  value={fishNo}
                  onChange={(e) =>
                    setFishNo(convertToFarsiDigits(e.target.value))
                  }
                  widthDiv="w-full"
                  widthInput="w-full"
                  variant="outlined"
                />
              </div>
            )}

            <label>/</label>
            <div className="flex w-full justify-center items-center gap-2">
              <Input
                name="fixSerial"
                value={fixSerial}
                onChange={(e) =>
                  setFixSerial(convertToFarsiDigits(e.target.value))
                }
                widthDiv="w-full"
                widthInput="w-full"
                variant="outlined"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 flex justify-center items-center">
          <label className="p-1 w-16 text-left">بانک:</label>
          <div className="flex w-full rounded-md">
            <AutoComplete
              options={banks.map((b) => ({
                id: b.id,
                title: b.text,
              }))}
              value={bank}
              handleChange={(_event, newValue) => {
                return setBank(newValue as DefaultOptionType | null);
              }}
              disabled={isCheckChequeBook}
              setSearch={setBankSearch}
              showLabel={false}
              backgroundColor={isCheckChequeBook ? "inherit" : "white"}
              showClearIcon={false}
              inputPadding="0 !important"
            />
          </div>
        </div>
        <div className="w-full md:w-1/4 flex justify-center items-center">
          <label className="p-1 w-12 text-left">شعبه:</label>
          <input
            type="text"
            value={convertToFarsiDigits(transferenceOwner)}
            onChange={(e) => setTransferenceOwner(e.target.value)}
            disabled={isCheckChequeBook}
            className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      {/*fifth row*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
        <div className="w-1/4 flex items-center gap-2">
          <label className="w-24 text-left">سررسید:</label>
          <PersianDatePicker
            name="sarDate"
            label="سررسید"
            value={sarDate}
            fontSize="text-sm"
            onChange={(event) => setSarDate(event.target.value as Date | null)}
            disabled={!canEditForm}
          />
        </div>
      </div>
    </>
  );
  return (
    <div className="mt-2 text-sm w-full flex flex-col gap-2 border border-gray-400 rounded-md p-2">
      {/*first row*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
        <div className="w-full md:w-2/4 flex justify-center items-center">
          <label className="p-1 w-24 text-left">طرف حساب:</label>
          <div className="flex w-full rounded-md">
            <AutoComplete
              options={customers.map((b) => ({
                id: b.id,
                title: b.text,
              }))}
              value={customer}
              handleChange={(_event, newValue) => {
                return setCustomer(newValue as DefaultOptionType | null);
              }}
              disabled
              setSearch={setCustomerSearch}
              showLabel={false}
              backgroundColor={!canEditForm ? "inherit" : "white"}
              showClearIcon={false}
              inputPadding="0 !important"
            />
          </div>
        </div>
        <div className="w-full md:w-1/4 flex gap-2">
          <input
            type="radio"
            name="payKind"
            id="payKind"
            onChange={() => setPayKind(0)}
            disabled
          />
          <label htmlFor="payKind">دریافت</label>
          <input
            type="radio"
            name="payKind"
            id="payKind"
            onChange={() => setPayKind(1)}
            defaultChecked={true}
            disabled
          />
          <label htmlFor="payKind">پرداخت</label>
        </div>
        <div className="w-full md:w-1/4 flex">
          <label className="p-1 w-20 md:w-12 text-left">تاریخ:</label>
          <input
            type="text"
            value={convertToFarsiDigits(dat)}
            disabled={!canEditForm}
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      {/*second row*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
        <div className="w-full md:w-1/4 flex justify-center items-center">
          <label className="p-1 w-28 text-left">نحوه پرداخت:</label>
          <div className="flex w-full rounded-md">
            <AutoComplete
              options={paymentKindsOrdered.map((b) => ({
                id: b.id,
                title: b.text,
              }))}
              value={paymentKind}
              handleChange={(_event, newValue) => {
                return setPaymentKind(newValue as DefaultOptionType | null);
              }}
              setSearch={setPaymentKindSearch}
              showLabel={false}
              backgroundColor={!canEditForm ? "inherit" : "white"}
              showClearIcon={false}
              inputPadding="0 !important"
            />
          </div>
        </div>
      </div>
      {/*third row*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
        {paymentKind?.id === 0 && ShowFieldOfPaymentKind0}
        {paymentKind?.id === 1 && ShowFieldOfPaymentKind1}
        {paymentKind?.id === 2 && ShowFieldOfPaymentKind2_part1}
        {paymentKind?.id === 9 && ShowFieldOfPaymentKind9}
      </div>
      {paymentKind?.id === 2 && ShowFieldOfPaymentKind2_part2}
      {/*last row*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
        <div className="w-full md:w-3/4 flex justify-center items-center">
          <label className="p-1 w-24 text-left">توضیحات:</label>
          <input
            type="text"
            value={convertToFarsiDigits(dsc)}
            onChange={(e) => setDsc(e.target.value)}
            disabled={!canEditForm}
            className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-full md:w-1/4 flex">
          <label className="p-1 w-20 md:w-12 text-left">مبلغ:</label>
          <input
            type="text"
            value={amnt}
            onChange={(e) => {
              handleCurrencyInputChange(e.target.value, setAmnt);
            }}
            //disabled={!canEditForm}
            className="text-sm text-gray-600 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <ConfirmCard variant="flex-row gap-2 rounded-bl-md rounded-br-md justify-end ">
        <div className="flex items-center gap-2">
          <label
            style={{
              color:
                invoicePaymentSaveResponse.meta.errorCode > 0
                  ? colors.red500
                  : colors.green700,
            }}
          >
            {message}
          </label>
          <Button
            text={isLoadingInvoicePaymentSave ? "در حال ثبت اطلاعات..." : "ثبت"}
            backgroundColor="bg-green-500"
            color="text-white"
            backgroundColorHover="bg-green-600"
            colorHover="text-white"
            variant="shadow-lg w-64"
            onClick={handleSubmitSave}
          />
        </div>
      </ConfirmCard>
    </div>
  );
};

export default InvoicePaymentShowHeader;
