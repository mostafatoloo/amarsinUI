import { useEffect, useState } from "react";
import Input from "../controls/Input";
import RotateRight from "../../assets/images/GrayThem/rotate-right24.png";
import RotateLeft from "../../assets/images/GrayThem/rotate-left24.png";
import Ok from "../../assets/images/GrayThem/ok16.png";
//import Prev from "../../assets/images/GrayThem/Prev24.png";
import PrevDisabled from "../../assets/images/GrayThem/prev_disabled24.png";
//import Next from "../../assets/images/GrayThem/next24.png";
import Err from "../../assets/images/GrayThem/err16.png";
import NextDisabled from "../../assets/images/GrayThem/next_disabled24.png";
import Attach from "../../assets/images/GrayThem/Attach24.png";
import { useBanks } from "../../hooks/useBanks";
import { useBankStore } from "../../store/bankStore";
import AutoComplete from "../controls/AutoComplete";
import { DefaultOptionType } from "../../types/general";
import Spinner from "../controls/Spinner";
import {
  convertToFarsiDigits,
  convertToLatinDigits,
  formatNumberWithCommas,
} from "../../utilities/general";
import { useAuthStore } from "../../store/authStore";
import { useDefinitionInvironment } from "../../hooks/useDefinitionInvironment";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { useChequeStore } from "../../store/chequeStore";
import { useCheques } from "../../hooks/useCheques";
import { colors } from "../../utilities/color";
import ModalMessage from "../layout/ModalMessage";
import { useWorkflow } from "../../hooks/useWorkflow";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  handleSelectedIdChange: (id: number) => void;
  getWorkTable?: () => void;
};

