import { useEffect, useState } from "react";
import { useInvoiceReceipt } from "../../hooks/useInvoiceReceipt";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { useInvoiceReceiptStore } from "../../store/invoiceReceiptStore";
import { convertToFarsiDigits } from "../../utilities/general";
import InvoiceReceiptShowTable from "./InvoiceReceiptShowTable";
import InvoiceReceipShowHeader from "./InvoiceReceipShowHeader";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

type Def = { id: string; title: string };
export type Fields = {
  customer: Def | null;
  customerCondition: Def | null;
  brand: Def | null;
  payDuration: number;
  price: string;
  fdate: string;
  tdate: string;
};

const InvoiceReceiptShow = ({ workFlowRowSelectResponse }: Props) => {
  const { setField, mrsId } = useInvoiceReceiptStore();
  const { indentMrsResponse, isLoading } = useInvoiceReceipt();

  useEffect(() => {
    if (mrsId !== workFlowRowSelectResponse.workTableRow.formId)
      setField("mrsId", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId]);

  const [fields, setFields] = useState<Fields>({
    customer: {
      id: indentMrsResponse.indents[0]?.cId.toString() ?? "",
      title: indentMrsResponse.indents[0]?.srName ?? "",
    },
    customerCondition: {
      id: "0",
      title: "",
    },
    brand: {
      id: "0",
      title: "",
    },
    payDuration: indentMrsResponse.indents[0]?.payDuration ?? 0,
    price: indentMrsResponse.indents[0]?.salesPriceTitle ?? "",
    fdate: convertToFarsiDigits(indentMrsResponse.indents[0]?.saleFDate ?? ""),
    tdate: convertToFarsiDigits(indentMrsResponse.indents[0]?.saleTDate ?? ""),
  });

  useEffect(() => {
    setFields((prev: Fields) => ({
      ...prev,
      customer: {
        id: indentMrsResponse.indents[0]?.cId.toString() ?? "",
        title: indentMrsResponse.indents[0]?.srName ?? "",
      },
      payDuration: indentMrsResponse.indents[0]?.payDuration ?? 0,
      price: indentMrsResponse.indents[0]?.salesPriceTitle ?? "",
      fdate: convertToFarsiDigits(indentMrsResponse.indents[0]?.saleFDate ?? ""),
      tdate: convertToFarsiDigits(indentMrsResponse.indents[0]?.saleTDate ?? ""),
    }));
  }, [isLoading,indentMrsResponse]);

  {
    isLoading && <p>Loading...</p>;
  }

  return (
    <div className="w-full flex flex-col">
      <InvoiceReceipShowHeader
        fields={fields}
        setFields={setFields}
        indentMrsResponse={indentMrsResponse}
      />

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
