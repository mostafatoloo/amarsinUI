import Skeleton from "../layout/Skeleton";
import {
  IndentDtl,
  IndentDtlTable,
  IndentMrsResponse,
} from "../../types/invoiceReceipt";
import TrashIcon from "../../assets/images/GrayThem/delete_gray_16.png";
import HistoryIcon from "../../assets/images/GrayThem/history_gray_16.png";
import RestoreIcon from "../../assets/images/GrayThem/restore_gray_16.png";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  convertPersianDate,
  convertToFarsiDigits,
  convertToLatinDigits,
  currencyStringToNumber,
  formatNumberWithCommas,
} from "../../utilities/general";
import { useProductStore } from "../../store/productStore";
import { useGeneralContext } from "../../context/GeneralContext";
import TTable, { EditableInput } from "../controls/TTable";
import { DefaultOptionType, TableColumns } from "../../types/general";
import {
  Detail,
  IndentSaveRequest,
  IndentSaveResponse,
  IndentShowProductListResponse,
  Product,
  ProductSearchRequest,
} from "../../types/product";
import { grey, red } from "@mui/material/colors";
import ConfirmCard from "../layout/ConfirmCard";
import Button from "../controls/Button";
import { Fields } from "./InvoiceReceiptShow";
import ModalForm from "../layout/ModalForm";
import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";
import { debounce } from "lodash";

type Props = {
  addList: IndentDtl[];
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
  mrsId: number;
  fields: Fields;
  newRow: IndentDtlTable;
  products: Product[];
  saveList: (request: IndentSaveRequest) => Promise<IndentSaveResponse>;
  isLoadingSaveList: boolean;
  isDtHistoryLoading: boolean;
};

//type Def = { id: number; title: string };

export const headCells = [
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
    type: "inputText",
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
            onClick={() => console.log("hello")}
            className="cursor-pointer"
            alt="TrashIcon"
          />
          <img
            src={HistoryIcon}
            onClick={() => console.log("hello")}
            className="cursor-pointer"
            alt="HistoryIcon"
          />
        </div>
      );
    },
  },
];

