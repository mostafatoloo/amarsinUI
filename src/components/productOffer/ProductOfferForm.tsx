import TrashIcon from "../../assets/images/GrayThem/delete_gray_16.png";
import HistoryIcon from "../../assets/images/GrayThem/history_gray_16.png";
import RestoreIcon from "../../assets/images/GrayThem/restore_gray_16.png";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ProductOfferFormParams from "./ProductOfferFormParams";
import { DefaultOptionTypeStringId, TableColumns } from "../../types/general";
import ConfirmCard from "../layout/ConfirmCard";
import Button from "../controls/Button";
import { handleExport } from "../../utilities/ExcelExport";
import {
  Dtl,
  ProductOffer,
  ProductOfferDtl,
  ProductOfferDtlHistory,
  ProductOfferProductTable,
  ProductOfferProductTable2,
  ProductOfferSaveRequest,
  ProductOfferSaveResponse,
  ShowProductListRequest,
  ShowProductListResponse,
} from "../../types/productOffer";
import { useGeneralContext } from "../../context/GeneralContext";
import ProductOfferFormList from "./ProductOfferFormList";
import {
  convertToFarsiDigits,
  convertToLatinDigits,
} from "../../utilities/general";
import { useProducts } from "../../hooks/useProducts";
import { useProductStore } from "../../store/productStore";
import { debounce } from "lodash";
import { ProductSearchRequest } from "../../types/product";
import { useBrandStore } from "../../store/brandStore";
import { EditableInput } from "../controls/TTable";
import { useProductOfferStore } from "../../store/productOfferStore";

