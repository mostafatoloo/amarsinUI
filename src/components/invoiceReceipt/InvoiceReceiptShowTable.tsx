import Skeleton from "../layout/Skeleton";
import {
  IndentDtl,
  IndentDtlTable,
  IndentMrsResponse,
} from "../../types/invoiceReceipt";
import TrashIcon from "../../assets/images/GrayThem/delete_gray_16.png";
import HistoryIcon from "../../assets/images/GrayThem/history_gray_16.png";
import RestoreIcon from "../../assets/images/GrayThem/restore_gray_16.png";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  convertPersianDate,
  convertToFarsiDigits,
  convertToLatinDigits,
  convertToPersianDate,
  formatNumberWithCommas,
} from "../../utilities/general";
import { useProducts } from "../../hooks/useProducts";
import { useProductStore } from "../../store/productStore";
import { useGeneralContext } from "../../context/GeneralContext";
import TTable, { EditableInput } from "../controls/TTable";
import { DefaultOptionType, TableColumns } from "../../types/general";
import { IndentShowProductListResponse } from "../../types/product";
import { colors } from "../../utilities/color";
import { grey, red } from "@mui/material/colors";

type Props = {
  addList: IndentDtlTable[];
  indentMrsResponse: IndentMrsResponse;
  isLoading: boolean;
  handleSubmit: (
    e?: React.MouseEvent<HTMLButtonElement>,
    productId?: number
  ) => Promise<IndentShowProductListResponse | undefined>;
  handleAddRow: (
    index: number,
    setData: Dispatch<SetStateAction<IndentDtlTable[]>>
  ) => void;
  showDeleted: boolean;
};

//type Def = { id: number; title: string };

export const headCells=[
  {
    Header: "ردیف",
    accessor: "index",
    width: "2%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "برند",
    accessor: "bName",
    width: "5%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "کالا",
    accessor: "product",
    width: "25%",
    type: "autoComplete",
    placeholder: "کالا را انتخاب کنید...",
    Cell: EditableInput,
  },
  {
    Header: "موجودی",
    accessor: "companyStock",
    width: "5%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "فروش",
    accessor: "storeStock",
    width: "5%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "موجودی",
    accessor: "sumCompanyCnt",
    width: "5%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "فروش",
    accessor: "sumStoreCnt",
    width: "5%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "خرید",
    accessor: "lbDate",
    width: "5%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "تعداد",
    accessor: "cnt",
    width: "5%",
    type: "inputText",
    Cell: EditableInput,
  },
  {
    Header: "آفر",
    accessor: "offer",
    width: "5%",
    type: "inputText",
    Cell: EditableInput,
  },
  {
    Header: "مبلغ",
    accessor: "cost",
    width: "5%",
    type: "inputText",
    isCurrency: true,
    Cell: EditableInput,
  },
  {
    Header: "تخفیف",
    accessor: "dcrmnt",
    width: "5%",
    type: "inputText",
    isCurrency: true,
    Cell: EditableInput,
  },
  {
    Header: "مالیات",
    accessor: "taxValue",
    width: "5%",
    Cell: ({ value }: any) =>
      convertToFarsiDigits(formatNumberWithCommas(value)),
  },
  {
    Header: "جمع",
    accessor: "total",
    width: "5%",
    Cell: ({ value }: any) =>
      convertToFarsiDigits(formatNumberWithCommas(value)),
  },
  {
    Header: "شرح",
    accessor: "dtlDsc",
    width: "10%",
    type: "textArea",
    Cell: EditableInput,
  },
  {
    Header: " ",
    accessor: "icons",
    width: "3%",

    Cell: () => {
      return (
        <div className="flex w-full">
          <img
            src={TrashIcon}
            onClick={() => console.log('hello')}
            className="cursor-pointer"
            alt="TrashIcon"
          />
          <img
            src={HistoryIcon}
            onClick={() => console.log('hello')}
            className="cursor-pointer"
            alt="HistoryIcon"
          />
        </div>
      );
    },
  }
]