const RegRecievedCheque = ({ workFlowRowSelectResponse, 
//  handleSelectedIdChange, getWorkTable 
}: Props) => {
  const [bankSearch, setBankSearch] = useState("");
  const { banks, isLoading: isLoadingBanks } = useBanks();
  const { setField } = useBankStore();
  const { definitionInvironment, isLoading: isLoadingDefinition } =
    useDefinitionInvironment();

  const [systemSearch, setSystemSearch] = useState<string>("");
  const [yearSearch, setYearSearch] = useState<string>("");
  const { authApiResponse } = useAuthStore();
  const initData = authApiResponse?.data.result.initData;

  const {
    //id,
    setField: setChequeField,
    updateFieldsResponse,
    setUpdateFieldsResponse,
    updateStatus,
    setUpdateStatus,
  } = useChequeStore();

  const {
    loadPaymentResponse,
    //getPayment,
    //isLoading: isLoadingLoadPayment,
    updateFields,
    isLoadingUpdateFields,
  } = useCheques();

  const {workFlowResponse}=useWorkflow()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFieldChanged, setIsFieldChanged] = useState(false);

  const [cheque, setCheque] = useState({
    sayadiMessage: "",
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
    sayadi: "",
    srName: "",
    marketerSrName: "",
    transferenceOwner: "",
    sarDate: "",
    accNo: "",
    no: "",
    amountT: "",
    dsc: "",
    fixSerial: "",
  });
  useEffect(() => {
    setField("page", 1);
    setField("lastId", 0);
    setField("search", bankSearch);
  }, [bankSearch]);

  useEffect(() => {
    console.log(yearSearch, systemSearch);
    console.log("**************************",workFlowRowSelectResponse.workTableRow.formId)
    //if (idKept!==0) handleSelectedIdChange?.(idKept);
    setChequeField("id", workFlowRowSelectResponse.workTableRow.formId);
    setUpdateStatus({
      ...updateStatus,
      prsn: { errorCode: 0, isUpdating: false },
      sayadi: { errorCode: 0, isUpdating: false },
      srName: { errorCode: 0, isUpdating: false },
      marketerSrName: { errorCode: 0, isUpdating: false },
      transferenceOwner: { errorCode: 0, isUpdating: false },
      sarDate: { errorCode: 0, isUpdating: false },
      accNo: { errorCode: 0, isUpdating: false },
      no: { errorCode: 0, isUpdating: false },
      amountT: { errorCode: 0, isUpdating: false },
      dsc: { errorCode: 0, isUpdating: false },
      sayadiMessage: { errorCode: 0, isUpdating: false },
      systemId: { errorCode: 0, isUpdating: false },
      yearId: { errorCode: 0, isUpdating: false },
      bankId: { errorCode: 0, isUpdating: false },
    });
    setUpdateFieldsResponse({
      meta: { errorCode: 0, message: "", type: "" },
      data: {
        result: {
          id: 0,
          errorCode: 0,
          message: "",
          details: [],
        },
      },
    });
  }, [workFlowRowSelectResponse.workTableRow.formId,workFlowResponse]);

  useEffect(() => {
    console.log("updated Cheque")
    setCheque({
      sayadiMessage: convertToFarsiDigits(
        loadPaymentResponse.data.result.payment.sayadiMessage
      ),
      prsn: loadPaymentResponse.data.result.payment.prsn,
      system: {
        id: loadPaymentResponse.data.result.payment.acc_System,
        title: convertToFarsiDigits(
          loadPaymentResponse.data.result.payment.systemTitle
        ),
      },
      year: {
        id: loadPaymentResponse.data.result.payment.acc_Year,
        title: convertToFarsiDigits(
          loadPaymentResponse.data.result.payment.yearTitle
        ),
      },
      bank: {
        id: loadPaymentResponse.data.result.payment.bankId,
        title: convertToFarsiDigits(
          loadPaymentResponse.data.result.payment.bankName_Partners
        ),
      },
      sayadi: convertToFarsiDigits(
        loadPaymentResponse.data.result.payment.sayadi
      ),
      srName: convertToFarsiDigits(
        loadPaymentResponse.data.result.payment.srName
      ),
      marketerSrName: convertToFarsiDigits(
        loadPaymentResponse.data.result.payment.marketerSrName
      ),
      transferenceOwner: convertToFarsiDigits(
        loadPaymentResponse.data.result.payment.transferenceOwner
      ),
      sarDate: convertToFarsiDigits(
        loadPaymentResponse.data.result.payment.sarDate
      ),
      accNo: convertToFarsiDigits(
        loadPaymentResponse.data.result.payment.accNo
      ),
      no: convertToFarsiDigits(loadPaymentResponse.data.result.payment.no),
      fixSerial: convertToFarsiDigits(
        loadPaymentResponse.data.result.payment.fixSerial
      ),
      amountT: convertToFarsiDigits(
        formatNumberWithCommas(
          Number(loadPaymentResponse.data.result.payment.amount)
        )
      ),
      dsc: convertToFarsiDigits(loadPaymentResponse.data.result.payment.dsc),
    });
  }, [loadPaymentResponse]);


  //update fields state
  const capitalizeFirstLetter = (string: string): string => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const setChequeFields = (
    fieldName: string,
    value: string | number | DefaultOptionType
  ) => {
    setCheque({
      ...cheque,
      [fieldName]:
        typeof value === "string" || typeof value === "number"
          ? fieldName === "amountT"
            ? convertToFarsiDigits(formatNumberWithCommas(value as number))
            : convertToFarsiDigits(value.toString())
          : value,
    });
    setIsFieldChanged(true);
  };

  const updateCheque = (
    fieldName: string,
    value: string | number | DefaultOptionType
  ) => {
    if (typeof value === "string" || typeof value === "number") {
      if (fieldName === "amountT") {
        console.log(convertToLatinDigits(value.toString()));
        update(fieldName, convertToLatinDigits(value.toString()));
      } else {
        update(fieldName, convertToLatinDigits(value.toString()));
      }
    } else {
      if (fieldName === "system") {
        update("SystemId", value?.id.toString());
      } else if (fieldName === "year") {
        update("YearId", value?.id.toString());
      } else if (fieldName === "bank") {
        update("BankId", value?.id.toString());
      }
      setIsModalOpen(true);
    }

    if (
      isFieldChanged &&
      fieldName !== "bank" &&
      fieldName !== "year" &&
      fieldName !== "system"
    ) {
      setIsModalOpen(true);
    }
    setIsFieldChanged(false);
  };

  const update = async(fieldName: string, value: string) => {
    console.log(fieldName, value, "update");
    updateFields({
      fieldName: capitalizeFirstLetter(fieldName),
      value: value,
      value2: "",
    });
    //getWorkTable?.();
  };

  useEffect(() => {
    let timeoutId: number;
    if (isModalOpen) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen]);

  const showIconForTextField = (fieldName: string) => {
    if (isLoadingUpdateFields && updateStatus[fieldName]?.isUpdating) {
      return <Spinner size={4} color={colors.blue500} />;
    }
    if (!isLoadingUpdateFields && updateStatus[fieldName]?.errorCode === 0) {
      return <img src={Ok} alt="ok" title={updateStatus[fieldName]?.message} />;
    }
    if (!isLoadingUpdateFields && updateStatus[fieldName]?.errorCode !== 0) {
      return (
        <img src={Err} alt="err" title={updateStatus[fieldName]?.message} />
      );
    }
    return null;
  };
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
                  setChequeFields("system", newValue as DefaultOptionType);
                  updateCheque("system", newValue as DefaultOptionType);
                }}
                setSearch={setSystemSearch}
                showLabel={false}
                inputPadding="0 !important"
                backgroundColor="white"
              />
              {isLoadingDefinition && updateStatus.systemId.isUpdating ? (
                <Spinner size={4} color={colors.blue500} />
              ) : cheque.system &&
                !isLoadingDefinition &&
                updateStatus.systemId.errorCode === 0 ? (
                <img src={Ok} alt="ok" title={updateStatus.systemId.message} />
              ) : updateStatus.systemId.errorCode !== 0 ? (
                <img
                  src={Err}
                  alt="err"
                  title={updateStatus.systemId.message}
                />
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
                  setChequeFields("year", newValue as DefaultOptionType);
                  updateCheque("year", newValue as DefaultOptionType);
                }}
                setSearch={setYearSearch}
                showLabel={false}
                inputPadding="0 !important"
                backgroundColor="white"
              />
              {isLoadingDefinition ? (
                <Spinner size={4} color={colors.blue500} />
              ) : cheque.year &&
                !isLoadingDefinition &&
                updateStatus.yearId.errorCode === 0 ? (
                <img src={Ok} alt="ok" title={updateStatus.yearId.message} />
              ) : updateStatus.yearId.errorCode !== 0 ? (
                <img src={Err} alt="err" title={updateStatus.yearId.message} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex w-full justify-center items-center gap-2">
            <Input
              name="prsn"
              label="صاحب چک:"
              value={cheque.prsn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChequeFields("prsn", e.target.value)
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCheque("prsn", e.target.value)
              }
              widthDiv="w-full"
              widthLabel="w-24"
              widthInput="w-full-minus-24"
              variant="outlined"
            />
            {showIconForTextField("prsn")}
          </div>
          <div className="flex w-full justify-center items-center gap-2">
            <Input
              name="sayadi"
              label="صیادی:"
              value={cheque.sayadi}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChequeFields("sayadi", e.target.value)
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCheque("sayadi", e.target.value)
              }
              widthDiv="w-full"
              widthLabel="w-24"
              widthInput="w-full-minus-24"
              variant="outlined"
            />
            {showIconForTextField("sayadi")}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Input
            name="srName"
            label="طرف حساب:"
            value={cheque.srName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChequeFields("srName", e.target.value)
            }
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheque("srName", e.target.value)
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
              setChequeFields("marketerSrName", e.target.value)
            }
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheque("marketerSrName", e.target.value)
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
                  setChequeFields("bank", newValue as DefaultOptionType);
                  updateCheque("bank", newValue as DefaultOptionType);
                }}
                setSearch={setBankSearch}
                showLabel={false}
                inputPadding="0 !important"
                backgroundColor="white"
              />
              {isLoadingBanks ? (
                <Spinner size={4} color={colors.blue500} />
              ) : cheque.bank &&
                !isLoadingBanks &&
                updateStatus.bankId.errorCode === 0 ? (
                <img src={Ok} alt="ok" title={updateStatus.bankId.message} />
              ) : updateStatus.bankId.errorCode !== 0 ? (
                <img src={Err} alt="err" title={updateStatus.bankId.message} />
              ) : null}
            </div>
          </div>
          <div className="flex w-1/2 justify-center items-center gap-2">
            <Input
              name="transferenceOwner"
              label="شعبه:"
              value={cheque.transferenceOwner}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChequeFields("transferenceOwner", e.target.value)
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCheque("transferenceOwner", e.target.value)
              }
              widthDiv="w-full"
              widthLabel="w-24"
              widthInput="w-full-minus-24"
              variant="outlined"
            />
            {showIconForTextField("transferenceOwner")}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex w-1/2 justify-center items-center gap-2">
            <Input
              name="sarDate"
              label="سررسید:"
              value={cheque.sarDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChequeFields("sarDate", e.target.value)
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCheque("sarDate", e.target.value)
              }
              widthDiv="w-full"
              widthLabel="w-24"
              widthInput="w-full-minus-24"
              variant="outlined"
            />
            {showIconForTextField("sarDate")}
          </div>
          <div className="flex w-1/2 justify-center items-center gap-2">
            <Input
              name="accNo"
              label="حساب:"
              value={cheque.accNo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChequeFields("accNo", e.target.value)
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCheque("accNo", e.target.value)
              }
              widthDiv="w-full"
              widthLabel="w-24"
              widthInput="w-full-minus-24"
              variant="outlined"
            />
            {showIconForTextField("accNo")}
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex w-1/2 items-center gap-1">
            <label className="w-24 text-left">شماره:</label>
            <div className="flex w-full-minus-24 justify-center items-center gap-2">
              <div className="flex w-full justify-center items-center gap-2">
                <Input
                  name="no"
                  value={cheque.no}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChequeFields("no", e.target.value)
                  }
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateCheque("no", e.target.value)
                  }
                  widthDiv="w-full"
                  widthInput="w-full"
                  variant="outlined"
                />
                {showIconForTextField("no")}
              </div>
              <label>/</label>
              <div className="flex w-full justify-center items-center gap-2">
                <Input
                  name="fixSerial"
                  value={cheque.fixSerial}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChequeFields("fixSerial", e.target.value)
                  }
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateCheque("fixSerial", e.target.value)
                  }
                  widthDiv="w-full"
                  widthInput="w-full"
                  variant="outlined"
                />
                {showIconForTextField("fixSerial")}
              </div>
            </div>
          </div>
          <div className="flex w-1/2 justify-center items-center gap-2">
            <Input
              name="amountT"
              label="مبلغ:"
              value={cheque.amountT}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChequeFields("amountT", e.target.value)
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCheque("amountT", e.target.value)
              }
              widthDiv="w-full"
              widthLabel="w-24"
              widthInput="w-full-minus-24"
              variant="outlined"
            />
            {showIconForTextField("amountT")}
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <Input
            name="dsc"
            label="شرح:"
            value={cheque.dsc}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChequeFields("dsc", e.target.value)
            }
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheque("dsc", e.target.value)
            }
            widthDiv="w-full"
            widthLabel="w-24"
            widthInput="w-full"
            variant="outlined"
          />
          {showIconForTextField("dsc")}
        </div>
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
      {!isLoadingUpdateFields && (
        <ModalMessage
          isOpen={isModalOpen}
          backgroundColor={
            updateFieldsResponse.meta.errorCode === 0
              ? "bg-green-200"
              : "bg-red-200"
          }
          bgColorButton={
            updateFieldsResponse.meta.errorCode === 0
              ? "bg-green-500"
              : "bg-red-500"
          }
          bgColorButtonHover={
            updateFieldsResponse.meta.errorCode === 0
              ? "bg-green-600"
              : "bg-red-600"
          }
          color="text-white"
          onClose={() => setIsModalOpen(false)}
          message={updateFieldsResponse.meta.message}
          visibleButton={false}
        />
      )}
    </div>
  );
};

export default RegRecievedCheque;
