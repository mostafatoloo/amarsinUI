import { useEffect, useState } from "react";
import { useDefinitionInvironment } from "../../hooks/useDefinitionInvironment";
import { DefaultOptionType } from "../../types/general";
import { convertToFarsiDigits } from "../../utilities/general";
import AutoComplete from "../controls/AutoComplete";
import { PayRequestResponse } from "../../types/payRequest";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { useCustomers } from "../../hooks/useCustomers";
import { AuthApiResponse } from "../../types/auth";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
  payRequestResponse: PayRequestResponse;
  authApiResponse: AuthApiResponse;
};

const PayRequestShowHeader = ({
  workFlowRowSelectResponse,
  payRequestResponse,
  authApiResponse,
}: Props) => {
  const canEditForm1Mst1 =
    workFlowRowSelectResponse.workTableForms.canEditForm1Mst1;
  const canEditForm1Mst2 =
    workFlowRowSelectResponse.workTableForms.canEditForm1Mst2;
  const { definitionInvironment } = useDefinitionInvironment();
  const initData = authApiResponse?.data.result.initData;
  const { customers } = useCustomers();
  const [customer, setCustomer] = useState<DefaultOptionType | null>(null);
  const [customerSearch, setCustomerSearch] = useState<string>("");
  const [systemSearch, setSystemSearch] = useState<string>("");
  const [yearSearch, setYearSearch] = useState<string>("");
  const [system, setSystem] = useState<{ id: number; title: string } | null>({
    id: initData?.systemId ?? 0,
    title: convertToFarsiDigits(initData?.systemTitle) ?? "",
  });
  const [year, setYear] = useState<{ id: number; title: string } | null>({
    id: initData?.yearId ?? 0,
    title: convertToFarsiDigits(initData?.yearTitle) ?? "",
  });

  useEffect(() => {
    console.log(customerSearch,systemSearch,yearSearch);
  }, []);
  
  return (
    <div className="mt-2 text-sm w-full flex flex-col gap-2 border border-gray-400 rounded-md p-2">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-1/4 flex justify-center items-center">
          <label className="p-1 w-20 text-left">سیستم:</label>
          <div className="bg-slate-50 flex w-full rounded-md">
            <AutoComplete
              options={definitionInvironment?.systems ?? []}
              value={system}
              handleChange={(_event, newValue) => {
                return setSystem(newValue as DefaultOptionType);
              }}
              setSearch={setSystemSearch}
              showLabel={false}
              inputPadding="0 !important"
              showClearIcon={false}
              changeColorOnFocus={true}
              disabled={!canEditForm1Mst1}
            />
          </div>
        </div>
        <div className="w-1/4 flex justify-center items-center">
          <label className="p-1 w-20 text-left">سال مالی:</label>
          <div className="bg-slate-50 flex w-full rounded-md">
            <AutoComplete
              options={
                definitionInvironment?.years !== undefined
                  ? definitionInvironment?.years.map((b) => ({
                      id: b.id,
                      title: convertToFarsiDigits(b.code),
                    }))
                  : []
              }
              value={year}
              handleChange={(_event, newValue) => {
                return setYear(newValue as DefaultOptionType);
              }}
              setSearch={setYearSearch}
              showLabel={false}
              inputPadding="0 !important"
              showClearIcon={false}
              changeColorOnFocus={true}
              disabled={!canEditForm1Mst1}
            />
          </div>
        </div>
        <div className="w-1/4 flex">
          <label className="p-1 w-24 text-left">تاریخ:</label>
          <input
            type="text"
            value={convertToFarsiDigits(
              payRequestResponse.data.result.payRequests[0]?.dat
            )}
            disabled={!canEditForm1Mst2}
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex w-1/4">
          <label className="p-1 w-36 text-left">ساعت:</label>
          <input
            type="text"
            value={convertToFarsiDigits(
              payRequestResponse.data.result.payRequests[0]?.tim
            )}
            disabled={!canEditForm1Mst2}
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex w-1/2">
          <div className="flex w-1/3">
            <label className="p-1 w-20 text-left">از تاریخ:</label>
            <input
              type="text"
              value={convertToFarsiDigits(
                payRequestResponse.data.result.payRequests[0]?.fDate
              )}
              disabled={!canEditForm1Mst1}
              className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex w-1/3">
            <label className="p-1 w-20 text-left">تا تاریخ:</label>
            <input
              type="text"
              value={convertToFarsiDigits(
                payRequestResponse.data.result.payRequests[0]?.tDate
              )}
              disabled={!canEditForm1Mst1}
              className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex w-1/3">
            <label className="p-1 w-20 text-left">سررسید:</label>
            <input
              type="text"
              value={convertToFarsiDigits(
                payRequestResponse.data.result.payRequests[0]?.dueDate
              )}
              disabled={!canEditForm1Mst1}
              className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex w-1/2">
          <div className="flex w-1/2">
            <label className="p-1 w-24 text-left">مبلغ تسویه:</label>
            <input
              type="text"
              value={convertToFarsiDigits(
                payRequestResponse.data.result.payRequests[0]?.settleAmnt
              )}
              disabled={!canEditForm1Mst1}
              className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex w-1/2">
            <label className="p-1 w-36 text-left">مبلغ تامین کننده:</label>
            <input
              type="text"
              value={convertToFarsiDigits(
                payRequestResponse.data.result.payRequests[0]?.providerAmnt
              )}
              disabled={!canEditForm1Mst1}
              className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <label className="p-1 w-20 text-left">خریدار:</label>
        <div className="bg-slate-50 flex w-full rounded-md">
          <AutoComplete
            options={customers.map((b) => ({
              id: b.id,
              title: b.text,
            }))}
            value={customer}
            handleChange={(_event, newValue) => {
              return setCustomer(newValue as DefaultOptionType | null);
            }}
            setSearch={setCustomerSearch}
            showLabel={false}
            inputPadding="0 !important"
            showClearIcon={false}
            changeColorOnFocus={true}
            disabled={!canEditForm1Mst2}
          />
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <label className="p-1 w-20 text-left">توضیحات:</label>
        <input
          type="text"
          value={convertToFarsiDigits(
            payRequestResponse.data.result.payRequests[0]?.dsc
          )}
          disabled={!canEditForm1Mst1}
          className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default PayRequestShowHeader;
