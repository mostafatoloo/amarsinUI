import { Paper } from "@mui/material";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { Table } from "../controls/Table";
import Skeleton from "../layout/Skeleton";
import { useWarehouse } from "../../hooks/useWarehouse";
import { WarehouseTemporaryReceiptIndentDtlTable } from "../../types/warehouse";
import HistoryIcon from "../../assets/images/GrayThem/history_gray_16.png";
import EditIcon from "../../assets/images/GrayThem/edit_gray16.png";
import { grey, red, indigo, green } from "@mui/material/colors";

const WarehouseShowTable = () => {
  const { isLoading, warehouseShowIdResponse } = useWarehouse();
  const headCells: HeadCell<WarehouseTemporaryReceiptIndentDtlTable>[] = [
    {
      id: "index",
      label: "ردیف",
      disableSorting: true,
      cellWidth: "5%",
      isNumber: true,
      changeColor: true,
    },
    {
      id: "expire",
      label: "انقضاء",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
      changeColor: true,
    },
    {
      id: "uId",
      label: "UID",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      changeColor: true,
    },
    {
      id: "status",
      label: "وضعیت",
      cellWidth: "10%",
      disableSorting: true,
      changeColor: true,
    },
    {
      id: "cId",
      label: "بچ",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
      isCurrency: true,
      changeColor: true,
    },
    {
      id: "code",
      label: "کد",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
      changeColor: true,
    },
    {
      id: "pName",
      label: "کالا",
      cellWidth: "20%",
      isNumber: true,
      disableSorting: true,
      changeColor: true,
    },
    {
      id: "cnt",
      label: "تعداد",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
      isCurrency: true,
      changeColor: true,
    },
    {
      id: "indentCode",
      label: "شماره",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      backgroundColor: green[50],
    },
    {
      id: "indentCnt",
      label: "تعداد",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
      backgroundColor: green[50],
    },
    {
      id: "indentOffer",
      label: "آفر",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
      backgroundColor: green[50],
    },
    {
      id: "indentDsc",
      label: "شرح",
      cellWidth: "20%",
      isNumber: true,
      disableSorting: true,
      backgroundColor: green[50],
    },
    {
      id: "indentId",
      label: "",
      icon: EditIcon,
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      backgroundColor: green[50],
    },

    {
      id: "rCnt",
      label: "تعداد",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      backgroundColor: indigo[50],
    },
    {
      id: "rOffer",
      label: "آفر",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      isCurrency: true,
      backgroundColor: indigo[50],
    },
    {
      id: "id",
      label: "",
      icon: HistoryIcon,
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      isCurrency: true,
      backgroundColor: indigo[50],
    },
  ];

  const headerGroups: HeaderGroup[] = [
    { label: "اطلاعات رسید موقت", colSpan: 8 },
    { label: "درخواست های مرتبط", colSpan: 5, backgroundColor: green[50] },
    { label: "اطلاعات ثبت", colSpan: 3, backgroundColor: indigo[50] },
  ];

  // Custom cell click handler for Table
  const handleCellColorChange = (
    cell: HeadCell<WarehouseTemporaryReceiptIndentDtlTable>,
    item: WarehouseTemporaryReceiptIndentDtlTable
  ) => {
    if (cell.changeColor && item?.["status"] > 0) {
      return red[100];
    }
    return grey[50];
  };

  return (
    <>
      <Paper className="p-2 mt-2 w-full">
        {isLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : warehouseShowIdResponse.meta.errorCode !== -1 ? (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            {warehouseShowIdResponse.meta.message}
          </p>
        ) : (
          <div className="w-full mt-2">
            <Table
              data={warehouseShowIdResponse.data.result.response.warehouseTemporaryReceiptIndentDtls.map(
                (dtl) => {
                  return {
                    expire: dtl.expire,
                    uId: dtl.uId,
                    status: dtl.status,
                    cId: dtl.cId,
                    code: dtl?.code,
                    pCode: dtl.pCode,
                    pName: dtl.pName,
                    cnt: dtl.cnt,
                    indentId:
                      dtl.indents.length > 0
                        ? dtl.indents
                            .map((indent) => {
                              return indent.id;
                            })
                            .join(" ")
                        : "",
                    indentCode:
                      dtl.indents.length > 0
                        ? dtl.indents
                            .map((indent) => {
                              return indent.code;
                            })
                            .join(" ")
                        : "",
                    indentCnt:
                      dtl.indents.length > 0
                        ? dtl.indents
                            .map((indent) => {
                              return indent.cnt;
                            })
                            .join(" ")
                        : "",
                    indentOffer:
                      dtl.indents.length > 0
                        ? dtl.indents
                            .map((indent) => {
                              return indent.offer;
                            })
                            .join(" ")
                        : "",
                    indentDsc:
                      dtl.indents.length > 0
                        ? dtl.indents
                            .map((indent) => {
                              return indent.dsc;
                            })
                            .join(" ")
                        : "",
                    rCnt: dtl.rCnt,
                    rOffer: dtl.rOffer,
                  };
                }
              )}
              headCells={headCells}
              headerGroups={headerGroups}
              cellFontSize="0.75rem"
              cellColorChangeHandler={handleCellColorChange}
            />
          </div>
        )}
      </Paper>
    </>
  );
};

export default WarehouseShowTable;
