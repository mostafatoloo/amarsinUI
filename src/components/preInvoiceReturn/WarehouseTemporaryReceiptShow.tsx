import { useEffect, useState } from "react";
import { usePreInvoiceReturn } from "../../hooks/usePreInvoiceReturn";
import { usePreInvoiceReturnStore } from "../../store/preInvoiceReturnStore";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import WarehouseTemporaryReceiptShowHeader from "./WarehouseTemporaryReceiptShowHeader";
import WarehouseTemporaryReceiptShowTable from "./WarehouseTemporaryReceiptShowTable";
import { DefaultOptionType } from "../../types/general";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

const WarehouseTemporaryReceiptShow = ({
  workFlowRowSelectResponse,
}: Props) => {
  const {
    warehouseTemporaryReceiptShowResponse,
    isLoading,
    isLoadingPreInvoiceDtlSearch,
    preInvoiceDtlSearchResponse,
  } = usePreInvoiceReturn();
  const { setField } = usePreInvoiceReturnStore();
  const [preInvoiceDtlSearchOptions, setPreInvoiceDtlSearchOptions] = useState<
    DefaultOptionType[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [preInvoiceReturnDtlsId, setPreInvoiceReturnDtlsId] = useState<number>(0);
  useEffect(() => {
    //console.log(workFlowRowSelectResponse.workTableRow.formId, "formId in InvoiceShowHeader");
    setField("id", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId]);

  useEffect(() => {
    console.log(preInvoiceReturnDtlsId,search,"preInvoiceReturnDtlsId,search");
    setField("pagePreInvoiceDtlSearch", 1);
    setField("searchPreInvoiceDtlSearch", search);
    setField(
      "preInvoiceDtlId",preInvoiceReturnDtlsId);
  }, [preInvoiceReturnDtlsId,search]);

  useEffect(() => {
    setPreInvoiceDtlSearchOptions(
      preInvoiceDtlSearchResponse.data.result.results.map((item) => ({
        id: item.id,
        title: item.text,
      }))
    );
  }, [preInvoiceDtlSearchResponse]);

  useEffect(() => {
    console.log(preInvoiceDtlSearchOptions);
  }, [preInvoiceDtlSearchOptions]);
  return (
    <div className="w-full flex flex-col">
      <WarehouseTemporaryReceiptShowHeader
        warehouseTemporaryReceiptShowResponse={
          warehouseTemporaryReceiptShowResponse
        }
      />
      <div className="flex items-center w-full justify-between gap-2 py-1">
        <p className="px-2 text-sm">اقلام</p>
        <hr className="w-full border-2 border-gray-300" />
      </div>
      <WarehouseTemporaryReceiptShowTable
        warehouseTemporaryReceiptShowResponse={
          warehouseTemporaryReceiptShowResponse
        }
        isLoadingWarehouseTemporaryReceiptShow={isLoading}
        preInvoiceDtlSearchOptions={preInvoiceDtlSearchOptions}
        CanEditForm1Dtl1={true} //{workFlowRowSelectResponse.workTableForms.canEditForm1Dtl1}
        setPreInvoiceReturnDtlsId={setPreInvoiceReturnDtlsId}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default WarehouseTemporaryReceiptShow;
