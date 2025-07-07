import {  useEffect, useState } from "react";
import { useInvoiceReceipt } from "../../hooks/useInvoiceReceipt";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { useInvoiceReceiptStore } from "../../store/invoiceReceiptStore";
import {
  convertPersianDate,
  parsePersianDateString,
} from "../../utilities/general";
import InvoiceReceiptShowTable from "./InvoiceReceiptShowTable";
import InvoiceReceipShowHeader from "./InvoiceReceipShowHeader";
import { DefaultOptionTypeStringId } from "../../types/general";
import ConfirmCard from "../layout/ConfirmCard";
import Button from "../controls/Button";
import { IndentShowProductListRequest } from "../../types/product";
import { useGeneralContext } from "../../context/GeneralContext";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

export type Fields = {
  customer: DefaultOptionTypeStringId | null;
  customerCondition: DefaultOptionTypeStringId[] | null;
  brand: DefaultOptionTypeStringId[] | null;
  payDuration: number;
  price: { id: number; title: string } | null;
  fdate: Date | null;
  tdate: Date | null;
};

const InvoiceReceiptShow = ({ workFlowRowSelectResponse }: Props) => {
  const { setField, mrsId } = useInvoiceReceiptStore();
  const { yearId } = useGeneralContext();
  const { indentMrsResponse, isLoading } = useInvoiceReceipt();
  //  const { addProductList } = useProducts();

  useEffect(() => {
    if (mrsId !== workFlowRowSelectResponse.workTableRow.formId)
      setField("mrsId", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId]);

  const [fields, setFields] = useState<Fields>({
    customer: {
      id: indentMrsResponse.indents[0]?.cId.toString() ?? "",
      title: indentMrsResponse.indents[0]?.srName ?? "",
    },
    customerCondition: [],
    brand: [],
    payDuration: indentMrsResponse.indents[0]?.payDuration ?? 0,
    price: {
      id: 0,
      title: "",
    },
    fdate: parsePersianDateString(indentMrsResponse.indents[0]?.saleFDate)
      ? parsePersianDateString(indentMrsResponse.indents[0]?.saleFDate)
      : null,
    tdate: parsePersianDateString(indentMrsResponse.indents[0]?.saleTDate)
      ? parsePersianDateString(indentMrsResponse.indents[0]?.saleTDate)
      : null,
  });

  useEffect(() => {
    setFields((prev: Fields) => ({
      ...prev,
      customer: {
        id: indentMrsResponse.indents[0]?.cId.toString() ?? "",
        title: indentMrsResponse.indents[0]?.srName ?? "",
      },
      payDuration: indentMrsResponse.indents[0]?.payDuration ?? 0,
      price: {
        id: indentMrsResponse.indents[0]?.salesPriceId ?? 0,
        title: indentMrsResponse.indents[0]?.salesPriceTitle ?? "",
      },
      fdate: parsePersianDateString(indentMrsResponse.indents[0]?.saleFDate)
        ? parsePersianDateString(indentMrsResponse.indents[0]?.saleFDate)
        : null,
      tdate: parsePersianDateString(indentMrsResponse.indents[0]?.saleTDate)
        ? parsePersianDateString(indentMrsResponse.indents[0]?.saleTDate)
        : null,
    }));
  }, [isLoading, indentMrsResponse]);

  {
    isLoading && <p>Loading...</p>;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let request: IndentShowProductListRequest;
    request = {
      mrsId,
      productId: 0,
      acc_Year: yearId,
      providers:
        fields.customerCondition?.map((provider) => Number(provider.id)) ?? [],
      brands: fields.brand?.map((b) => Number(b.id)) ?? [],
      salesPriceId: Number(fields.price?.id ?? 0),
      saleFDate:
        fields.fdate === null || !fields.fdate
          ? ""
          : convertPersianDate(fields.fdate.toLocaleDateString("fa-IR")),
      saleTDate:
        fields.tdate === null || !fields.tdate
          ? ""
          : convertPersianDate(fields.tdate.toLocaleDateString("fa-IR")),
    };

    console.log(request, "request");
    try {
      //const response = await addProductList(request);
      console.log("response");
    } catch (error) {
      console.error("Error editing indents:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <InvoiceReceipShowHeader
        fields={fields}
        setFields={setFields}
        indentMrsResponse={indentMrsResponse}
      />
      <ConfirmCard variant="flex-row gap-2 rounded-bl-md rounded-br-md justify-end">
        <Button
          text="ایجاد لیست"
          backgroundColor="bg-white"
          color="text-blue-500"
          backgroundColorHover="bg-blue-500"
          colorHover="text-white"
          variant="shadow-lg"
          onClick={handleSubmit}
        />
        <Button
          text="اکسل"
          backgroundColor="bg-white"
          color="text-green-500"
          backgroundColorHover="bg-green-500"
          colorHover="text-white"
          variant="shadow-lg"
          onClick={() => console.log("first")}
        />
      </ConfirmCard>

      <div className="flex justify-between items-center">
        <p className="mt-2 px-2 text-sm">اقلام</p>
        <div className="flex gap-2 items-center justify-center">
          <input type="checkbox" />
          <p>نمایش حذف شده ها</p>
        </div>
      </div>

      <InvoiceReceiptShowTable
        indentMrsResponse={indentMrsResponse}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InvoiceReceiptShow;