const InvoiceReceiptShowTable = ({
  addList,
  indentMrsResponse,
  isLoading,
  handleSubmit,
  handleAddRow,
  showDeleted,
  mrsId,
  fields,
  newRow,
  products,
  saveList,
  isLoadingSaveList,
  isDtHistoryLoading,
}: Props) => {
  const [search, setSearch] = useState<string>("");
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [dtlDscSearch, setDtlDscSearch] = useState<string>("");
  const [productSearch, setProductSearch] = useState<string>("");
  //const { products, saveList, isLoadingSaveList } = useProducts();
  const { systemId, yearId } = useGeneralContext();
  const { setField: setProductField, indentDtlHistoryResponse } =
    useProductStore();
  //send params to /api/Product/search?accSystem=4&accYear=15&page=1&searchTerm=%D8%B3%D9%81
  useEffect(() => {
    setProductField("accSystem", systemId);
    setProductField("accYear", yearId);
    //setProductField("searchTerm", convertToFarsiDigits(search));
    handleDebounceFilterChange("searchTerm", convertToFarsiDigits(search));
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
        type: "inputText",
        Cell: EditableInput,
      },
      {
        Header: " ",
        accessor: "icons",
        width: "3%",

        Cell: ({ row }) => {
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
                onClick={() => handleShowHistory(row)}
                className="cursor-pointer"
                alt="HistoryIcon"
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const columnsHistory: TableColumns = [
    {
      Header: "ردیف",
      accessor: "index",
      width: "5%",
    },
    {
      Header: "شماره",
      accessor: "id",
      width: "5%",
    },
    {
      Header: "تاریخ",
      accessor: "dat",
      width: "10%",
    },
    {
      Header: "تعداد",
      accessor: "cnt",
      width: "5%",
    },
    {
      Header: "آفر",
      accessor: "offer",
      width: "5%",
    },
    {
      Header: "مالیات",
      accessor: "taxValue",
      width: "10%",
    },
    {
      Header: "تخفیف",
      accessor: "dcrmnt",
      width: "10%",
    },
    {
      Header: "مجموع",
      accessor: "total",
      width: "10%",
    },
    {
      Header: "شرح",
      accessor: "dtlDsc",
      width: "20%",
    },
    {
      Header: "مرحله",
      accessor: "fmName",
      width: "15%",
    },
    {
      Header: "هامش",
      accessor: "fDsc",
      width: "5%",
    },
  ];

  const handleShowHistory = (row: any) => {
    if (row.original.pId !== 0) {
      setProductField("pId", row.original.pId);
      setProductField("mrsId", mrsId);
      setShowHistory(true);
    }
  };
  const updateToDeleted = (row: any) => {
    setOriginalData((old) =>
      old.map((origRow) => {
        if (
          origRow.id === row.original.id &&
          origRow.pId === row.original.pId
        ) {
          return { ...origRow, isDeleted: !origRow.isDeleted };
        }
        return origRow;
      })
    );
  };

  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [originalData, setOriginalData] = useState<IndentDtlTable[]>([]);
  const [deletedData, setDeletedData] = useState<IndentDtlTable[]>([]);
  const [data, setData] = useState<IndentDtlTable[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  ///////////////////////////////////////////////////////
  const handleDebounceFilterChange = useCallback(
    debounce((field: string, value: string | number) => {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();

      setProductField(field as keyof ProductSearchRequest, value);
    }, 500),
    [setProductField]
  );
  //////////////////////////////////////////////////////////
  useEffect(() => {
    console.log(skipPageReset);
  }, []);

  ///////////////////////////////////////////////////////
  // Initialize data when indentMrsResponse changes
  useEffect(() => {
    if (indentMrsResponse.indentDtls) {
      let i = 1;
      let initialData = indentMrsResponse.indentDtls.map((dtl) => ({
        ...dtl,
        index: i++,
        isDeleted: false,
      }));
      initialData.push({ ...newRow, index: initialData.length + 1 });
      setOriginalData(initialData);
      setData(initialData);
    }
  }, [indentMrsResponse]);
  ////////////////////////////////////////////////////////
  // Filter data based on search terms
  useEffect(() => {
    if (originalData.length > 0) {
      const filtered = originalData
        .filter(
          (dtl) =>
            dtl.bName.includes(brandSearch) &&
            dtl.product.includes(productSearch) &&
            dtl.dtlDsc.includes(dtlDscSearch)
        )
        .map((row, idx) => ({ ...row, index: idx + 1 }));

      setData(filtered);
    }
    //console.log(originalData)
  }, [brandSearch, productSearch, dtlDscSearch, originalData]);
  //////////////////////////////////////////////////////
  useEffect(() => {
    setOriginalData((old) => [
      ...old,
      ...addList.map((item, idx) => ({
        ...item,
        index: old.length + idx + 1,
        isDeleted: false,
      })),
    ]);
  }, [addList]);
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (!showDeleted) {
      // Show only records where isDeleted is false
      setDeletedData(originalData.filter((row) => row.isDeleted === true)); //save deleted rows in deletedData
      setOriginalData((old) => old.filter((row) => row.isDeleted === false)); //save undeleted rows in Data
    } else {
      // Show all records
      setOriginalData((old) =>
        [...old, ...deletedData].sort((a, b) => a.index - b.index)
      ); //  full dataset
      setDeletedData([]);
    }
  }, [!showDeleted]);
  ///////////////////////////////////////////////////////
  const updateMyRow = async (rowIndex: number, value: DefaultOptionType) => {
    const productId = value?.id ?? 0;
    if (productId === 0) return;
    const response = await handleSubmit(undefined, productId);
    setOriginalData((old) =>
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
    if (rowIndex === originalData.length - 1)
      handleAddRow(rowIndex + 2, setOriginalData);
  };
  /////////////////////////////////////////////////////
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
    // Also update the same row in originalData
    const rowInOriginal = data[rowIndex];
    if (rowInOriginal) {
      setOriginalData((origOld) =>
        origOld.map((row) => {
          if (row.id === rowInOriginal.id && row.pId === rowInOriginal.pId) {
            return {
              ...row,
              [columnId]: value,
              //row.cost*row.cnt + row.taxValue - row.dcrmnt
              /*total:
                currencyStringToNumber(
                  convertToLatinDigits(row.cost.toString())
                ) *
                  Number(convertToLatinDigits(row.cnt.toString())) +
                currencyStringToNumber(
                  convertToLatinDigits(row.taxValue.toString())
                ) -
                currencyStringToNumber(
                  convertToLatinDigits(row.dcrmnt.toString())
                ),*/
            };
          }
          return row;
        })
      );
    }
  };
  /////////////////////////////////////////////////////
  const changeRowValues = (
    value: string,
    rowIndex: number,
    columnId: string
  ) => {
    if (
      columnId === "cost" ||
      columnId === "cnt" ||
      columnId === "taxValue" ||
      columnId === "dcrmnt"
    ) {
      setOriginalData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
              total:
                currencyStringToNumber(
                  convertToLatinDigits(
                    columnId === "cost"
                      ? value === ""
                        ? "0"
                        : value
                      : row.cost.toString()
                  )
                ) *
                  Number(
                    convertToLatinDigits(
                      columnId === "cnt"
                        ? value === ""
                          ? "0"
                          : value
                        : row.cnt.toString()
                    )
                  ) +
                currencyStringToNumber(
                  convertToLatinDigits(
                    columnId === "taxValue"
                      ? value === ""
                        ? "0"
                        : value
                      : row.taxValue.toString()
                  )
                ) -
                currencyStringToNumber(
                  convertToLatinDigits(
                    columnId === "dcrmnt"
                      ? value === ""
                        ? "0"
                        : value
                      : row.dcrmnt.toString()
                  )
                ),
            };
          }
          return row;
        })
      );
    }
  };
  /////////////////////////////////////////////////////
  // Custom cell click handler for Table
  const handleCellColorChange = (row: any) => {
    if (row.original.isDeleted) {
      return red[100];
    }
    return grey[50];
  };
  ////////////////////////////////////////////////////////
  const handleSubmitSave = async (
    e?: React.MouseEvent<HTMLButtonElement>
  ): Promise<IndentSaveResponse | undefined> => {
    if (e) e.preventDefault();
    let request: IndentSaveRequest;
    const dtls: Detail[] = originalData.map((item) => {
      const dtl: Detail = {
        id: item.id,
        cId: item.custId,
        pId: item.pId,
        cnt: convertToLatinDigits(item.cnt.toString()),
        offer: convertToLatinDigits(item.offer.toString()),
        cost: convertToLatinDigits(item.cost.toString()),
        dcrmntPrcnt: item.dcrmntPrcnt.toString(),
        dcrmnt: convertToLatinDigits(item.dcrmnt.toString()),
        taxValue: item.taxValue.toString(),
        dtlDsc: item.dtlDsc,
        deleted: item.isDeleted,
      };
      return dtl;
    });

    request = {
      id: indentMrsResponse.indents[0]?.id,
      ordrId: indentMrsResponse.indents[0]?.ordrId ?? "",
      mrsId,
      customerId: Number(fields.customer?.id) ?? 0,
      del: showDeleted,
      acc_System: systemId,
      acc_Year: yearId,
      payDuration: indentMrsResponse.indents[0]?.payDuration ?? 0,
      dat: indentMrsResponse.indents[0]?.dat ?? "",
      tim: indentMrsResponse.indents[0]?.tim ?? "",
      dsc: indentMrsResponse.indents[0]?.dsc ?? "",
      salesPriceId: Number(fields.price?.id ?? 0),
      saleFDate:
        fields.fdate === null || !fields.fdate
          ? ""
          : convertPersianDate(fields.fdate.toLocaleDateString("fa-IR")),
      saleTDate:
        fields.tdate === null || !fields.tdate
          ? ""
          : convertPersianDate(fields.tdate.toLocaleDateString("fa-IR")),
      dtls,
    };
    console.log(request);
    try {
      return await saveList(request);
    } catch (error) {
      console.error("Error ثبت :", error);
    }
  };
  const { height, width } = useCalculateTableHeight();
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
              wordWrap={false}
              options={products.map((p) => ({
                id: p.pId,
                title: convertToFarsiDigits(p.n),
              }))}
              setSearchText={setSearch}
              updateMyRow={updateMyRow}
              CellColorChange={handleCellColorChange}
              changeRowValues={changeRowValues}
            />
          </div>
        )}
        <ConfirmCard variant="flex-row gap-2 rounded-bl-md rounded-br-md justify-end ">
          <div className="flex justify-evenly items-center text-gray-500 text-sm w-full">
            <p>
              تعداد:{" "}
              {convertToFarsiDigits(
                data.reduce(
                  (acc, row) =>
                    acc + Number(convertToLatinDigits(row.cnt.toString())),
                  0
                )
              )}
            </p>
            <p>
              آفر:{" "}
              {convertToFarsiDigits(
                data.reduce(
                  (acc, row) =>
                    acc + Number(convertToLatinDigits(row.offer.toString())),
                  0
                )
              )}
            </p>
            <p>
              مالیات:{" "}
              {convertToFarsiDigits(
                formatNumberWithCommas(
                  data.reduce((acc, row) => acc + row.taxValue, 0)
                )
              )}
            </p>
            <p>
              تخفیف:{" "}
              {convertToFarsiDigits(
                formatNumberWithCommas(
                  data.reduce(
                    (acc, row) =>
                      acc + Number(convertToLatinDigits(row.dcrmnt.toString())),
                    0
                  )
                )
              )}
            </p>
            <p>
              جمع:{" "}
              {convertToFarsiDigits(
                formatNumberWithCommas(
                  data.reduce((acc, row) => acc + row.total, 0)
                )
              )}
            </p>
          </div>
          <Button
            text={isLoadingSaveList ? "در حال ثبت اطلاعات..." : "ثبت"}
            backgroundColor="bg-green-500"
            color="text-white"
            backgroundColorHover="bg-green-600"
            colorHover="text-white"
            variant="shadow-lg w-64"
            onClick={handleSubmitSave}
          />
        </ConfirmCard>
      </div>
      <ModalForm
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        title="سوابق درخواست خرید"
        width="2/3"
      >
        {isDtHistoryLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : (
          <div
            className="mt-2 overflow-y-auto"
            style={width > 640 ? { height: height } : { height: "fit" }}
          >
            <TTable
              columns={columnsHistory}
              data={indentDtlHistoryResponse.data.result.indentDtlHistories.map(
                (item, index) => ({
                  ...item,
                  index: convertToFarsiDigits(index + 1),
                  id: convertToFarsiDigits(item.id),
                  dat: convertToFarsiDigits(item.dat),
                  cnt: convertToFarsiDigits(formatNumberWithCommas(item.cnt)),
                  offer: convertToFarsiDigits(item.offer),
                  taxValue: convertToFarsiDigits(
                    formatNumberWithCommas(item.taxValue)
                  ),
                  dcrmnt: convertToFarsiDigits(
                    formatNumberWithCommas(item.dcrmnt)
                  ),
                  total: convertToFarsiDigits(
                    formatNumberWithCommas(item.total)
                  ),
                  dtlDsc: convertToFarsiDigits(item.dtlDsc),
                  fmName: convertToFarsiDigits(item.fmName),
                  fDsc: convertToFarsiDigits(item.fDsc),
                })
              )}
            />
          </div>
        )}
      </ModalForm>
    </>
  );
};

export default InvoiceReceiptShowTable;
