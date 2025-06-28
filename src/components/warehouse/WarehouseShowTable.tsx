import { Paper } from "@mui/material";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { Table } from "../controls/Table";
import Skeleton from "../layout/Skeleton";
import { useWarehouse } from "../../hooks/useWarehouse";
import {
  IndentRequest,
  RegRequest,
  WarehouseTemporaryReceiptIndentDtl,
  WarehouseTemporaryReceiptIndentDtlTable,
} from "../../types/warehouse";
import HistoryIcon from "../../assets/images/GrayThem/history_gray_16.png";
import EditIcon from "../../assets/images/GrayThem/edit_gray16.png";
import { grey, red, indigo, green } from "@mui/material/colors";
import { convertToFarsiDigits } from "../../utilities/general";
import { useWarehouseStore } from "../../store/warehouseStore";
import ConfirmCard from "../layout/ConfirmCard";
import Button from "../controls/Button";
import { useAuthStore } from "../../store/authStore";
import { useWorkflowRowSelect } from "../../hooks/useWorkflow";

type Props = {
  setEditClicked: (editClicked: boolean) => void;
  setStatusClicked: (statusClicked: boolean) => void;
  setSelectedProduct: (dtl: WarehouseTemporaryReceiptIndentDtl) => void;
  setIocId: (iocId: number) => void;
  setIsModalOpenReg: (isModalOpenReg: boolean) => void;
  setConfirmHasError: (isModalOpenReg: boolean) => void;
};

