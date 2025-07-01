import { Paper, useTheme } from "@mui/material";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { Table } from "../controls/Table";
import Skeleton from "../layout/Skeleton";
import {
  IndentDtl,
  IndentDtlTable,
  IndentMrsResponse,
} from "../../types/invoiceReceipt";
import TrashIcon from "../../assets/images/GrayThem/delete_gray_16.png";
import HistoryIcon from "../../assets/images/GrayThem/history_gray_16.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  convertToFarsiDigits,
  convertToLatinDigits,
} from "../../utilities/general";
import { debounce } from "lodash";
import { useProducts } from "../../hooks/useProducts";
import AutoComplete from "../controls/AutoComplete";
import { useProductStore } from "../../store/productStore";
import { useGeneralContext } from "../../context/GeneralContext";

type Props = {
  indentMrsResponse: IndentMrsResponse;
  isLoading: boolean;
};

type Def = { id: number; title: string };

const InvoiceReceiptShowTable = ({ indentMrsResponse, isLoading }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [dtlDscSearch, setDtlDscSearch] = useState<string>("");
  const [productSearch, setProductSearch] = useState<string>("");
  const { products } = useProducts();
  const [product, setProduct] = useState<Def[]>([{ id: 0, title: "" }]);
  const [cnt, setCnt] = useState(["0"]);
  const [offer, setOffer] = useState(["0"]);
  const [cost, setCost] = useState(["0"]);
  const [dcrmnt, setDcrmnt] = useState(["0"]);
  const [dsc, setDsc] = useState([""]);
  const { systemId, yearId } = useGeneralContext();
  const { setField: setProductField } = useProductStore();

  useEffect(() => {
    setProductField("accSystem", systemId);
    setProductField("accYear", yearId);
    setProductField("searchTerm", search);
  }, [search, systemId, yearId]);

  const headCells: HeadCell<IndentDtlTable>[] = [
    {
      id: "index",
      label: "ردیف",
      disableSorting: true,
      cellWidth: "2%",
      isNumber: true,
    },
    {
      id: "bName",
      label: "برند",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "productAutoComplete",
      label: "کالا",
      cellWidth: "25%",
    },
    {
      id: "companyStock",
      label: "موجودی",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "storeStock",
      label: "فروش",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "sumCompanyCnt",
      label: "موجودی",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "sumStoreCnt",
      label: "فروش",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
    },
    {
      id: "lbDate",
      label: "خرید",
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
      type: "input",
      val: cnt,
      setVal: (e, idx) => setValue(e, idx, setCnt),
    },
    {
      id: "offer",
      label: "آفر",
      cellWidth: "5%",
      isNumber: true,
      disableSorting: true,
      type: "input",
      val: offer,
      setVal: (e, idx) => setValue(e, idx, setOffer),
    },
    {
      id: "cost",
      label: "مبلغ",
      cellWidth: "5%",
      isNumber: true,
      isCurrency: true,
      disableSorting: true,
      type: "input",
      val: cost,
      setVal: (e, idx) => setValue(e, idx, setCost),
    },
    {
      id: "dcrmnt",
      label: "تخفیف",
      cellWidth: "5%",
      isNumber: true,
      isCurrency: true,
      disableSorting: true,
      type: "input",
      val: dcrmnt,
      setVal: (e, idx) => setValue(e, idx, setDcrmnt),
    },
    {
      id: "taxValue",
      label: "مالیات",
      cellWidth: "5%",
      isNumber: true,
      isCurrency: true,
      disableSorting: true,
    },
    {
      id: "total",
      label: "جمع",
      cellWidth: "5%",
      isNumber: true,
      isCurrency: true,
      disableSorting: true,
    },
    {
      id: "dtlDsc",
      label: "شرح",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      type: "input",
      val: dsc,
      setVal: (e, idx) => setValue(e, idx, setDsc, "text"),
    },
    {
      id: "icons",
      label: "",
      cellWidth: "3%",
    },
  ];

  const regex = /^[0-9\u06F0-\u06F9]*$/;

  /*const setValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    setVal: React.Dispatch<React.SetStateAction<string[]>>,
    fieldType: string = "number"
  ) => {
    //Regular expression to allow only numbers
    const value = convertToFarsiDigits(e.target.value);
    if ((regex.test(value) && fieldType === "number") || fieldType === "text") {
      setVal((prev) => {
        const newArr = [...prev];
        newArr[idx] = value;
        return newArr;
      });
    }
  };*/

  const debouncedSetVal = useMemo(
    () =>
      debounce((valSetter, idx, value) => {
        valSetter((prev: string[]) => {
          const newArr = [...prev];
          newArr[idx] = value;
          return newArr;
        });
      }, 100),
    []
  );

  const setValue = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      idx: number,
      setVal: React.Dispatch<React.SetStateAction<string[]>>,
      fieldType: string = "number"
    ) => {
      const value = convertToFarsiDigits(e.target.value);
      //const value = e.target.value;
      console.log(e.target.value, "started");
      if (
        (regex.test(value) && fieldType === "number") ||
        fieldType === "text"
      ) {
        debouncedSetVal(setVal, idx, value);
      }
      console.log(e.target.value, "completed");
    },
    []
  );

  const setValueInitial = (
    data: IndentDtlTable[],
    setVal: React.Dispatch<React.SetStateAction<string[]>>,
    fieldName: string
  ) => {
    setVal((prev) => {
      const newArr = [...prev];
      data.map((item, idx) => {
        newArr[idx] = convertToFarsiDigits(
          item[fieldName as keyof IndentDtlTable] as string
        );
      });
      return newArr;
    });
  };

  const [filteredData, setFilteredData] = useState<IndentDtl[]>(
    indentMrsResponse.indentDtls
  );

  useEffect(() => {
    console.log("hello2");
    console.log(indentMrsResponse.indentDtls);
    setFilteredData(
      indentMrsResponse.indentDtls.filter(
        (d) =>
          d.bName.includes(brandSearch) &&
          d.product.includes(productSearch) &&
          d.dtlDsc.includes(dtlDscSearch)
      )
    );
  }, [brandSearch, productSearch, dtlDscSearch, indentMrsResponse]);

  const toFarsiDigits = (str: string) => str.replace(/\d/g, (d:string) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
  //fill data
  const data: IndentDtlTable[] = filteredData.map((dtl,i) => {
    return {
      ...dtl,
      productAutoComplete: (
        <AutoComplete
          options={products.map((p) => ({
            id: p.pId,
            title: toFarsiDigits(p.n),
          }))}
          value={product[i] ?? { id: dtl.pId, title: toFarsiDigits(dtl.product) }}
          handleChange={(_event, newValue) => {
            return setProduct((prev: Def[]) => {
              const newArr = [...prev];
              newArr[i] = { id: newValue?.id ?? 0, title: newValue?.title ?? "" };
              return newArr;
            });
          }}
          setSearch={setSearch}
          showLabel={false}
          inputPadding="0 !important"
          outlinedInputPadding="5px"
          placeholder="کالا را انتخاب کنید..."
          showBorder={false}
          showBold={false}
          desktopfontsize="0.7rem"
          showClearIcon={false}
        />
      ),
      icons: (
        <div className="flex w-full">
          <img src={TrashIcon} />
          <img src={HistoryIcon} />
        </div>
      ),
    };
  });

  const handleRowClick = (
    item: IndentDtlTable,
    setSelectedRowId: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    setSelectedRowId(Number(item["id"]));
  };

  useEffect(() => {
    console.log("hello");
    setValueInitial(data, setCnt, "cnt");
    setValueInitial(data, setOffer, "offer");
    setValueInitial(data, setCost, "cost");
    setValueInitial(data, setDcrmnt, "dcrmnt");
    setValueInitial(data, setDsc, "dtlDsc");
  }, [filteredData]);

  const theme = useTheme();

  return (
    <>
      <Paper className="p-2 mt-2 w-full">
        <div
          className="w-full h-8 flex justify-center md:justify-end items-center text-gray-500"
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            border: "1px solid lightgray",
          }}
        >
          <div
            className="md:w-[2%] md:h-full border"
            style={{ backgroundColor: theme.palette.grey[300] }}
          ></div>
          <input
            name="brandSearch"
            value={convertToFarsiDigits(brandSearch)}
            onChange={(e) => {
              setBrandSearch(convertToLatinDigits(e.target.value));
            }}
            className={`border p-1 text-sm w-1/4 md:w-[5%]`}
          />
          <input
            name="productSearch"
            value={convertToFarsiDigits(productSearch)}
            onChange={(e) => {
              setProductSearch(convertToLatinDigits(e.target.value));
            }}
            className={`border p-1 text-sm w-1/4 md:w-[25%]`}
          />
          <div
            className="md:w-[10%] md:h-full border place-content-center text-center"
            style={{ backgroundColor: theme.palette.grey[300] }}
          >
            شرکت
          </div>
          <div
            className="md:w-[10%] md:h-full border place-content-center text-center"
            style={{ backgroundColor: theme.palette.grey[300] }}
          >
            فروشگاه
          </div>
          <div
            className="md:w-[5%] md:h-full border place-content-center text-center"
            style={{ backgroundColor: theme.palette.grey[300] }}
          >
            آخرین
          </div>
          <div
            className="md:w-[5%] md:h-full border"
            style={{ backgroundColor: theme.palette.grey[300] }}
          ></div>
          <div
            className="md:w-[5%] md:h-full border"
            style={{ backgroundColor: theme.palette.grey[300] }}
          ></div>
          <div
            className="md:w-[5%] md:h-full border"
            style={{ backgroundColor: theme.palette.grey[300] }}
          ></div>
          <div
            className="md:w-[5%] md:h-full border"
            style={{ backgroundColor: theme.palette.grey[300] }}
          ></div>
          <div
            className="md:w-[5%] md:h-full border"
            style={{ backgroundColor: theme.palette.grey[300] }}
          ></div>
          <div
            className="md:w-[5%] md:h-full border"
            style={{ backgroundColor: theme.palette.grey[300] }}
          ></div>
          <input
            name="dtlDscSearch"
            value={convertToFarsiDigits(dtlDscSearch)}
            onChange={(e) => {
              setDtlDscSearch(convertToLatinDigits(e.target.value));
            }}
            className={`border p-1 text-sm w-1/4 md:w-[10%]`}
          />
          <div
            className="md:w-[3%] md:h-full border"
            style={{ backgroundColor: theme.palette.grey[300] }}
          ></div>
        </div>

        {isLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : indentMrsResponse.err !== 0 ? (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            {indentMrsResponse.msg}
          </p>
        ) : (
          <div className="w-full">
            <Table
              data={data}
              headCells={headCells}
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

export default InvoiceReceiptShowTable;
