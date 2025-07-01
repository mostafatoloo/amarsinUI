import { Paper } from "@mui/material";
import { useInvoice } from "../../hooks/useInvoice";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { InvoiceDetail } from "../../types/invoice";
import { Table } from "../controls/Table";
import Skeleton from "../layout/Skeleton";

const InvoiceShowTable = () => {
  const { isLoading, invoiceShowIdResponse } = useInvoice();
  const headCells: HeadCell<InvoiceDetail>[] = [
    {
      id: "index",
      label: "ردیف",
      disableSorting: true,
      cellWidth: "5%",
      isNumber: true,
    },
    {
      id: "product",
      label: "کالا",
      cellWidth: "30%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "cnt",
      label: "تعداد",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "offer",
      label: "آفر",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "cost",
      label: "قیمت",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      isCurrency: true,
    },
    {
      id: "valueTax",
      label: "ارزش افزوده",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "total",
      label: "جمع",
      cellWidth: "25%",
      isNumber: true,
      disableSorting: true,
      isCurrency: true,
    },
  ];

  const headerGroups: HeaderGroup[] = [{ label: "اقلام", colSpan: 7 }];

  const handleRowClick = (
    item: InvoiceDetail,
    setSelectedRowId: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    setSelectedRowId(Number(item["id"]));
  };
  return (
    <>
      <Paper className="p-2 mt-2 w-full">
        {isLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : invoiceShowIdResponse.meta.errorCode !== -1 ? (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            {invoiceShowIdResponse.meta.message}
          </p>
        ) : (
          <div className="w-full mt-2">
            <Table
              data={invoiceShowIdResponse.data.result.invoiceDtls}
              headCells={headCells}
              headerGroups={headerGroups}
              cellFontSize="0.75rem"
              wordWrap={true}
              rowClickHandler={handleRowClick}
            />
          </div>
        )}
      </Paper>
    </>
  );
};

export default InvoiceShowTable;
