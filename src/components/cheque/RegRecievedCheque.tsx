import { useEffect, useState, useRef } from "react";
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

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  handleSelectedIdChange: (id: number) => void;
  getWorkTable?: () => void;
  selectedId: number;
};

const RegRecievedCheque = ({
  workFlowRowSelectResponse,
  handleSelectedIdChange,
  getWorkTable,
  selectedId,
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

  // Add refs for focus management
  const systemRef = useRef<any>(null);
  const yearRef = useRef<any>(null);
  const bankRef = useRef<any>(null);

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

  const [rowId, setRowId] = useState(selectedId);
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
  ///////////////////////////////////////////////////////////////////
  // Validation function
  const notValidateRequiredFields = (fieldName: string) => {
    const errors = {
      system: cheque.system === null ? true : false,
      year: cheque.year === null ? true : false,
      bank: cheque.bank === null ? true : false,
    };
    setUpdateStatus({
      ...updateStatus,
      [fieldName + "Id"]: {
        ...updateStatus[fieldName + "Id"],
        validationError: errors[fieldName as keyof typeof errors],
      },
      //systemId: { ...updateStatus.systemId, validationError: errors.system },
      //yearId: { ...updateStatus.yearId, validationError: errors.year },
      //bankId: { ...updateStatus.bankId, validationError: errors.bank },
    });
    console.log("notValidateRequiredFields", errors);
    return errors[fieldName as keyof typeof errors];
  };
  ///////////////////////////////////////////////////////////////////
  // Focus management function
  const focusFirstInvalidField = () => {
    setTimeout(() => {
      if (updateStatus.systemId.validationError) {
        systemRef.current?.focus();
      } else if (updateStatus.yearId.validationError) {
        yearRef.current?.focus();
      } else if (updateStatus.bankId.validationError) {
        bankRef.current?.focus();
      }
    }, 100);
  };
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    setField("page", 1);
    setField("lastId", 0);
    setField("search", bankSearch);
  }, [bankSearch]);

  useEffect(() => {
    if (rowId !== 0) {
      getWorkTable?.();
      handleSelectedIdChange(rowId);
    }
  }, [updateFieldsResponse.data.result.id]);
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log(yearSearch, systemSearch);
    setChequeField("id", workFlowRowSelectResponse.workTableRow.formId);
    setUpdateStatus({
      ...updateStatus,
      prsn: {},
      sayadi: {},
      srName: {},
      marketerSrName: {},
      transferenceOwner: {},
      sarDate: {},
      accNo: {},
      no: {},
      amountT: {},
      dsc: {},
      sayadiMessage: {},
      systemId: {},
      yearId: {},
      bankId: {},
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
  }, [workFlowRowSelectResponse.workTableRow.formId]);
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
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
  ///////////////////////////////////////////////////////////////////
  // Enhanced setChequeFields with validation
  const setChequeFields = (
    fieldName: string,
    value: string | number | DefaultOptionType,
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

    // Clear validation error when user selects a value
    console.log("setChequeFields", fieldName, value);
    if (typeof value === "object") {
      setUpdateStatus({
        ...updateStatus,
        [`${fieldName}Id`]: {
          ...updateStatus[`${fieldName}Id`],
          validationError: value === null || value === undefined ? true : false,
        },
      });
    }
    setIsFieldChanged(true);
  };
  //////////////////////////////////////////////////////////////////
  // Enhanced updateCheque with validation
  const updateCheque = (
    fieldName: string,
    value: string | number | DefaultOptionType
  ) => {
    if (isFieldChanged) {
      // Validate required fields before updating
      if (
        fieldName === "system" ||
        fieldName === "year" ||
        fieldName === "bank"
      ) {
        if (notValidateRequiredFields(fieldName)) {
          console.log("notValidateRequiredFields", fieldName);
          focusFirstInvalidField();
          return;
        }
      }
      if (typeof value === "string" || typeof value === "number") {
        if (fieldName === "amountT") {
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
    }
  };

  //update fields state
  const capitalizeFirstLetter = (string: string): string => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const update = async (fieldName: string, value: string) => {
    setRowId(selectedId);
    updateFields({
      fieldName: capitalizeFirstLetter(fieldName),
      value: value,
      value2: "",
    });
  };
  /////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////
  const showValidationError = (fieldName: string) => {
    if (
      !isLoadingDefinition && !isLoadingBanks && updateStatus[fieldName]?.validationError !== undefined &&
      updateStatus[fieldName]?.validationError === true
    ) {
      console.log("showValidationError", fieldName, updateStatus);
      return (
        //<div className="text-red-500 text-xs mt-1">
        <img src={Err} alt="err" title="این فیلد الزامی است" />
        //</div>
      );
    }
    if (
    (isLoadingUpdateFields &&
      updateStatus[fieldName]?.isUpdating !== undefined &&
      updateStatus[fieldName]?.isUpdating) || (fieldName==="bankId" && isLoadingBanks)
    ) {
      return <Spinner size={4} color={colors.blue500} />;
    }
    if (
      !isLoadingUpdateFields &&
      updateStatus[fieldName]?.errorCode !== undefined &&
      updateStatus[fieldName]?.errorCode === 0
    ) {
      return <img src={Ok} alt="ok" title={updateStatus[fieldName]?.message} />;
    }
    if (
      !isLoadingUpdateFields &&
      updateStatus[fieldName]?.errorCode !== undefined &&
      updateStatus[fieldName]?.errorCode !== 0
    ) {
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
            <label className="w-24 text-left">
              <span className="text-red-500">* </span>سیستم:
            </label>
            <div className="flex w-full justify-center items-center gap-2">
              <AutoComplete
                required={true}
                showClearIcon={false}
                textColor={colors.gray_600}
                options={definitionInvironment?.systems ?? []}
                value={cheque.system}
                handleChange={(_event, newValue) => {
                  setChequeFields("system",newValue as DefaultOptionType);
                }}
                setSearch={setSystemSearch}
                showLabel={false}
                inputPadding="0 !important"
                backgroundColor={
                  updateStatus.systemId.validationError ? "#fef2f2" : "white"
                }
                ref={systemRef}
                handleBlur={() => {
                  updateCheque("system", cheque.system);
                }}
              />
              {showValidationError("systemId")}
            </div>
          </div>
          <div className="flex w-1/2 justify-center items-center gap-2">
            <label className="w-24 text-left">
              <span className="text-red-500">* </span>سال مالی:
            </label>
            <div className="flex w-full justify-center items-center gap-2">
              <AutoComplete
                required={true}
                showClearIcon={false}
                textColor={colors.gray_600}
                options={definitionInvironment?.years.map((year) => ({
                  id: year.id,
                  title: convertToFarsiDigits(year.code) ?? "",
                }))}
                value={cheque.year}
                handleChange={(_event, newValue) => {
                  setChequeFields("year", newValue as DefaultOptionType);
                }}
                setSearch={setYearSearch}
                showLabel={false}
                inputPadding="0 !important"
                backgroundColor={
                  updateStatus.yearId.validationError ? "#fef2f2" : "white"
                }
                ref={yearRef}
                handleBlur={() => {
                  updateCheque("year", cheque.year as DefaultOptionType);
                }}
              />
              {showValidationError("yearId")}
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
            {showValidationError("prsn")}
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
            {showValidationError("sayadi")}
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
            <label className="w-24 text-left">
              <span className="text-red-500">* </span>بانک:
            </label>
            <div className="flex w-full justify-center items-center gap-2">
              <AutoComplete
                required={true}
                showClearIcon={false}
                textColor={colors.gray_600}
                options={banks.map((b) => ({
                  id: b.id,
                  title: b.text,
                }))}
                value={cheque.bank}
                handleChange={(_event, newValue) => {
                  setChequeFields("bank", newValue as DefaultOptionType);
                }}
                setSearch={setBankSearch}
                showLabel={false}
                inputPadding="0 !important"
                backgroundColor={
                  updateStatus.bankId.validationError && !isLoadingBanks ? "#fef2f2" : "white"
                }
                ref={bankRef}
                handleBlur={() => {
                  updateCheque("bank", cheque.bank as DefaultOptionType);
                }}
              />
              {showValidationError("bankId")}
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
            {showValidationError("transferenceOwner")}
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
            {showValidationError("sarDate")}
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
            {showValidationError("accNo")}
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
                {showValidationError("no")}
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
                {showValidationError("fixSerial")}
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
            {showValidationError("amountT")}
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
          {showValidationError("dsc")}
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
