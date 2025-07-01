import { useEffect, useState } from "react";
import { convertToFarsiDigits } from "../../utilities/general";
import AutoComplete from "../controls/AutoComplete";
import { useCustomers } from "../../hooks/useCustomers";
import { IndentMrsResponse } from "../../types/invoiceReceipt";
import { useGeneralContext } from "../../context/GeneralContext";
import { useCustomerStore } from "../../store/customerStore";
import { useBrand } from "../../hooks/useBrands";
import { useBrandStore } from "../../store/brandStore";
import { Fields } from "./invoiceReceiptShow";

type Props = {
  fields: Fields;
  setFields: React.Dispatch<React.SetStateAction<Fields>>;
  indentMrsResponse: IndentMrsResponse;
};
const InvoiceReceipShowHeader = ({
  fields,
  setFields,
  indentMrsResponse,
}: Props) => {
  const { customers } = useCustomers();
  const [search, setSearch] = useState<string>("");
  const { systemId, yearId } = useGeneralContext();
  const { setField: setCusomerField } = useCustomerStore();
  const { setField: setBrandField } = useBrandStore();
  useEffect(() => {
    setCusomerField("systemId", systemId);
    setCusomerField("yearId", yearId);
    setCusomerField("search", search);
  }, [search, systemId]);

  useEffect(() => {
    setBrandField("accSystem", systemId);
    setBrandField("search", search);
  }, [search, systemId]);
  const { brands } = useBrand();

  const body1 = (
    <div className="mt-2 text-sm w-full flex flex-col gap-2 border border-gray-400 rounded-md p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="w-full flex">
          <label className="p-1 w-24 text-left">تامین کننده:</label>
          <div className="bg-slate-50 flex w-full">
            <AutoComplete
              options={customers.map((b) => ({
                id: b.id,
                title: b.text,
              }))}
              value={fields.customer}
              handleChange={(_event, newValue) => {
                return setFields((prev: Fields) => {
                  return { ...prev, customer: newValue };
                });
              }}
              setSearch={setSearch}
              showLabel={false}
              inputPadding="0 !important"
              showClearIcon={false}
              outlinedInputPadding="5px"
              
            />
          </div>
        </div>
        <div className="flex">
          <label className="p-1">سررسید:</label>
          <input
            value={fields.payDuration}
            onChange={(e) =>
              setFields((prev: Fields) => ({
                ...prev,
                payDuration: Number(e.target.value),
              }))
            }
            className="text-sm text-gray-800 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex">
          <label className="p-1">تاریخ:</label>
          <input
            type="text"
            value={convertToFarsiDigits(indentMrsResponse.indents[0]?.dat ?? "")}
            disabled
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex">
          <label className="p-1">ساعت:</label>
          <input
            type="text"
            value={convertToFarsiDigits(indentMrsResponse.indents[0]?.tim ?? "")}
            disabled
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="flex">
        <label className="p-1 w-24 text-left">توضیحات:</label>
        <input
          type="text"
          value={convertToFarsiDigits(indentMrsResponse.indents[0]?.dsc ?? "")}
          disabled
          className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );

  const body2 = (
    <div className="mt-2 text-sm w-full flex flex-col gap-2 border border-gray-400 rounded-md p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="w-full flex">
          <label className="p-1 w-24 text-left">تامین کننده:</label>
          <div className="bg-slate-50 flex w-full">
            <AutoComplete
              options={customers.map((b) => ({
                id: b.id,
                title: b.text,
              }))}
              value={fields.customerCondition}
              handleChange={(_event, newValue) => {
                return setFields((prev: Fields) => {
                  return { ...prev, customerCondition: newValue };
                });
              }}
              setSearch={setSearch}
              showLabel={false}
              inputPadding="0 !important"
              showClearIcon={false}
              outlinedInputPadding="5px"
              placeholder="تامین کننده را انتخاب کنید..."
            />
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <label htmlFor="year" className="p-1 w-24 text-left">
          برند:
        </label>
        <div className="bg-slate-50 flex w-full">
          <AutoComplete
            options={brands.map((b) => ({
              id: b.id,
              title: b.text,
            }))}
            value={fields.brand}
            handleChange={(_event, newValue) => {
              return setFields((prev: Fields) => {
                return { ...prev, brand: newValue };
              });
            }}
            setSearch={setSearch}
            showLabel={false}
            inputPadding="0 !important"
            outlinedInputPadding="5px"
            placeholder="برند را انتخاب کنید..."
          />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-1/3 flex">
          <label className="p-1 w-28 text-left">قیمت:</label>
          <input
            type="text"
            value={fields.price}
            onChange={(e) =>
              setFields((prev: Fields) => ({
                ...prev,
                price: e.target.value,
              }))
            }
            className="text-sm text-gray-800 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-1/3 flex">
          <label className="p-1  w-36 text-left">فروش از تاریخ:</label>
          <input
            type="text"
            value={fields.fdate}
            onChange={(e) =>
              setFields((prev: Fields) => ({
                ...prev,
                fdate: e.target.value,
              }))
            }
            className="text-sm text-gray-800 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-1/3 flex">
          <label className="p-1 w-36 text-left">تا تاریخ:</label>
          <input
            type="text"
            value={fields.tdate}
            onChange={(e) =>
              setFields((prev: Fields) => ({
                ...prev,
                tdate: e.target.value,
              }))
            }
            className="text-sm text-gray-800 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {body1}
      <p className="mt-2 px-2 text-sm">شرایط</p>
      {body2}
    </>
  );
};

export default InvoiceReceipShowHeader;