type Props = {
  addProductList: (
    request: ShowProductListRequest
  ) => Promise<ShowProductListResponse>;
  productOfferDtlHistory: ProductOfferDtlHistory[];
  isLoadingProductOfferDtlHistory: boolean;
  productOfferSave: (
    request: ProductOfferSaveRequest
  ) => Promise<ProductOfferSaveResponse>;
  isLoadingProductOfferSave: boolean;
  selectedProductOffer: ProductOffer | null;
  productOfferDtls: ProductOfferDtl[] | undefined;
  isNew: boolean;
  setIsNew: (isNew: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  fromWorkFlow: boolean;
  canEditForm1: boolean;
};

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
    width: "10%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "کالا",
    accessor: "product",
    width: "33%",
    type: "autoComplete",
    placeholder: "کالا را انتخاب کنید...",
    Cell: EditableInput,
  },
  {
    Header: "تغییر",
    accessor: "lastDate",
    width: "5%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: convertToFarsiDigits("پ 1"),
    accessor: "s1O",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: convertToFarsiDigits("پ 2"),
    accessor: "s2O",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: convertToFarsiDigits("پ 3"),
    accessor: "s3O",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: convertToFarsiDigits("پ 4"),
    accessor: "s4O",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "پ",
    accessor: "s1N",
    width: "2%",
    type: "inputText",
    noLeftBorder: true,
    align: "left",
    Cell: EditableInput,
  },
  {
    Header: convertToFarsiDigits("1"),
    accessor: "s1D",
    width: "2%",
    type: "inputText",
    align: "right",
    Cell: EditableInput,
  },
  {
    Header: "پ",
    accessor: "s2N",
    width: "2%",
    type: "inputText",
    noLeftBorder: true,
    align: "left",
    Cell: EditableInput,
  },
  {
    Header: convertToFarsiDigits("2"),
    accessor: "s2D",
    width: "2%",
    type: "inputText",
    align: "right",
    Cell: EditableInput,
  },
  {
    Header: "پ",
    accessor: "s3N",
    width: "2%",
    type: "inputText",
    noLeftBorder: true,
    align: "left",
    Cell: EditableInput,
  },
  {
    Header: convertToFarsiDigits("3"),
    accessor: "s3D",
    width: "2%",
    type: "inputText",
    align: "right",
    Cell: EditableInput,
  },
  {
    Header: "پ",
    accessor: "s4N",
    width: "2%",
    type: "inputText",
    noLeftBorder: true,
    align: "left",
    Cell: EditableInput,
  },
  {
    Header: convertToFarsiDigits("4"),
    accessor: "s4D",
    width: "2%",
    type: "inputText",
    align: "right",
    Cell: EditableInput,
  },
  {
    Header: "آفر",
    accessor: "no",
    width: "2%",
    type: "checkbox",
    Cell: EditableInput,
  },
  {
    Header: "توضیح",
    accessor: "dtlDsc",
    width: "18%",
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
          {
            <img
              src={TrashIcon}
              onClick={() => console.log("hello")}
              className="cursor-pointer"
              alt="TrashIcon"
            />
          }
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

const ProductOfferForm = ({
  canEditForm1,
  addProductList,
  productOfferDtlHistory,
  isLoadingProductOfferDtlHistory,
  productOfferSave,
  isLoadingProductOfferSave,
  selectedProductOffer,
  productOfferDtls,
  isNew,
  setIsNew,
  setIsEdit,
  fromWorkFlow,
}: Props) => {
  const [addList, setAddList] = useState<ProductOfferProductTable[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showDeleted, setShowDeleted] = useState(true);
  const [brand, setBrand] = useState<DefaultOptionTypeStringId[] | null>([]);
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileName = "data_export.xlsx";
  const { products } = useProducts();
  const { setField: setProductField } = useProductStore();
  const { yearId, systemId, chartId } = useGeneralContext();
  const { setField: setBrandField } = useBrandStore();
  const { setField: setProductOfferDtlHistoryField } = useProductOfferStore();
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<ProductOfferProductTable2[]>(
    []
  );
  const [dat, setDat] = useState<string>("");
  const [tim, setTim] = useState<string>("");
  const [dsc, setDsc] = useState<string>("");
  const [isModalRegOpen, setIsModalRegOpen] = useState(false);

  const columns: TableColumns = useMemo(() => {
    return headCells.map((item) => {
      return {
        ...item,
        options:
          item.accessor === "product"
            ? products &&
              products.map((p) => ({
                id: p.pId,
                title: convertToFarsiDigits(p.n),
              }))
            : undefined,
        setSearch: item.accessor === "product" ? setSearch : undefined,
        Cell:
          item.accessor === "icons"
            ? ({ row }: any) => {
                return (
                  <div className="flex w-full">
                    {canEditForm1 && (
                      <img
                        src={row.original.isDeleted ? RestoreIcon : TrashIcon}
                        onClick={() => updateToDeleted(row)}
                        className="cursor-pointer"
                        alt="TrashIcon"
                      />
                    )}
                    <img
                      src={HistoryIcon}
                      onClick={() => handleShowHistory(row)}
                      className="cursor-pointer"
                      alt="HistoryIcon"
                    />
                  </div>
                );
              }
            : item.Cell,
      };
    });
  }, [products, setSearch]);

  ////////////////////////////////////////////////////////
  const handleShowHistory = (row: any) => {
    if (row.original.pId !== 0) {
      setProductOfferDtlHistoryField("pId", row.original.pId);
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
  ///////////////////////////////////////////////////////
  useEffect(() => {
    setBrandField("accSystem", systemId);
    setBrandField("search", brandSearch);
  }, [brandSearch, systemId]);

  const newRow: ProductOfferProductTable = {
    id: 0,
    pId: 0,
    bName: "",
    product: "",
    lastDate: "",
    s1O: "",
    s2O: "",
    s3O: "",
    s4O: "",
    s1N: "",
    s1D: "",
    s2N: "",
    s2D: "",
    s3N: "",
    s3D: "",
    s4N: "",
    s4D: "",
    dtlDsc: "",
    deleted: false,
    no: false,
    //index: 0,
    isDeleted: false,
  };

  const handleShowDeleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDeleted(e.target.checked);
  };
  ////////////////////////////////////////////////////////
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isModalOpen) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen]);
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (isNew && addList.length === 0) {
      setAddList([newRow]);
    }
  }, []);
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (
      isNew === false &&
      selectedProductOffer !== null &&
      (selectedProductOffer.flwId === 0 || fromWorkFlow) &&
      productOfferDtls !== undefined
    ) {
      //for edit
      setAddList(
        productOfferDtls.map((item) => ({
          ...item,
          s1O:
            item.s1NO + item.s1DO > 0
              ? item.s1DO.toString() + "+" + item.s1NO.toString()
              : "",
          s2O:
            item.s2NO + item.s2DO > 0
              ? item.s2DO.toString() + "+" + item.s2NO.toString()
              : "",
          s3O:
            item.s3NO + item.s3DO > 0
              ? item.s3DO.toString() + "+" + item.s3NO.toString()
              : "",
          s4O:
            item.s4NO + item.s4DO > 0
              ? item.s4DO.toString() + "+" + item.s4NO.toString()
              : "",
          isDeleted: false,
          no: false,
          dtlDsc: item.dtlDsc,
          deleted: item.deleted,
          index: productOfferDtls.length + 1,
          id: item.id,
          pId: item.pId,
          bName: item.bName,
          product: item.product,
          lastDate: item.lastDate,
          s1N: item.s1N + item.s1D > 0 ? item.s1N.toString() : "",
          s1D: item.s1D + item.s1N > 0 ? item.s1D.toString() : "",
          s2N: item.s2N + item.s2D > 0 ? item.s2N.toString() : "",
          s2D: item.s2D + item.s2N > 0 ? item.s2D.toString() : "",
          s3N: item.s3N + item.s3D > 0 ? item.s3N.toString() : "",
          s3D: item.s3D + item.s3N > 0 ? item.s3D.toString() : "",
          s4N: item.s4N + item.s4D > 0 ? item.s4N.toString() : "",
          s4D: item.s4D + item.s4N > 0 ? item.s4D.toString() : "",
        }))
      );
    }
  }, [selectedProductOffer]);
  ////////////////////////////////////////////////////////

  //send params to /api/Product/search?accSystem=4&accYear=15&page=1&searchTerm=%D8%B3%D9%81
  useEffect(() => {
    setProductField("accSystem", systemId);
    setProductField("accYear", yearId);
    //setProductField("searchTerm", convertToFarsiDigits(search));
    handleDebounceFilterChange("searchTerm", convertToFarsiDigits(search));
    setProductField("page", 1);
  }, [search, systemId, yearId]);
  ///////////////////////////////////////////////////////
  const abortControllerRef = useRef<AbortController | null>(null);
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
  ////////////////////////////////////////////////////////
  const handleSubmit = async (
    e?: React.MouseEvent<HTMLButtonElement>,
    productId: number = 0
  ): Promise<ShowProductListResponse | undefined> => {
    if (e) e.preventDefault();
    let request: ShowProductListRequest;
    request = {
      id: 0,
      productId: productId,
      acc_Year: yearId,
      brands: brand?.map((b) => b.id) ?? [],
    };

    console.log(request, "request");
    try {
      return await addProductList(request);
    } catch (error) {
      console.error("Error editing indents:", error);
    }
  };
  ////////////////////////////////////////////////////////
  const handleSubmitAndAddToTable = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number = 0
  ) => {
    const res = await handleSubmit(e, productId);
    console.log(res?.data.result, "res");
    if (res && res.data.result) {
      // Map through the new products
      res.data.result.forEach((product) => {
        setAddList((prev) => [
          ...prev,
          {
            id: product.id,
            pId: product.pId,
            bName: product.bName,
            product: product.product,
            lastDate: product.lastDate,
            s1O:
              product.s1NO + product.s1DO > 0
                ? product.s1DO.toString() + "+" + product.s1NO.toString()
                : "",
            s2O:
              product.s2NO + product.s2DO > 0
                ? product.s2DO.toString() + "+" + product.s2NO.toString()
                : "",
            s3O:
              product.s3NO + product.s3DO > 0
                ? product.s3DO.toString() + "+" + product.s3NO.toString()
                : "",
            s4O:
              product.s4NO + product.s4DO > 0
                ? product.s4DO.toString() + "+" + product.s4NO.toString()
                : "",
            s1N: "",
            s1D: "",
            s2N: "",
            s2D: "",
            s3N: "",
            s3D: "",
            s4N: "",
            s4D: "",
            dtlDsc: product.dtlDsc,
            deleted: product.deleted,
            no: false,
            //index: index + 1,
            isDeleted: false,
          },
        ]);
      });
      setAddList((prev) => [
        ...prev,
        {
          ...newRow,
          //index: addList.length + 1,
          isDeleted: false,
        },
      ]);
    }
  };
  ///////////////////////////////////////////////////////
  const handleAddRow = (
    index: number,
    setData: Dispatch<SetStateAction<ProductOfferProductTable2[]>>
  ) => {
    setData((prev: ProductOfferProductTable2[]) => [
      ...prev,
      { ...newRow, index: index },
    ]);
  };
  ////////////////////////////////////////////////////////
  const convertToLatinDigitsWithPlus = (value1: string, value2: string) => {
    return Number(convertToLatinDigits(value1)) +
      Number(convertToLatinDigits(value2)) >
      0
      ? convertToLatinDigits(value1).toString() +
          "+" +
          convertToLatinDigits(value2).toString()
      : "";
  };
  ////////////////////////////////////////////////////////
  const handleSubmitSave = async (
    e?: React.MouseEvent<HTMLButtonElement>
  ): Promise<ProductOfferSaveResponse | undefined> => {
    if (e) e.preventDefault();
    let request: ProductOfferSaveRequest;
    const dtls: Dtl[] = originalData
      .filter((item) => item.pId !== 0)
      .map((item) => {
        const dtl: Dtl = {
          id: item.id,
          pId: item.pId,
          s1: convertToLatinDigitsWithPlus(item.s1N, item.s1D),
          s2: convertToLatinDigitsWithPlus(item.s2N, item.s2D),
          s3: convertToLatinDigitsWithPlus(item.s3N, item.s3D),
          s4: convertToLatinDigitsWithPlus(item.s4N, item.s4D),
          no: item.no,
          dtlDsc: item.dtlDsc,
          deleted: item.isDeleted,
        };
        return dtl;
      });

    request = {
      chartId: chartId,
      id: isNew ? 0 : selectedProductOffer?.id ?? 0, //if isNew is true, id is 0, otherwise id is selectedProductOffer?.id for edit
      acc_System: systemId,
      acc_Year: yearId,
      dsc: convertToLatinDigits(dsc),
      dat: convertToLatinDigits(dat),
      tim: convertToLatinDigits(tim),
      saveAndSend: false,
      dtls: dtls,
    };
    console.log(request);
    try {
      const response = await productOfferSave(request);
      setIsModalRegOpen(true);
      //setIsNew(false);
      //setIsEdit(false);

      return response;
      //console.log( "request");
    } catch (error) {
      console.error("Error ثبت :", error);
    }
  };
  ///////////////////////////////////////////////////////
  return (
    <div className="flex flex-col gap-2">
      <ProductOfferFormParams
        isNew={isNew}
        selectedProductOffer={selectedProductOffer}
        dat={dat}
        tim={tim}
        dsc={dsc}
        setDat={setDat}
        setTim={setTim}
        setDsc={setDsc}
        brand={brand}
        setBrand={setBrand}
        setBrandSearch={setBrandSearch}
        canEditForm1={canEditForm1}
      />
      <ConfirmCard
        variant="flex-row gap-2 rounded-bl-md rounded-br-md justify-end"
        backgroundColor="transparent"
      >
        {canEditForm1 && (
          <Button
            text="ایجاد لیست"
            backgroundColor="bg-white"
            color="text-blue-500"
            backgroundColorHover="bg-blue-500"
            colorHover="text-white"
            variant="shadow-lg"
            onClick={handleSubmitAndAddToTable}
          />
        )}
        <Button
          text="اکسل"
          backgroundColor="bg-white"
          color="text-green-500"
          backgroundColorHover="bg-green-500"
          colorHover="text-white"
          variant="shadow-lg"
          onClick={() =>
            handleExport({
              data: originalData,
              setIsModalOpen,
              headCells: columns,
              fileName,
            })
          }
        />
      </ConfirmCard>
      <div className="flex items-center justify-between gap-4">
        <label className="text-lg font-bold">اقلام</label>
        <hr className="w-full border-2 border-gray-300" />
        <div className="flex gap-2 items-center justify-end w-32">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={handleShowDeleted}
          />
          <p className="text-sm whitespace-nowrap">نمایش حذف شده ها</p>
        </div>
      </div>

      <ProductOfferFormList
        canEditForm1={canEditForm1}
        setIsNew={setIsNew}
        setIsEdit={setIsEdit}
        columns={columns}
        originalData={originalData}
        setOriginalData={setOriginalData}
        isLoadingProductOfferSave={isLoadingProductOfferSave}
        handleSubmitSave={handleSubmitSave}
        isDtlHistoryLoading={isLoadingProductOfferDtlHistory}
        handleSubmit={handleSubmit}
        addList={addList}
        handleAddRow={handleAddRow}
        showDeleted={showDeleted}
        productOfferDtlHistory={productOfferDtlHistory}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        isModalRegOpen={isModalRegOpen}
        setIsModalRegOpen={setIsModalRegOpen}
      />
    </div>
  );
};

export default ProductOfferForm;
