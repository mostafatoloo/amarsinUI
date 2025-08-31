import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  convertPersianDate,
  convertToFarsiDigits,
  convertToLatinDigits,
} from "../../utilities/general";
import ModalMessage from "../layout/ModalMessage";
import Skeleton from "../layout/Skeleton";
import ProductOfferParams from "./ProductOfferParams";
import ModalForm from "../layout/ModalForm";
import ProductOfferForm from "./ProductOfferForm";
import {
  ProductOffer as ProductOfferType,
  ProductOfferDtlTable,
} from "../../types/productOffer";
import { debounce } from "lodash";
import { TablePaginationActions } from "../controls/TablePaginationActions";
import ProductOfferFilter from "./ProductOfferFilter";
import ProductOfferHeader from "./ProductOfferHeader";

const ProductOffer = () => {
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
      Header: convertToFarsiDigits("پ 1"),
      accessor: "s1O",
      width: "5%",
    },
    {
      Header: convertToFarsiDigits("پ 2"),
      accessor: "s2O",
      width: "5%",
    },
    {
      Header: convertToFarsiDigits("پ 3"),
      accessor: "s3O",
      width: "5%",
    },
    {
      Header: convertToFarsiDigits("پ 4"),
      accessor: "s4O",
      width: "5%",
    },
    {
      Header: "بدون آفر",
      accessor: "no",
      width: "5%",
    },
    {
      Header: "توضیح",
      accessor: "dtlDsc",
      width: "20%",
    },
  ];

  const { setField, id: prevId ,productOfferDelResponse } = useProductOfferStore();
  const {
    productOffer,
    productOfferDtl,
    productOfferMeta,
    isLoading,
    isLoadingDtl,
    refetch,
    addProductList,
    productOfferDtlHistory,
    isLoadingProductOfferDtlHistory,
    productOfferSave,
    isLoadingProductOfferSave,
    productOfferDoFirstFlow,
    productOfferDel,
  } = useProductOffer();

  //const { setField: setProductOfferField } = useProductOfferStore();
  const [data, setData] = useState<any[]>([]);
  const [dataDtl, setDataDtl] = useState<ProductOfferDtlTable[]>([]);
  const { yearId, systemId, chartId } = useGeneralContext();
  const [selectedId, setSelectedId] = useState<number>(1363);
  const [isNew, setIsNew] = useState<boolean>(false); //for new
  const [isEdit, setIsEdit] = useState<boolean>(false); //for edit
  //for ProductOfferParams params
  const [regFDate, setRegFDate] = useState<Date | null>(null);
  const [regTDate, setRegTDate] = useState<Date | null>(null);
  const [fDate, setFDate] = useState<Date | null>(null);
  const [tDate, setTDate] = useState<Date | null>(null);
  const [state, setState] = useState<number>(0);
  const [selectedProductOffer, setSelectedProductOffer] =
    useState<ProductOfferType | null>(null);
  // for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const abortControllerRef = useRef<AbortController | null>(null);
  //add filter options
  const [srchId, setSrchId] = useState<number>(-1);
  const [srchDate, setSrchDate] = useState<string>("");
  const [srchTime, setSrchTime] = useState<string>("");
  const [srchDsc, setSrchDsc] = useState<string>("");
  const [srchAccepted, setSrchAccepted] = useState<number>(-1);
  const [srchUsrName, setSrchUsrName] = useState<string>("");
  const [srchStep, setSrchStep] = useState<string>("");
  const [sortId, setSortId] = useState<number>(0);
  const [sortDate, setSortDate] = useState<number>(0);
  const [sortTime, setSortTime] = useState<number>(0);
  const [sortDsc, setSortDsc] = useState<number>(0);
  const [sortAccepted, setSortAccepted] = useState<number>(0);
  const [sortUsrName, setSortUsrName] = useState<number>(0);
  const [sortStep, setSortStep] = useState<number>(0);

  useEffect(() => {
    console.log(
      "one of these were changed:" + systemId,
      chartId,
      pageNumber,
      pageSize
    );
    setField("acc_Year", yearId);
    setField("acc_System", systemId);
    setField("state", state);

    setField(
      "regFDate",
      regFDate === null || !regFDate
        ? ""
        : convertPersianDate(regFDate.toLocaleDateString("fa-IR"))
    );
    setField(
      "regTDate",
      regTDate === null || !regTDate
        ? ""
        : convertPersianDate(regTDate.toLocaleDateString("fa-IR"))
    );
    setField(
      "fDate",
      fDate === null || !fDate
        ? ""
        : convertPersianDate(fDate.toLocaleDateString("fa-IR"))
    );
    setField(
      "tDate",
      tDate === null || !tDate
        ? ""
        : convertPersianDate(tDate.toLocaleDateString("fa-IR"))
    );
  }, [yearId, systemId, state, regFDate, regTDate, fDate, tDate]);

  useEffect(() => {
    //setSelectedId(0);
    console.log("srchDsc in useEffect1", srchDsc);
    setField("srchId", srchId);
    setField("srchDate", srchDate);
    setField("srchTime", srchTime);
    setField("srchDsc", srchDsc);
    setField("srchAccepted", srchAccepted);
    setField("srchUsrName", srchUsrName);
    setField("srchStep", srchStep);
  }, []);

  useEffect(() => {
    console.log("sortDsc in useEffect2", sortDsc);
    setField("sortId", sortId);
    setField("sortDate", sortDate);
    setField("sortTime", sortTime);
    setField("sortDsc", sortDsc);
    setField("sortAccepted", sortAccepted);
    setField("sortUsrName", sortUsrName);
    setField("sortStep", sortStep);
  }, [
    sortId,
    sortDate,
    sortTime,
    sortDsc,
    sortAccepted,
    sortUsrName,
    sortStep,
  ]);
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    //console.log("pageNumber", pageNumber);
    console.log("pageNumber in useEffect3", pageNumber);
    setField("pageNumber", pageNumber);
  }, [pageNumber]);
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log("pageNumber in useEffect4", pageNumber);
    setPageNumber(1);
  }, [
    state,
    regFDate,
    regTDate,
    fDate,
    tDate,
    chartId,
    systemId,
    srchId,
    srchDate,
    srchTime,
    srchDsc,
    srchAccepted,
    srchUsrName,
    srchStep,
    yearId,
    sortId,
    sortDate,
    sortTime,
    sortDsc,
    sortAccepted,
    sortUsrName,
    sortStep,
  ]);

  const handleDebounceFilterChange = useCallback(
    debounce((field: string, value: string | number) => {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();

      setField(field, value);
    }, 500),
    [setField]
  );

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    //console.log("selectedId", selectedId);
    if (prevId !== selectedId) {
      setField("id", selectedId);
    }
    selectedId !== 0 &&
      setSelectedProductOffer(
        productOffer?.find((item) => item.id === selectedId) || null
      );
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
        index: convertToFarsiDigits((pageNumber - 1) * pageSize + index + 1),
      };
    });

    setData(tempData || []);
    if (tempData?.[0]?.id) {
      setSelectedId(Number(convertToLatinDigits(tempData?.[0]?.id)));
    } else {
      setSelectedId(0);
    }
  }, [productOffer]);

  useEffect(() => {
    let tempDataDtl: ProductOfferDtlTable[] = [];
    if (productOfferDtl) {
      tempDataDtl = productOfferDtl.map((item, index) => {
        return {
          index: convertToFarsiDigits(index + 1),
          id: item.id,
          bName: convertToFarsiDigits(item.bName),
          pId: item.pId,
          product: convertToFarsiDigits(item.product),
          lastDate: convertToFarsiDigits(item.lastDate),
          s1O:
            item.s1N + item.s1D < 0
              ? ""
              : convertToFarsiDigits(
                  item.s1D.toString() + "+" + item.s1N.toString()
                ),
          s2O:
            item.s2N + item.s2D < 0
              ? ""
              : convertToFarsiDigits(
                  item.s2D.toString() + "+" + item.s2N.toString()
                ),
          s3O:
            item.s3N + item.s3D < 0
              ? ""
              : convertToFarsiDigits(
                  item.s3D.toString() + "+" + item.s3N.toString()
                ),
          s4O:
            item.s4N + item.s4D < 0
              ? ""
              : convertToFarsiDigits(
                  item.s4D.toString() + "+" + item.s4N.toString()
                ),
          s1N: "",
          s1D: "",
          s2N: "",
          s2D: "",
          s3N: "",
          s3D: "",
          s4N: "",
          s4D: "",
          no: item.no ? (
            <img src={Accept} alt="Accept" className="w-4 h-4" />
          ) : null,
          dtlDsc: convertToFarsiDigits(item.dtlDsc),
        };
      });
      if (tempDataDtl) {
        setDataDtl(tempDataDtl);
      }
    }
  }, [productOfferDtl]);

  const handleSelectedIdChange = (id: number) => {
    //console.log(id, "id in WorkflowForm");
    setSelectedId(id);
  };

  const { isModalOpen, setIsModalOpen } = useGeneralContext();
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  useEffect(() => {
    let timeoutId: number;
    if (isModalOpen || isModalConfirmOpen || isModalDeleteOpen) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
        setIsModalConfirmOpen(false);
        setIsModalDeleteOpen(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen, isModalConfirmOpen, isModalDeleteOpen]);

  const handleConfirm = () => {
    setField("chartIdProductOfferDoFirstFlow", chartId);
    setField("acc_SystemProductOfferDoFirstFlow", systemId);
    setField("acc_YearProductOfferDoFirstFlow", yearId);
    setField("idProductOfferDoFirstFlow", selectedId);
    setIsModalConfirmOpen(true);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    productOfferDel(selectedId);
    setIsModalDeleteOpen(true);
  };

  return (
    <div
      className={`sm:h-full overflow-y-scroll flex flex-col bg-gray-200 pt-2 gap-2`}
    >
      {/* Top header */}
      <header className="flex items-center justify-between border-gray-300 border-b pb-2">
        <PageTitle />
        <div className="flex px-4 items-center gap-4">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setIsNew(true)} // for new
          >
            <img src={Add32} alt="Add32" className="w-6 h-6" />
            <p className="text-xs">جدید</p>
          </div>
          <div
            className={`flex flex-col items-center ${
              selectedProductOffer === null || selectedProductOffer.flwId !== 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={
              () =>
                selectedProductOffer === null ||
                selectedProductOffer.flwId !== 0
                  ? null
                  : handleDelete() //for productOffer/productOfferDel
            }
          >
            <img
              src={
                selectedProductOffer === null ||
                selectedProductOffer.flwId !== 0
                  ? Del24Disabled
                  : Del24
              }
              alt="Del24"
              className="w-6 h-6"
            />
            <p className="text-xs">حذف</p>
          </div>
          <div
            className={`flex flex-col items-center ${
              selectedProductOffer === null || selectedProductOffer.flwId !== 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={
              () =>
                selectedProductOffer === null ||
                selectedProductOffer.flwId !== 0
                  ? null
                  : handleEdit() // for edit
            } // for edit
          >
            <img
              src={
                selectedProductOffer === null ||
                selectedProductOffer.flwId !== 0
                  ? Edit24Disabled
                  : Edit24
              }
              alt="Edit24"
              className="w-6 h-6"
            />
            <p className="text-xs">ویرایش</p>
          </div>
          <div
            className={`flex flex-col items-center ${
              selectedProductOffer === null || selectedProductOffer.flwId !== 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <img
              src={
                selectedProductOffer === null ||
                selectedProductOffer.flwId !== 0
                  ? Accept24Disabled
                  : Accept24
              }
              alt="Accept24"
              className="w-6 h-6"
              onClick={() =>
                selectedProductOffer === null ||
                selectedProductOffer.flwId !== 0
                  ? null
                  : handleConfirm
              }
            />
            <p className="text-xs">تایید</p>
          </div>

          <ExcelExport data={data} headCells={columns} />

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => refetch()}
          >
            <img src={Refresh32} alt="Refresh32" className="w-6 h-6" />
            <p className="text-xs">بازخوانی</p>
          </div>
        </div>
      </header>
      <div className="flex gap-2 px-2 h-1/2">
        <div className="flex flex-col w-3/4 h-full">
          <div className="w-full overflow-y-scroll bg-white rounded-md h-full">
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <ProductOfferFilter
                  columns={columns}
                  srchId={srchId}
                  srchDate={srchDate}
                  srchTime={srchTime}
                  srchDsc={srchDsc}
                  srchAccepted={srchAccepted}
                  srchUsrName={srchUsrName}
                  srchStep={srchStep}
                  setSrchId={setSrchId}
                  setSrchDate={setSrchDate}
                  setSrchTime={setSrchTime}
                  setSrchDsc={setSrchDsc}
                  setSrchAccepted={setSrchAccepted}
                  setSrchUsrName={setSrchUsrName}
                  setSrchStep={setSrchStep}
                  handleDebounceFilterChange={handleDebounceFilterChange}
                />
                <ProductOfferHeader
                  columns={columns}
                  sortId={sortId}
                  sortDate={sortDate}
                  sortTime={sortTime}
                  sortDsc={sortDsc}
                  sortAccepted={sortAccepted}
                  sortUsrName={sortUsrName}
                  sortStep={sortStep}
                  setSortId={setSortId}
                  setSortDate={setSortDate}
                  setSortTime={setSortTime}
                  setSortDsc={setSortDsc}
                  setSortAccepted={setSortAccepted}
                  setSortUsrName={setSortUsrName}
                  setSortStep={setSortStep}
                />
                <TTable
                  columns={columns}
                  data={data}
                  fontSize="0.75rem"
                  changeRowSelectColor={true}
                  setSelectedId={handleSelectedIdChange}
                  wordWrap={false}
                  showToolTip={true}
                  showHeader={false}
                />
              </>
            )}
          </div>
          <div className="w-full bg-white rounded-md">
            <TablePaginationActions
              page={pageNumber - 1}
              setPage={setPageNumber}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalCount={productOffer?.[0]?.totalCount ?? 0}
            />
          </div>
        </div>
        {/* ProductOfferParams */}
        <div className="w-1/4 h-full">
          <ProductOfferParams
            regFDate={regFDate}
            setRegFDate={setRegFDate}
            regTDate={regTDate}
            setRegTDate={setRegTDate}
            fDate={fDate}
            setFDate={setFDate}
            tDate={tDate}
            setTDate={setTDate}
            setState={setState}
          />
        </div>
      </div>

      <div className="px-2 h-full">
        {isLoadingDtl ? (
          <Skeleton />
        ) : (
          <TTable
            columns={columnsDtl}
            data={dataDtl}
            fontSize="0.75rem"
            changeRowSelectColor={true}
            wordWrap={false}
            showToolTip={true}
          />
        )}
      </div>
      <ModalMessage
        isOpen={isModalOpen}
        backgroundColor="bg-red-200"
        bgColorButton="bg-red-500"
        bgColorButtonHover="bg-red-600"
        color="text-white"
        onClose={() => setIsModalOpen(false)}
        message={productOfferMeta?.message || ""}
      />
      <ModalForm
        isOpen={isNew || isEdit}
        onClose={() => {
          setIsNew(false);
          setIsEdit(false);
        }}
        title="آفرهای کالا"
        width="1"
      >
        <ProductOfferForm
          addProductList={addProductList}
          productOfferDtlHistory={productOfferDtlHistory || []}
          isLoadingProductOfferDtlHistory={isLoadingProductOfferDtlHistory}
          productOfferSave={productOfferSave}
          isLoadingProductOfferSave={isLoadingProductOfferSave}
          selectedProductOffer={selectedProductOffer} //for check if selectedProductOffer.flwId===0 new else edit && sending selectedProductOffer.id in edit
          productOfferDtls={productOfferDtl}
          isNew={isNew} //for check if isNew new else edit
        />
      </ModalForm>
      <ModalMessage
        isOpen={isModalConfirmOpen}
        onClose={() => setIsModalConfirmOpen(false)}
        backgroundColor={
          productOfferDoFirstFlow?.meta.errorCode === -1
            ? "bg-green-200"
            : "bg-red-200"
        }
        bgColorButton={
          productOfferDoFirstFlow?.meta.errorCode === -1
            ? "bg-green-500"
            : "bg-red-500"
        }
        color="text-white"
        message={productOfferDoFirstFlow?.meta.message || ""}
        visibleButton={false}
      />
      <ModalMessage
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        backgroundColor="bg-red-200"
        bgColorButton="bg-red-500"
        bgColorButtonHover="bg-red-600"
        color="text-white"
        message={
          productOfferDelResponse?.meta.errorCode !== -1
            ? productOfferDelResponse?.meta.message || ""
            : "اطلاعات با موفقیت حذف شد."
        }
        visibleButton={false}
      />
    </div>
  );
};

export default ProductOffer;