const InvoiceReceiptShowTable = ({
  addList,
  indentMrsResponse,
  isLoading,
  handleSubmit,
  handleAddRow,
  showDeleted,
}: Props) => {
  const [search, setSearch] = useState<string>("");
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [dtlDscSearch, setDtlDscSearch] = useState<string>("");
  const [productSearch, setProductSearch] = useState<string>("");
  const { products } = useProducts();
  const { systemId, yearId } = useGeneralContext();
  const { setField: setProductField } = useProductStore();

  useEffect(() => {
    setProductField("accSystem", systemId);
    setProductField("accYear", yearId);
    setProductField("searchTerm", convertToFarsiDigits(search));
    setProductField("page", 1);
  }, [search, systemId, yearId]);

  const columns: TableColumns = React.useMemo(
    () => [
      {
        Header: "ردیف",
        accessor: "index",
        width: "2%",
        Cell: ({ value }: any) => convertToFarsiDigits(value),
      },
      {
        Header: "برند",
        accessor: "bName",
        width: "5%",
        Cell: ({ value }: any) => convertToFarsiDigits(value),
      },
      {
        Header: "کالا",
        accessor: "product",
        width: "25%",
        type: "autoComplete",
        placeholder: "کالا را انتخاب کنید...",
        Cell: EditableInput,
      },
      {
        Header: "موجودی",
        accessor: "companyStock",
        width: "5%",
        Cell: ({ value }: any) => convertToFarsiDigits(value),
      },
      {
        Header: "فروش",
        accessor: "storeStock",
        width: "5%",
        Cell: ({ value }: any) => convertToFarsiDigits(value),
      },
      {
        Header: "موجودی",
        accessor: "sumCompanyCnt",
        width: "5%",
        Cell: ({ value }: any) => convertToFarsiDigits(value),
      },
      {
        Header: "فروش",
        accessor: "sumStoreCnt",
        width: "5%",
        Cell: ({ value }: any) => convertToFarsiDigits(value),
      },
      {
        Header: "خرید",
        accessor: "lbDate",
        width: "5%",
        Cell: ({ value }: any) => convertToFarsiDigits(value),
      },
      {
        Header: "تعداد",
        accessor: "cnt",
        width: "5%",
        type: "inputText",
        Cell: EditableInput,
      },
      {
        Header: "آفر",
        accessor: "offer",
        width: "5%",
        type: "inputText",
        Cell: EditableInput,
      },
      {
        Header: "مبلغ",
        accessor: "cost",
        width: "5%",
        type: "inputText",
        isCurrency: true,
        Cell: EditableInput,
      },
      {
        Header: "تخفیف",
        accessor: "dcrmnt",
        width: "5%",
        type: "inputText",
        isCurrency: true,
        Cell: EditableInput,
      },
      {
        Header: "مالیات",
        accessor: "taxValue",
        width: "5%",
        Cell: ({ value }: any) =>
          convertToFarsiDigits(formatNumberWithCommas(value)),
      },
      {
        Header: "جمع",
        accessor: "total",
        width: "5%",
        Cell: ({ value }: any) =>
          convertToFarsiDigits(formatNumberWithCommas(value)),
      },
      {
        Header: "شرح",
        accessor: "dtlDsc",
        width: "10%",
        type: "textArea",
        Cell: EditableInput,
      },
      {
        Header: " ",
        accessor: "icons",
        width: "3%",

        Cell: ({ row }) => {
          console.log("Row object:", row.original.isDeleted);
          return (
            <div className="flex w-full">
              <img
                src={row.original.isDeleted ? RestoreIcon : TrashIcon}
                onClick={() => updateToDeleted(row)}
                className="cursor-pointer"
                alt="TrashIcon"
              />
              <img
                src={HistoryIcon}
                onClick={() => console.log(row)}
                className="cursor-pointer"
                alt="HistoryIcon"
              />
            </div>
          );
        },
        /* Cell: ({ row }: any) => (
          <div className="flex w-full">
            <img
              src={TrashIcon}
              onClick={updateToDeleted}
              className="cursor-pointer"
              alt="TrashIcon"
            />
            <img
              src={HistoryIcon}
              onClick={() => console.log(row)}
              className="cursor-pointer"
              alt="HistoryIcon"
            />
          </div>
        ),*/
      },
    ],
    []
  );

  const updateToDeleted = (row: any) => {
    // console.log("Received row:", row);
    const { index } = row;
    //console.log("Index:", index);
    //console.log("Original data:", original);
    setData((old) =>
      old.map((row, rowIndex) => {
        if (rowIndex === index) {
          return { ...row, isDeleted: !row.isDeleted };
        }
        return row;
      })
    );
  };
  //const regex = /^[0-9\u06F0-\u06F9]*$/;

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

  /* const debouncedSetVal = useMemo(
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

  const toFarsiDigits = (str: string) =>
    str.replace(/\d/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  //fill data
  const handleRowClick = (
    item: IndentDtlTable,
    setSelectedRowId: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    setSelectedRowId(Number(item["id"]));
  };*/

  /*useEffect(() => {
    setValueInitial(data, setCnt, "cnt");
    setValueInitial(data, setOffer, "offer");
    setValueInitial(data, setCost, "cost");
    setValueInitial(data, setDcrmnt, "dcrmnt");
    setValueInitial(data, setDsc, "dtlDsc");
  }, [filteredData]);*/

  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [filteredData, setFilteredData] = useState<IndentDtl[]>(
    indentMrsResponse.indentDtls
  );

  useEffect(() => {
    console.log(skipPageReset);
    setFilteredData(
      indentMrsResponse.indentDtls.filter(
        (d) =>
          d.bName.includes(brandSearch) &&
          d.product.includes(productSearch) &&
          d.dtlDsc.includes(dtlDscSearch)
      )
    );
  }, [brandSearch, productSearch, dtlDscSearch, indentMrsResponse]);

  const [data, setData] = useState<IndentDtlTable[]>([]);

  const updateMyRow = async (rowIndex: number, value: DefaultOptionType) => {
    const productId = value?.id ?? 0;
    if (productId === 0) return;
    const response = await handleSubmit(undefined, productId);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex && response) {
          return {
            ...old[rowIndex],
            index: rowIndex + 1,
            id: response.indentProducts[0].id,
            custId: 0,
            ordr: 0,
            customer: "",
            pId: response.indentProducts[0].pId,
            bName: response.indentProducts[0].bName,
            productCode: "",
            product: response.indentProducts[0].product,
            sumCompanyCnt: response.indentProducts[0].sumCompanyCnt ?? 0,
            sumStoreCnt: response.indentProducts[0].sumStoreCnt ?? 0,
            lbDate: response.indentProducts[0].lbDate ?? "",
            companyStock: response.indentProducts[0].companyStock ?? 0,
            storeStock: response.indentProducts[0].storeStock ?? 0,
            productExp: "",
            cnt: response.indentProducts[0].cnt ?? 0,
            offer: response.indentProducts[0].offer ?? 0,
            cost: response.indentProducts[0].cost ?? 0,
            dcrmntPrcnt: 0,
            dcrmnt: 0,
            taxValue: response.indentProducts[0].taxValue ?? 0,
            total: response.indentProducts[0].total ?? 0,
            dtlDsc: response.indentProducts[0].dtlDsc,
            del: false,
            recieptId: 0,
            recieptDsc: "",
            isDeleted: false,
          };
        }
        return row;
      })
    );
    if (rowIndex === data.length - 1) handleAddRow(rowIndex + 2, setData);
  };

  const updateMyData = (rowIndex: number, columnId: string, value: string) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    let i = 1;
    if (filteredData) {
      setData(
        filteredData.map((dtl) => {
          return {
            ...dtl,
            index: i++,
            isDeleted: false,
          };
        })
      );
    }
    //console.log(new Date().toISOString().split('T')[0])
    handleAddRow(i, setData);
  }, [filteredData]);

  useEffect(() => {
    setData((old) => [...old, ...addList]);
  }, [addList]);

  const [deletedData, setDeletedData] = useState<IndentDtlTable[]>([]);

  useEffect(() => {
    if (!showDeleted) {
      // Show only records where isDeleted is false
      setDeletedData(data.filter((row) => row.isDeleted === true)); //save deleted rows in deletedData
      setData((old) => old.filter((row) => row.isDeleted === false));//save undeleted rows in Data
    } else {
      // Show all records
      setData((old) => [...old, ...deletedData].sort((a, b) => a.index - b.index)); //  full dataset
      setDeletedData([]);
    }
  }, [!showDeleted]);

  // Custom cell click handler for Table
  const handleCellColorChange = (row: any) => {
    if (row.original.isDeleted) {
      return red[100];
    }
    return grey[50];
  };

  return (
    <>
      <div className="p-2 mt-2 w-full bg-white rounded-md">
        <div
          className="w-full h-8 flex justify-center md:justify-end items-center text-gray-500"
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            border: "1px solid lightgray",
          }}
        >
          <div className="md:w-[2%] md:h-full border border-x-gray-300 bg-gray-200"></div>
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
          <div className="md:w-[10%] md:h-full border place-content-center text-center border-x-gray-300 bg-gray-200">
            شرکت
          </div>
          <div className="md:w-[10%] md:h-full border place-content-center text-center border-x-gray-300 bg-gray-200">
            فروشگاه
          </div>
          <div className="md:w-[5%] md:h-full border place-content-center text-center border-x-gray-300 bg-gray-200">
            آخرین
          </div>
          <div className="md:w-[5%] md:h-full border border-x-gray-300 bg-gray-200"></div>
          <div className="md:w-[5%] md:h-full border border-x-gray-300 bg-gray-200"></div>
          <div className="md:w-[5%] md:h-full border border-x-gray-300 bg-gray-200"></div>
          <div className="md:w-[5%] md:h-full border border-x-gray-300 bg-gray-200"></div>
          <div className="md:w-[5%] md:h-full border border-x-gray-300 bg-gray-200"></div>
          <div className="md:w-[5%] md:h-full border border-x-gray-300 bg-gray-200"></div>
          <input
            name="dtlDscSearch"
            value={convertToFarsiDigits(dtlDscSearch)}
            onChange={(e) => {
              setDtlDscSearch(convertToLatinDigits(e.target.value));
            }}
            className={`border p-1 text-sm w-1/4 md:w-[10%]`}
          />
          <div className="md:w-[3%] md:h-full border border-x-gray-300 bg-gray-200"></div>
        </div>

        {isLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : indentMrsResponse.err !== 0 ? (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            {indentMrsResponse.msg}
          </p>
        ) : (
          <div className="w-full">
            <TTable
              columns={columns}
              data={data}
              updateMyData={updateMyData}
              //skipPageReset={skipPageReset}
              fontSize="0.75rem"
              changeRowSelectColor={true}
              wordWrap={true}
              options={products.map((p) => ({
                id: p.pId,
                title: convertToFarsiDigits(p.n),
              }))}
              setSearchText={setSearch}
              updateMyRow={updateMyRow}
              CellColorChange={handleCellColorChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceReceiptShowTable;
