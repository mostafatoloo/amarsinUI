import { green, indigo } from "@mui/material/colors";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { useWarehouse } from "../../hooks/useWarehouse";
import { WarehouseTemporaryReceiptIndent } from "../../types/warehouse";
import { Table } from "../controls/Table";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import Button from "../controls/Button";
import ConfirmCard from "../layout/ConfirmCard";

const WarehouseIndentTable = () => {
  const { isLoadingWarehouseIndentList, warehouseIndentList } = useWarehouse();
  const [rCnt, setRCnt] = useState("0");
  const [rOffer, setROffer] = useState("0");

  const headerGroups: HeaderGroup[] = [
    { label: "اطلاعات درخواست", colSpan: 8 },
    { label: "ثبت", colSpan: 2, backgroundColor: indigo[50] },
    { label: "", colSpan: 1 },
  ];
  const headCells: HeadCell<WarehouseTemporaryReceiptIndent>[] = [
    {
      id: "index",
      label: "ردیف",
      disableSorting: true,
      cellWidth: "5%",
      isNumber: true,
    },
    {
      id: "id",
      label: "شماره",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "payDuration",
      label: "سررسید",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "cnt",
      label: "تعداد",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "offer",
      label: "آفر",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "amnt",
      label: "تعداد کل",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "rem",
      label: "مانده",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "dcrmnt",
      label: "تخفیف",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "dsc",
      label: "شرح",
      cellWidth: "25%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "rCnt",
      label: "تعداد",
      cellWidth: "10%",
      disableSorting: true,
      backgroundColor: green[50],
      type: "input",
      val: rCnt,
      setVal: (e) => setValRCnt(e),
    },
    {
      id: "rOffer",
      label: "آفر",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      backgroundColor: green[50],
      type: "input",
      val: rOffer,
      setVal: (e) => setValROffer(e),
    },
  ];

  const setValRCnt = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Regular expression to allow only numbers
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setRCnt(value);
    }
  };
  const setValROffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Regular expression to allow only numbers
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setROffer(value);
    }
  };

  const data =
    warehouseIndentList.data.result.warehouseTemporaryReceiptIndentLists;

  return (
    <>
      {isLoadingWarehouseIndentList ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : warehouseIndentList.meta.errorCode !== -1 ? (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          {warehouseIndentList.meta.message}
        </p>
      ) : (
        <div
          className="w-full mt-2"
          //style={{ height: parentHeight }}
        >
          <Table
            data={data}
            headCells={headCells}
            headerGroups={headerGroups}
            wordWrap={true}
            pagination={false}
          />
          {/* <p>
            {rCnt},{rOffer}
          </p> */}
          {data.length > 0 && (
            <ConfirmCard>
              <Button text="تایید" />
            </ConfirmCard>
          )}
        </div>
      )}
    </>
  );
};

export default WarehouseIndentTable;
