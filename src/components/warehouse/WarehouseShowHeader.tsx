import { useEffect } from "react";
import { useWorkflowRowSelect } from "../../hooks/useWorkflow";
import { convertToFarsiDigits } from "../../utilities/general";
import { useWarehouse } from "../../hooks/useWarehouse";
import { useWarehouseStore } from "../../store/warehouseStore";

const WarehouseShowHeader = () => {
  const { workFlowRowSelectResponse } = useWorkflowRowSelect();
  const { warehouseShowIdResponse } = useWarehouse();
  const { setField } = useWarehouseStore();

  useEffect(() => {
    setField("formId", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId]);

  return (
    <div className="mt-2 text-sm w-full flex flex-col gap-2 border border-gray-400 rounded-md p-2">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-3/4 flex">
          <label className="p-1 w-24 text-left">تامین کننده:</label>
          <input
            type="text"
            value={
              warehouseShowIdResponse.data.result.response
                .warehouseTemporaryReceiptMst.srName
            }
            disabled
            className="text-sm w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-1/4 flex">
          <label className="p-1 w-12 text-left">تاریخ:</label>
          <input
            type="text"
            value={convertToFarsiDigits(
              warehouseShowIdResponse.data.result.response
                .warehouseTemporaryReceiptMst.dat
            )}
            disabled
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex w-3/4">
          <label className="p-1 w-24 text-left">توضیحات:</label>
          <input
            type="text"
            value={convertToFarsiDigits(
              warehouseShowIdResponse.data.result.response
                .warehouseTemporaryReceiptMst.exp
            )}
            disabled
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex w-1/4">
          <label className="p-1 w-12 text-left">انبار:</label>
          <input
            type="text"
            value={convertToFarsiDigits(
              warehouseShowIdResponse.data.result.response
                .wName
            )}
            disabled
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WarehouseShowHeader;
