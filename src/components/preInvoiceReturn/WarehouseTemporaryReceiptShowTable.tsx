import React, { useEffect, useState } from "react";
import { colors } from "../../utilities/color";
import {
  ResponsePreInvoiceDtlSearch,
  ResultWarehouseTemporaryReceiptShow,
} from "../../types/preInvoiceReturn";
import { convertToFarsiDigits } from "../../utilities/general";
import { FaCheck } from "react-icons/fa";
import TTable, { EditableInput } from "../controls/TTable";
import Skeleton from "../layout/Skeleton";
import { DefaultOptionType } from "../../types/general";

type Props = {
  warehouseTemporaryReceiptShowResponse: ResultWarehouseTemporaryReceiptShow;
  isLoadingWarehouseTemporaryReceiptShow: boolean;
  preInvoiceDtlSearchOptions: DefaultOptionType[];
  CanEditForm1Dtl1: boolean;
  setPreInvoiceReturnDtlsId: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: (search: string) => void;
};

const WarehouseTemporaryReceiptShowTable = ({
  warehouseTemporaryReceiptShowResponse,
  isLoadingWarehouseTemporaryReceiptShow,
  preInvoiceDtlSearchOptions,
  CanEditForm1Dtl1,
  setPreInvoiceReturnDtlsId,
  search,
  setSearch,
}: Props) => {
  const columns = [
    {
      Header: "اطلاعات درخواست",
      width: "70%",
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
          width: "7%",
        },
        {
          Header: "uid",
          accessor: "cCode",
          width: "10%",
        },
        {
          Header: "انقضاء",
          accessor: "expireDate",
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
          Header: "فاکتور",
          accessor: "factorNo",
          width: "10%",
        },
        {
          Header: "شرح",
          accessor: "dtlDsc",
          width: "12%",
        },
      ],
    },
    {
      Header: "ثبت",
      width: "26%",
      backgroundColor: colors.indigo50,
      columns: [
        {
          Header: "رسید موقت",
          accessor: "tempReciept",
          width: "15%",
          backgroundColor: colors.indigo50,
          type: "autoComplete",
          options: preInvoiceDtlSearchOptions,
          setSearch,
          search,
          placeholder: "رسید موقت را انتخاب کنید...",
          Cell: CanEditForm1Dtl1
            ? EditableInput
            : ({ value }: any) => convertToFarsiDigits(value),
        },
        {
          Header: "تعداد",
          accessor: "regedCnt",
          width: "3%",
          backgroundColor: colors.indigo50,
        },
        {
          Header: "آفر",
          accessor: "regedOffer",
          width: "3%",
          backgroundColor: colors.indigo50,
        },
        {
          Header: "وضعیت",
          accessor: "statusCode",
          width: "5%",
          backgroundColor: colors.indigo50,
        },
      ],
    },
    {
      Header: "...",
      width: "4%",
      backgroundColor: colors.indigo50, //indigo[50]
      columns: [
        {
          Header: "...",
          accessor: "wtrdId",
          width: "4%",
          backgroundColor: colors.indigo50,
          //Cell: EditableInput,
        },
      ],
    },
  ];
  const [data, setData] = useState<any[]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0); //for selected row index in warehouseTemporaryReceiptShowTable table
  ///////////////////////////////////////////////////////
  useEffect(() => {
    setData(
      warehouseTemporaryReceiptShowResponse.preInvoiceReturnDtls.map(
        (item, idx) => ({
          ...item,
          index: convertToFarsiDigits(idx + 1),
          product: convertToFarsiDigits(item.product),
          cupCode: convertToFarsiDigits(item.cupCode),
          uid: convertToFarsiDigits(item.uid),
          expireDate:
            convertToFarsiDigits(item.expireYear) +
            "/" +
            convertToFarsiDigits(item.expireMonth) +
            "/" +
            convertToFarsiDigits(item.expireDay),
          cnt: convertToFarsiDigits(item.cnt),
          appearanceImage: item.appearance ? <FaCheck color="green" /> : null,
          factorNo: convertToFarsiDigits(item.factorNo),
          dtlDsc: convertToFarsiDigits(item.dtlDsc),
          wtrdText: convertToFarsiDigits(item.wtrdText),
          regedCnt: convertToFarsiDigits(Number(item.regedCnt)),
          regedOffer: convertToFarsiDigits(Number(item.regedOffer)),
          statusCode: convertToFarsiDigits(item.statusCode),
          wtrdId: convertToFarsiDigits(item.wtrdId),
        })
      )
    );
  }, [warehouseTemporaryReceiptShowResponse]);

  useEffect(() => {
    console.log(selectedRowIndex,"selectedRowIndex")
    setPreInvoiceReturnDtlsId(
      warehouseTemporaryReceiptShowResponse.preInvoiceReturnDtls[
        selectedRowIndex
      ].id
    );
  }, [selectedRowIndex]);

  return (
    <>
      {isLoadingWarehouseTemporaryReceiptShow ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : (
        <>
          <TTable
            columns={columns}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            data={data}
            //fontSize="0.75rem"
            changeRowSelectColor={true}
            wordWrap={true}
            canEditForm={CanEditForm1Dtl1}
            //CellColorChange={handleCellColorChange}
          />
        </>
      )}
    </>
  );
};

export default WarehouseTemporaryReceiptShowTable;
