import { useEffect, useState } from "react";
import Input from "../controls/Input";
import RotateRight from "../../assets/images/GrayThem/rotate-right24.png";
import RotateLeft from "../../assets/images/GrayThem/rotate-left24.png";
import Ok from "../../assets/images/GrayThem/ok16.png";
import Prev from "../../assets/images/GrayThem/Prev24.png";
import PrevDisabled from "../../assets/images/GrayThem/prev_disabled24.png";
import Next from "../../assets/images/GrayThem/next24.png";
import NextDisabled from "../../assets/images/GrayThem/next_disabled24.png";
import Attach from "../../assets/images/GrayThem/Attach24.png";
import { useBanks } from "../../hooks/useBanks";
import { useBankStore } from "../../store/bankStore";
import AutoComplete from "../controls/AutoComplete";
import { DefaultOptionType } from "../../types/general";
import Spinner from "../controls/Spinner";
import { convertToFarsiDigits } from "../../utilities/general";
import { useAuthStore } from "../../store/authStore";
import { useDefinitionInvironment } from "../../hooks/useDefinitionInvironment";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { useChequeStore } from "../../store/chequeStore";
import { useCheques } from "../../hooks/useCheques";
import { colors } from "../../utilities/color";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

const RegRecievedCheque = ({ workFlowRowSelectResponse }: Props) => {
  const [bankSearch, setBankSearch] = useState("");
  const { banks, isLoading: isLoadingBanks } = useBanks();
  const { setField } = useBankStore();
  const { definitionInvironment, isLoading: isLoadingDefinition } =
    useDefinitionInvironment();

  const [systemSearch, setSystemSearch] = useState<string>("");
  const [yearSearch, setYearSearch] = useState<string>("");
  const { authApiResponse } = useAuthStore();
  const initData = authApiResponse?.data.result.initData;

  const { id, setField: setChequeField } = useChequeStore();
  const { loadPaymentResponse, isLoading: isLoadingLoadPayment } = useCheques();

  const [cheque, setCheque] = useState({
    sayadiMessage:"",
    prsn: "",
    system: {
      id: initData?.systemId ?? 0,
      title: convertToFarsiDigits(initData?.systemTitle) ?? "",
    },
    year: {
      id: initData?.yearId ?? "0",
      title: convertToFarsiDigits(initData?.yearTitle) ?? "",
    },
    bank: {
      id: 0,
      title: "",
    },
    sayadi:"",
    srName:"",
    marketerSrName:"",
    transferenceOwner:"",
    sarDate:"",
    accNo:"",
    no:"",
    amount:"",
    dsc:"",
  });
  useEffect(() => {
    setField("page", 1);
    setField("lastId", 0);
    setField("search", bankSearch);
  }, [bankSearch]);

  useEffect(() => {
    if (id !== workFlowRowSelectResponse.workTableRow.formId)
      setChequeField("id", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId]);

  useEffect(() => {
    setCheque({
        sayadiMessage:convertToFarsiDigits(loadPaymentResponse.data.result.payment.sayadiMessage),
        prsn:loadPaymentResponse.data.result.payment.prsn,
        system: {
            id: loadPaymentResponse.data.result.payment.acc_System,
            title: convertToFarsiDigits(loadPaymentResponse.data.result.payment.systemTitle),
        },
        year: {
            id: loadPaymentResponse.data.result.payment.acc_Year,
            title: convertToFarsiDigits(loadPaymentResponse.data.result.payment.yearTitle),
        },
        bank: {
            id: loadPaymentResponse.data.result.payment.bankId,
            title: convertToFarsiDigits(loadPaymentResponse.data.result.payment.bankName_Partners),
        },
        sayadi:convertToFarsiDigits(loadPaymentResponse.data.result.payment.sayadi),
        srName:convertToFarsiDigits(loadPaymentResponse.data.result.payment.srName),
        marketerSrName:convertToFarsiDigits(loadPaymentResponse.data.result.payment.marketerSrName),
        transferenceOwner:convertToFarsiDigits(loadPaymentResponse.data.result.payment.transferenceOwner),
        sarDate:convertToFarsiDigits(loadPaymentResponse.data.result.payment.sarDate),
        accNo:convertToFarsiDigits(loadPaymentResponse.data.result.payment.accNo),
        no:convertToFarsiDigits(loadPaymentResponse.data.result.payment.no),
        amount:convertToFarsiDigits(loadPaymentResponse.data.result.payment.amount),
        dsc:convertToFarsiDigits(loadPaymentResponse.data.result.payment.dsc),
    });
  }, [loadPaymentResponse]);

  return (
    <div className="flex w-full text-sm gap-2 text-gray-600">
      <div className="flex w-1/2 flex-col gap-1">
        <div className="flex justify-evenly w-full py-2">
          <a
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
            href="https://cbi.ir/EstelamPichak/22036.aspx"
            target="_blank"
          >
            استعلام چک
          </a>
          <a
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
            href="http://stl2.mofidteb.com/?#/login"
            target="_blank"
          >
            تارگت
          </a>
        </div>
        <Input
          name="sayadiMessage"
          label="صیادی:"
          value={cheque.sayadiMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCheque({ ...cheque, sayadiMessage: e.target.value })
          }
          widthDiv="w-full"
          widthLabel="w-24"
          widthInput="w-full-minus-24"
          variant="outlined"
          disabled
        />
        <div className="flex justify-between w-full">
          <div className="flex w-1/2 justify-center items-center gap-2">
            <label className="w-24 text-left">سیستم:</label>
            <div className="flex w-full justify-center items-center gap-2">
              <AutoComplete
                textColor={colors.gray_600}
                options={definitionInvironment?.systems ?? []}
                value={cheque.system}
                handleChange={(_event, newValue) => {
                  return setCheque({
                    ...cheque,
                    system: newValue as DefaultOptionType,
                  });
                }}
                setSearch={setSystemSearch}
                showLabel={false}
                inputPadding="0 !important"
              />
              {isLoadingDefinition ? (
                <Spinner size={4} color="#3b82f6" />
              ) : cheque.system && !isLoadingDefinition ? (
                <img src={Ok} alt="ok" />
              ) : null}
            </div>
          </div>
          <div className="flex w-1/2 justify-center items-center gap-2">
            <label className="w-24 text-left">سال مالی:</label>
            <div className="flex w-full justify-center items-center gap-2">
              <AutoComplete
                textColor={colors.gray_600}
                options={definitionInvironment?.years.map((year) => ({
                  id: year.id,
                  title: convertToFarsiDigits(year.code) ?? "",
                }))}
                value={cheque.year}
                handleChange={(_event, newValue) => {
                  return setCheque({
                    ...cheque,
                    year: newValue as DefaultOptionType,
                  });
                }}
                setSearch={setYearSearch}
                showLabel={false}
                inputPadding="0 !important"
              />
              {isLoadingDefinition ? (
                <Spinner size={4} color="#3b82f6" />
              ) : cheque.year && !isLoadingDefinition ? (
                <img src={Ok} alt="ok" />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Input
            name="prsn"
            label="صاحب چک:"
            value={cheque.prsn}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheque({ ...cheque, prsn: e.target.value })
            }
            widthDiv="w-1/2"
            widthLabel="w-24"
            widthInput="w-full-minus-24"
            variant="outlined"
          />
          <Input
            name="sayadi"
            label="صیادی:"
            value={cheque.sayadi}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheque({ ...cheque, sayadi: e.target.value })
            }
            widthDiv="w-1/2"
            widthLabel="w-24"
            widthInput="w-full-minus-24"
            variant="outlined"
          />
        </div>
        <div className="flex justify-between w-full">
          <Input
            name="srName"
            label="طرف حساب:"
            value={cheque.srName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheque({ ...cheque, srName: e.target.value })
            }
            widthDiv="w-1/2"
            widthLabel="w-24"
            widthInput="w-full-minus-24"
            disabled
            variant="outlined"
          />
          <Input
            name="marketerSrName"
            label="بازاریاب:"
            value={cheque.marketerSrName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheque({ ...cheque, marketerSrName: e.target.value })
            }
            widthDiv="w-1/2"
            widthLabel="w-24"
            widthInput="w-full-minus-24"
            disabled
            variant="outlined"
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex w-1/2 justify-center items-center gap-2">
            <label className="w-24 text-left">بانک:</label>
            <div className="flex w-full justify-center items-center gap-2">
              <AutoComplete
                textColor={colors.gray_600}
                options={banks.map((b) => ({
                  id: b.id,
                  title: b.text,
                }))}
                value={cheque.bank}
                handleChange={(_event, newValue) => {
                  return setCheque({
                    ...cheque,
                    bank: newValue as DefaultOptionType,
                  });
                }}
                setSearch={setBankSearch}
                showLabel={false}
                inputPadding="0 !important"
              />
              {isLoadingBanks ? (
                <Spinner size={4} color="#3b82f6" />
              ) : cheque.bank && !isLoadingBanks ? (
                <img src={Ok} alt="ok" />
              ) : null}
            </div>
          </div>
          <Input
            name="transferenceOwner"
            label="شعبه:"
            value={cheque.transferenceOwner}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheque({ ...cheque, transferenceOwner: e.target.value })
            }
            widthDiv="w-1/2"
            widthLabel="w-24"
            widthInput="w-full-minus-24"
            variant="outlined"
          />
        </div>
        <div className="flex justify-between w-full">
          <Input
            name="sarDate"
            label="سررسید:"
            value={cheque.sarDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheque({ ...cheque, sarDate: e.target.value })
            }
            widthDiv="w-1/2"
            widthLabel="w-24"
            widthInput="w-full-minus-24"
            variant="outlined"
          />
          <Input
            name="accNo"
            label="حساب:"
            value={cheque.accNo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheque({ ...cheque, accNo: e.target.value })
            }
            widthDiv="w-1/2"
            widthLabel="w-24"
            widthInput="w-full-minus-24"
            variant="outlined"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1 w-1/2">
            <label className="w-24 text-left">شماره:</label>
            <Input
              name="no"
              value={cheque.no}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCheque({ ...cheque, no: e.target.value })
              }
              widthDiv="w-50-minus-24"
              widthInput="w-full"
              variant="outlined"
            />
            <label>/</label>
            <Input
              name=""
              value={cheque.no}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCheque({ ...cheque, no: e.target.value })
              }
              widthDiv="w-50-minus-24"
              widthInput="w-full"
              variant="outlined"
            />
          </div>
          <Input
            name="amount"
            label="مبلغ:"
            value={cheque.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheque({ ...cheque, amount: e.target.value })
            }
            widthDiv="w-1/2"
            widthLabel="w-24"
            widthInput="w-full-minus-24"
            variant="outlined"
          />
        </div>
        <Input
          name="dsc"
          label="شرح:"
          value={cheque.dsc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCheque({ ...cheque, dsc: e.target.value })
          }
          widthDiv="w-full"
          widthLabel="w-24"
          widthInput="w-full"
          variant="outlined"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        <div className="flex w-full justify-start items-center">
          <label className="py-2">تصویر:</label>
          <div className="flex justify-between items-center gap-4">
            <img
              src={RotateLeft}
              alt="rotate-left"
              className="hover:cursor-pointer"
            />
            <img
              src={RotateRight}
              alt="rotate-right"
              className="hover:cursor-pointer"
            />
            <img
              src={NextDisabled}
              alt="next-disabled"
              className="hover:cursor-pointer"
            />
            <img
              src={PrevDisabled}
              alt="prev-disabled"
              className="hover:cursor-pointer"
            />
            <img src={Attach} alt="attach" className="hover:cursor-pointer" />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default RegRecievedCheque;
