import PageTitle from "../../../components/layout/PageTitle";
import Refresh32 from "../../../assets/images/GrayThem/rfrsh32.png";
import ExcelIcon from "../../../assets/images/GrayThem/excel24.png";
import Survey24 from "../../../assets/images/GrayThem/survey24.png";
import CupboardsReportShow from "../../../components/cupboardsReport/CupboardsReportShow";
import { handleExport } from "../../../utilities/ExcelExport";
import { useEffect, useState } from "react";
import { TableColumns } from "../../../types/general";

const CupboardsReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns: TableColumns = [
    {
      Header: "ردیف",
      accessor: "index",
      width: "3%",
    },
    {
      Header: "کد کالا",
      accessor: "fullCode",
      width: "5%",
    },
    {
      Header: "نام کالا",
      accessor: "fullName",
      width: "30%",
    },
    {
      Header: "تولید",
      accessor: "prodDate",
      width: "5%",
    },
    {
      Header: "انقضاء",
      accessor: "expDate",
      width: "5%",
    },
    {
      Header: "GTIN",
      accessor: "gtin",
      width: "9%",
    },
    {
      Header: "تتیاک",
      accessor: "ttac",
      width: "2%",
    },
    {
      Header: "بچ",
      accessor: "code",
      width: "7%",
    },
    {
      Header: "IRC",
      accessor: "irc",
      width: "9%",
    },
    {
      Header: "UID",
      accessor: "uid",
      width: "9%",
    },
    {
      Header: "موقت",
      accessor: "tmp",
      width: "3%",
    },
    {
      Header: "ورودی",
      accessor: "inc",
      width: "3%",
    },
    {
      Header: "خروجی",
      accessor: "outc",
      width: "3%",
    },
    {
      Header: "موجودی",
      accessor: "stck",
      width: "3%",
    },
    {
      Header: "وضعیت",
      accessor: "status",
      width: "3%",
    },
    {
      Header: "id",
      accessor: "id",
      width: "5%",
    },
  ];  
  useEffect(()=>{console.log(isModalOpen)},[])
  
  const [data, setData] = useState<any[]>([])
  return (
    <div className="h-[calc(100vh-72px)] overflow-y-auto flex flex-col bg-gray-200 pt-2">
      <header className="flex flex-col gap-2 md:flex-row items-center justify-between border-gray-300 border-b pb-2">
        <PageTitle />
        <div className="flex px-4 items-center gap-4">
          <div className="flex flex-col items-center cursor-pointer">
            <img src={Survey24} alt="Add32" className="w-6 h-6" />
            <p className="text-xs">استعلام</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            handleExport({
              data,
              setIsModalOpen,
              headCells: columns,
              fileName: "data_export.xlsx",
            })
          }}>
            <img src={ExcelIcon} alt="ExcelIcon" className="w-6 h-6" />
            <p className="text-xs">اکسل</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => console.log("hello")}
          >
            {/*onClick={()=>getWorkTable()}>*/}
            <img src={Refresh32} alt="Refresh32" className="w-6 h-6" />
            <p className="text-xs">بازخوانی</p>
          </div>
        </div>
      </header>
      <CupboardsReportShow data={data} setData={setData} columns={columns}/>
    </div>
  );
};

export default CupboardsReport;