const WarehouseShowTable = ({
  setEditClicked,
  setStatusClicked,
  setSelectedProduct,
  setIocId,
  setIsModalOpenReg,
  setConfirmHasError,
}: Props) => {
  const { isLoadingWarehouseShowId, warehouseShowIdResponse, reg } =
    useWarehouse();
  const { workFlowRowSelectResponse } = useWorkflowRowSelect();
  const { authApiResponse } = useAuthStore();
  const { setField } = useWarehouseStore();
  const headCells: HeadCell<WarehouseTemporaryReceiptIndentDtlTable>[] = [
    {
      id: "index",
      label: "ردیف",
      disableSorting: true,
      cellWidth: "3%",
      isNumber: true,
      changeColor: true,
    },
    {
      id: "id",
      label: "شناسه",
      disableSorting: true,
      cellWidth: "3%",
      isNumber: true,
      changeColor: true,
      isNotVisible: true,
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
      cellWidth: "5%",
      disableSorting: true,
      changeColor: true,
    },
    {
      id: "statusOriginal",
      label: "وضعیت",
      cellWidth: "5%",
      disableSorting: true,
      changeColor: true,
      isNotVisible: true,
    },
    {
      id: "cId",
      label: "بچ",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
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
      cellWidth: "22%",
      isNumber: true,
      disableSorting: false,
      changeColor: true,
    },
    {
      id: "cnt",
      label: "تعداد",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: false,
      isCurrency: true,
      changeColor: true,
    },
    {
      id: "indentCode",
      label: "شماره",
      cellWidth: "5%",
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
      cellWidth: "15%",
      isNumber: true,
      disableSorting: false,
      backgroundColor: green[50],
    },
    {
      id: "editIcon",
      label: "",
      cellWidth: "50px",
      disableSorting: false,
      backgroundColor: green[50],
    },
    {
      id: "rCnt",
      label: "تعداد",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: false,
      backgroundColor: indigo[50],
    },
    {
      id: "rOffer",
      label: "آفر",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: false,
      isCurrency: true,
      backgroundColor: indigo[50],
    },
    {
      id: "historyIcon",
      label: "",
      cellWidth: "50px",
      disableSorting: false,
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
    if (cell.changeColor && item?.["statusOriginal"] > 0) {
      return red[100];
    }
    return grey[50];
  };

  const handleStatusClick = (dtl: WarehouseTemporaryReceiptIndentDtl) => {
    setSelectedProduct(dtl);
    setStatusClicked(true);
  };

  const handleEditClick = (dtl: WarehouseTemporaryReceiptIndentDtl) => {
    setField("iocId", dtl.iocId);
    setIocId(dtl.iocId);
    console.log(dtl, "dtl");
    setEditClicked(true);
  };

  const data =
    warehouseShowIdResponse.data.result.response.warehouseTemporaryReceiptIndentDtls.map(
      (dtl) => {
        return {
          id:dtl.id,
          expire: dtl.expire,
          uId: dtl.uId,
          status: (
            <div className="flex justify-evenly items-center">
              {convertToFarsiDigits(dtl.status)}
              <input
                type="checkbox"
                checked={dtl.status === 0 ? true : false}
                readOnly
                onClick={() => handleStatusClick(dtl)}
              />
            </div>
          ),
          editIcon: <img src={EditIcon} onClick={() => handleEditClick(dtl)} />,
          statusOriginal: dtl.status,
          cId: dtl.cId,
          code: dtl?.code,
          pCode: dtl.pCode,
          pName: dtl.pName,
          cnt: dtl.cnt,
          indentId:
            dtl.indents.length > 0
              ? dtl.indents.map((indent) => indent.id).join(" ")
              : "",
          indentCode:
            dtl.indents.length > 0
              ? dtl.indents.map((indent) => indent.code).join("\n")
              : "",
          indentCnt:
            dtl.indents.length > 0
              ? dtl.indents.map((indent) => indent.cnt).join("\n")
              : "",
          indentOffer:
            dtl.indents.length > 0
              ? dtl.indents.map((indent) => indent.offer).join("\n")
              : "",
          indentDsc:
            dtl.indents.length > 0
              ? dtl.indents.map((indent) => indent.dsc).join(" ")
              : "",
          rCnt: dtl.rCnt,
          rOffer: dtl.rOffer,
          historyIcon: <img src={HistoryIcon} />,
        };
      }
    );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    /*if (sum1 !== sum2) {
        setIsModalOpen(true);
        return;
      }*/

    let request: RegRequest;
    let indents: IndentRequest[] = [];

    let dataReg =
      warehouseShowIdResponse.data.result.response
        .warehouseTemporaryReceiptIndentDtls;

    dataReg.map((item) => {
      return indents.push({
        id: item.iocId,
        cnt: Number(item.rCnt),
        offer: Number(item.rOffer),
      });
    });
    request = {
      usrId: authApiResponse?.data.result.login.usrId ?? 0,
      id: workFlowRowSelectResponse.workTableRow.formId,
      customerId: authApiResponse?.data.result.login.customerId ?? 0,
      dtls: indents,
    };

    console.log(request, "request");

    try {
      const response = await reg(request);
      //handleWarehouseIndentListClose();

      // Now we can check the response directly
      //if (response.meta.errorCode !== -1) {
      console.log(
        response.meta.errorCode,
        response.meta.message,
        "response.meta.errorCode"
      );
      if (response.meta.errorCode === 1) setConfirmHasError(true);
      else setConfirmHasError(false);
      setIsModalOpenReg(true);
      // }
    } catch (error) {
      console.error("Error editing indents:", error);
      //setIsModalOpen(true);
    }
  };

  const handleRowClick = (
    item: WarehouseTemporaryReceiptIndentDtlTable,
    setSelectedRowId: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    setSelectedRowId(Number(item["id"]));
  };

  return (
    <>
      <Paper className="p-2 mt-2 w-full">
        {isLoadingWarehouseShowId ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : warehouseShowIdResponse.meta.errorCode !== -1 ? (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            {warehouseShowIdResponse.meta.message}
          </p>
        ) : (
          <div className="w-full mt-2">
            <Table
              data={data}
              headCells={headCells}
              headerGroups={headerGroups}
              cellFontSize="0.75rem"
              cellColorChangeHandler={handleCellColorChange}
              rowClickHandler={handleRowClick}
              wordWrap={true}
            />
          </div>
        )}
        {data.length > 0 && (
          <ConfirmCard>
            <Button text="تایید" onClick={handleSubmit} />
          </ConfirmCard>
        )}
      </Paper>
    </>
  );
};

export default WarehouseShowTable;
