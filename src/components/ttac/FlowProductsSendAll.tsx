import { useEffect, useState } from "react";
import { useTtac } from "../../hooks/useTtac";
import FlowProductsSendAllHeader from "./FlowProductsSendAllHeader";
import FlowProductsSendAllTable from "./FlowProductsSendAllTable";
import { TableColumns } from "../../types/general";
import { convertToFarsiDigits, convertToPersianDate } from "../../utilities/general";
import Flow16 from "../../assets/images/GrayThem/flow16.png";
import { useTTacStore } from "../../store/ttacStore";
import { useGeneralContext } from "../../context/GeneralContext";

const FlowProductsSendAll = () => {
  const { refetchFlowProductsSendAll, flowProductsSendAllResponse,isLoadingFlowProductsSendAll, isFetchingFlowProductsSendAll } = useTtac();
  const { setField } = useTTacStore();
  const {yearId,systemId}= useGeneralContext()
  const [sendDate, setSendDate] = useState<Date | null>(new Date());
  const [sendTtacSent, setSendTtacSent] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  // for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(35);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);

  const columns: TableColumns = [
    {
      Header: "ردیف",
      accessor: "index",
      width: "2%",
    },
    {
      Header: "eventId",
      accessor: "eventId",
      width: "14%",
    },
    {
      Header: "پیام",
      accessor: "msg",
      width: "15%",
    },
    {
      Header: "تایید",
      accessor: "successed",
      width: "2%",
    },
    {
      Header: "انصراف",
      accessor: "isCancel",
      width: "2%",
    },
    {
      Header: "نوع",
      accessor: "title",
      width: "3%",
    },
    {
      Header: "کد",
      accessor: "code",
      width: "3%",
    },
    {
      Header: "تاریخ",
      accessor: "dat",
      width: "5%",
    },
    {
      Header: "طرف حساب",
      accessor: "srName",
      width: "14%",
    },
    {
      Header: "بچ",
      accessor: "lotNumber",
      width: "5%",
    },
    {
      Header: "IRC",
      accessor: "irc",
      width: "7%",
    },
    {
      Header: "کالا",
      accessor: "pName",
      width: "16%",
    },
    {
      Header: "تغییر مکان",
      accessor: "completeDate",
      width: "5%",
    },
    {
      Header: "مرحله",
      accessor: "flowMapName",
      width: "5%",
    },
    {
      Header: "تعداد",
      accessor: "cnt",
      width: "2%",
    },
    {
      Header: " ",
      accessor: "statusImages",
      width: "2%",
    },
  ];
  //////////////////////////////////////////////////////////////  
  useEffect(() => {
    setPageNumber(1);
  }, [sendDate, sendTtacSent]);
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    setField("sendSystemId", systemId);
    setField("sendYearId", yearId);
    setField("sendDate", convertToPersianDate(sendDate ?? new Date()));
    setField("sendTtacSent", sendTtacSent);
  }, [sendDate, sendTtacSent, systemId, yearId]);
  // for initializing data
  useEffect(() => {
    if (flowProductsSendAllResponse.data.result.length === 0) return;
    const tempData = flowProductsSendAllResponse.data.result.map((c, index) => {
      return {
        ...c,
        eventId: convertToFarsiDigits(c.eventId),
        msg: convertToFarsiDigits(c.msg),
        successed: convertToFarsiDigits(c.successed),
        isCancel: convertToFarsiDigits(c.isCancel),
        title: convertToFarsiDigits(c.title),
        code: convertToFarsiDigits(c.code),
        dat: convertToFarsiDigits(c.dat),
        srName: convertToFarsiDigits(c.srName),
        lotNumber: convertToFarsiDigits(c.lotNumber),
        irc: convertToFarsiDigits(c.irc),
        pName: convertToFarsiDigits(c.pName),
        completeDate: convertToFarsiDigits(c.completeDate),
        flowMapName: convertToFarsiDigits(c.flowMapName),
        cnt: convertToFarsiDigits(Number(c.cnt)),
        index: convertToFarsiDigits((pageNumber - 1) * pageSize + index + 1),
        statusImages: (
          <div className="flex justify-evenly items-center w-full">
            <input
              type="checkbox"
              checked={false}
              readOnly
              //onClick={() => handleStatusClick(dtl)}
            />
            <img src={Flow16} alt="Flow16" className="w-4 h-4" />
          </div>
        ),
      };
    });
    console.log(tempData);
    setData(tempData);
  }, [flowProductsSendAllResponse.data.result]);
  //////////////////////////////////////////////////////////////
  return (
    <div className="w-full flex flex-col gap-2 text-sm text-gray-500">
      <FlowProductsSendAllHeader
        sendDate={sendDate}
        setSendDate={setSendDate}
        sendTtacSent={sendTtacSent}
        setSendTtacSent={setSendTtacSent}
        refetchFlowProductsSendAll={refetchFlowProductsSendAll}
      />
      <FlowProductsSendAllTable
        isLoading={isLoadingFlowProductsSendAll || isFetchingFlowProductsSendAll}
        columns={columns}
        data={data}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={flowProductsSendAllResponse.data.total_count ?? 0}
        selectedRowIndex={selectedRowIndex}
        setSelectedRowIndex={setSelectedRowIndex}
      />
    </div>
  );
};

export default FlowProductsSendAll;
