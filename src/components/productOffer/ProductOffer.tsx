import { useEffect, useState } from "react";
import PageTitle from "../layout/PageTitle";
import ExcelExport from "../../utilities/ExcelExport";
import Add32 from "../../assets/images/GrayThem/add32.png";
//import Add24Disabled from "../../assets/images/GrayThem/add24_disabled.png";
import Refresh32 from "../../assets/images/GrayThem/rfrsh32.png";
import Del24 from "../../assets/images/GrayThem/del24.png";
import Del24Disabled from "../../assets/images/GrayThem/del_disabled24.png";
import Edit24 from "../../assets/images/GrayThem/edit24.png";
import Edit24Disabled from "../../assets/images/GrayThem/edit24_disabled.png";
import Accept24 from "../../assets/images/GrayThem/accept24.png";
import Accept24Disabled from "../../assets/images/GrayThem/accept24_disabled.png";
import Accept from "../../assets/images/GrayThem/img24_3.png";
import { useGeneralContext } from "../../context/GeneralContext";
import TTable from "../controls/TTable";
import { useProductOfferStore } from "../../store/productOfferStore";
import { useProductOffer } from "../../hooks/useProductOffer";
import { convertToFarsiDigits } from "../../utilities/general";

type Props = {};

const ProductOffer = (props: Props) => {
  const [data, setData] = useState<any>([]);
  const [dataDtl, setDataDtl] = useState<any>([]);
  const columns = [
    {
      Header: "ردیف",
      accessor: "index",
      width: "5%",
    },
    {
      Header: "شناسه",
      accessor: "id",
      width: "5%",
    },
    {
      Header: "تاریخ",
      accessor: "dat",
      width: "7%",
    },
    {
      Header: "ساعت",
      accessor: "tim",
      width: "5%",
    },
    {
      Header: "توضیح",
      accessor: "dsc",
      width: "40%",
    },
    {
      Header: "تایید",
      accessor: "accepted",
      width: "3%",
    },
    {
      Header: "کاربر",
      accessor: "usrName",
      width: "15%",
    },
    {
      Header: "مرحله",
      accessor: "flowMapName",
      width: "20%",
    },
  ];
  const columnsDtl = [
    {
      Header: "ردیف",
      accessor: "index",
      width: "5%",
    },
    {
      Header: "برند",
      accessor: "bName",
      width: "10%",
    },
    {
      Header: "کالا",
      accessor: "product",
      width: "40%",
    },
    {
      Header: "پ 1",
      accessor: "s1NO",
      width: "5%",
    },
    {
      Header: "پ 2",
      accessor: "s2NO",
      width: "5%",
    },
    {
      Header: "پ 3",
      accessor: "s3NO",
      width: "5%",
    },
    {
      Header: "پ 4",
      accessor: "s4NO",
      width: "5%",
    },
    {
      Header: "بدون آفر",
      accessor: "s5NO",
      width: "5%",
    },
    {
      Header: "توضیح",
      accessor: "dtlDsc",
      width: "20%",
    },
  ];

  const { setField } = useProductOfferStore();
  const { productOffer, productOfferDtl } = useProductOffer();
  const { yearId, systemId } = useGeneralContext();
  const [selectedId, setSelectedId] = useState<number>(1363);

  useEffect(() => {
    setField("acc_Year", yearId);
    setField("acc_System", systemId);
    setField("state", 0);
    /*  setField("id", 0);
    setField("regFDate", "");
    setField("regTDate", "");
    setField("fDate", "");
    setField("tDate", "");*/
  }, [yearId, systemId]);

  useEffect(() => {
    console.log("selectedId", selectedId);
    setField("id", selectedId);
  }, [selectedId]);

  useEffect(() => {
    const tempData = productOffer?.map((item, index) => {
      return {
        ...item,
        id: convertToFarsiDigits(item.id),
        dat: convertToFarsiDigits(item.dat),
        tim: convertToFarsiDigits(item.tim),
        dsc: convertToFarsiDigits(item.dsc),
        accepted: item.accepted ? (
          <img src={Accept} alt="Accept" className="w-4 h-4" />
        ) : null,
        usrName: convertToFarsiDigits(item.usrName),
        flowMapName: convertToFarsiDigits(item.flowMapName),
        index: convertToFarsiDigits(index + 1),
      };
    });
    
    setData(tempData);
  }, [productOffer]);

  useEffect(() => {
    const tempDataDtl = productOfferDtl?.map((item, index) => {
      return {
        ...item,
        index: convertToFarsiDigits(index + 1),
        bName: convertToFarsiDigits(item.bName),
        product: convertToFarsiDigits(item.product),
        s1No: convertToFarsiDigits(item.s1NO),
        s2No: convertToFarsiDigits(item.s2NO),
        s3No: convertToFarsiDigits(item.s3NO),
        s4No: convertToFarsiDigits(item.s4NO),
        s5No: convertToFarsiDigits(item.s5NO),
        dsc: convertToFarsiDigits(item.dtlDsc),
      };
    });
    setDataDtl(tempDataDtl);
  }, [selectedId]);

  const handleSelectedIdChange = (id: number) => {
    //console.log(id, "id in WorkflowForm");
    setSelectedId(id);
  };

  return (
    <div
      className={`sm:h-full overflow-y-scroll flex flex-col bg-gray-200 pt-2 gap-2`}
    >
      {/* Top header */}
      <header className="flex items-center justify-between border-gray-300 border-b pb-2">
        <PageTitle />
        <div className="flex px-4 items-center gap-4">
          <div className="flex flex-col items-center cursor-pointer">
            <img src={Add32} alt="Add32" className="w-6 h-6" />
            <p className="text-xs">جدید</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img
              src={data?.length > 0 ? Del24 : Del24Disabled}
              alt="Del24"
              className="w-6 h-6"
            />
            <p className="text-xs">حذف</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img
              src={data?.length > 0 ? Edit24 : Edit24Disabled}
              alt="Edit24"
              className="w-6 h-6"
            />
            <p className="text-xs">ویرایش</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img
              src={data?.length > 0 ? Accept24 : Accept24Disabled}
              alt="Accept24"
              className="w-6 h-6"
            />
            <p className="text-xs">تایید</p>
          </div>

          <ExcelExport data={data} headCells={columns} />

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => console.log("object")}
          >
            <img src={Refresh32} alt="Refresh32" className="w-6 h-6" />
            <p className="text-xs">بازخوانی</p>
          </div>
        </div>
      </header>
      <div className="flex gap-2 px-2 h-1/2">
        <div className="w-3/4 overflow-y-scroll bg-white rounded-md">
          <TTable
            columns={columns}
            data={data}
            fontSize="0.75rem"
            changeRowSelectColor={true}
            setSelectedId={handleSelectedIdChange}
            wordWrap={false}
            showToolTip={true}
          />
        </div>
        <div className="w-1/4">something</div>
      </div>

      <div className="px-2 h-full">
        <TTable
          columns={columnsDtl}
          data={dataDtl}
          fontSize="0.75rem"
          changeRowSelectColor={true}
          wordWrap={false}
          showToolTip={true}
        />
      </div>

      {/* Main content */}
      {/*<main className="flex flex-col items-center justify-center px-2">
            <ProducerListForm
              data={data} //{rpProducts}
              headCells={allColumns}
              brand={brand}
              setBrand={setBrand}
              sanadKind={sanadKind}
              setSanadKind={setSanadKind}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              //onShowDetails={handleShowDetails}
            />
          </main>*/}
    </div>
  );
};

export default ProductOffer;
