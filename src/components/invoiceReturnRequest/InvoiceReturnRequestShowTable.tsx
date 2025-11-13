import React, { useEffect, useState } from "react";
import { InvoiceReturnRequestShowResponse } from "../../types/invoiceReturnRequest";
import { convertToFarsiDigits } from "../../utilities/general";
import Skeleton from "../layout/Skeleton";
import { Paper } from "@mui/material";
import TTable from "../controls/TTable";
import { colors } from "../../utilities/color";
import HistoryIcon from "../../assets/images/GrayThem/history_gray_16.png";
import { FaCheck } from "react-icons/fa";

type Props = {
  invoiceReturnRequestShowResponse: InvoiceReturnRequestShowResponse;
  isLoadingInvoiceReturnRequestShow: boolean;
};

const InvoiceReturnRequestShowTable = ({
  invoiceReturnRequestShowResponse,
  isLoadingInvoiceReturnRequestShow,
}: Props) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0); //for selected row index in warehouseShowTable table
  const [data, setData] = useState<any[]>([]);
  const columns = React.useMemo(
    () => [
      {
        Header: "اطلاعات درخواست",
        width: "56%",
        columns: [
          {
            Header: "ردیف",
            accessor: "index",
            width: "3%",
          },
          {
            Header: "کالا",
            accessor: "product",
            width: "15%",
          },
          {
            Header: "قفسه",
            accessor: "cupCode",
            width: "5%",
          },
          {
            Header: "UID",
            accessor: "uid",
            width: "10%",
          },
          {
            Header: "انقضاء",
            accessor: "expDate",
            width: "5%",
          },
          {
            Header: "تعداد",
            accessor: "cnt",
            width: "5%",
          },
          {
            Header: "سالم",
            accessor: "appearanceImage",
            width: "3%",
          },
          {
            Header: "شرح",
            accessor: "dtlDsc",
            width: "10%",
          },
        ],
      },
      {
        Header: "کنترل",
        width: "24%",
        backgroundColor: colors.green50,
        columns: [
          {
            Header: "تشخیص",
            accessor: "determination",
            width: "22%",
            backgroundColor: colors.green50,
          },
          {
            Header: "...",
            accessor: "editIcon",
            width: "2%",
            backgroundColor: colors.green50,
            Cell: ({ row }: any) => (
              <img
                src={HistoryIcon}
                onClick={() => console.log(row)}
                className="cursor-pointer"
                alt="report"
              />
            ),
          },
        ],
      },
      {
        Header: "اطلاعات ثبت",
        width: "20%",
        backgroundColor: colors.indigo50,
        columns: [
          {
            Header: "فاکتور",
            accessor: "factorNo",
            width: "8%",
            backgroundColor: colors.indigo50,
          },
          {
            Header: "تعداد",
            accessor: "regedCnt",
            width: "5%",
            backgroundColor: colors.indigo50,
          },
          {
            Header: "آفر",
            accessor: "regedOffer",
            width: "5%",
            backgroundColor: colors.indigo50,
          },
          {
            Header: "...",
            accessor: "historyIcon",
            width: "2%",
            backgroundColor: colors.indigo50,
            Cell: ({ value }: any) => (
              <img
                src={HistoryIcon}
                onClick={() => console.log(value)}
                className="cursor-pointer"
                alt="report"
              />
            ),
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const tempData: any[] =
      invoiceReturnRequestShowResponse.data.result.invoiceReturnRequestDtls.map(
        (item, index) => {
          const diagnosises =
            invoiceReturnRequestShowResponse.data.result.diagnosises
              .filter((diagnosis) => diagnosis.id === item.id)
              .map((diagnosis) => diagnosis.msg);
          return {
            ...item,
            index: convertToFarsiDigits(index + 1),
            product: convertToFarsiDigits(item.product),
            cupCode: convertToFarsiDigits(item.cupCode),
            uid: convertToFarsiDigits(item.uid),
            expDate: convertToFarsiDigits(
              item.expireYear + "/" + item.expireMonth + "/" + item.expireDay
            ),
            cnt: convertToFarsiDigits(item.cnt),
            appearanceImage: item.appearance ? (
              <div className="w-full flex items-center justify-center">
                <FaCheck color="green" />
              </div>
            ) : null,
            dtlDsc: convertToFarsiDigits(item.dtlDsc),
            determination:
              diagnosises.length > 0
                ? diagnosises.map((diagnosis) => (
                    <div className="flex items-center justify-left">
                      <span className="text-2xl px-2">•</span>
                      <p>{convertToFarsiDigits(diagnosis)}</p>
                    </div>
                  ))
                : null,
            factorNo: convertToFarsiDigits(item.factorNo),
            regedCnt: convertToFarsiDigits(item.regedCnt),
            regedOffer: convertToFarsiDigits(item.regedOffer),
          };
        }
      );
    setData(tempData);
  }, [invoiceReturnRequestShowResponse.data.result.invoiceReturnRequestDtls]);

  return (
    <Paper className="p-2 mt-2 w-full">
      {isLoadingInvoiceReturnRequestShow ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : invoiceReturnRequestShowResponse.meta.errorCode > 0 ? (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          {invoiceReturnRequestShowResponse.meta.message}
        </p>
      ) : (
        <div className="w-full mt-2">
          <TTable
            columns={columns}
            data={data}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            //updateMyData={updateMyData}
            fontSize="0.75rem"
          />
        </div>
      )}
    </Paper>
  );
};

export default InvoiceReturnRequestShowTable;
