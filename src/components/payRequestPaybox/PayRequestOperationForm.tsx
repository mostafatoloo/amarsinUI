import TrashIcon from "../../assets/images/GrayThem/delete_gray_16.png";
import HistoryIcon from "../../assets/images/GrayThem/history_gray_16.png";
import {
  convertToFarsiDigits,
} from "../../utilities/general";
import { EditableInput } from "../controls/TTable";
import PayRequestShow from "../payRequest/PayRequestShow";
import { PayRequest } from "../../types/payRequest";

type Props = {
  /* addProductList: (
    request: ShowProductListRequest
  ) => Promise<ProductPriceListResponse>;
  productPriceDtlHistory: ProductPriceDtlHistory[];
  isLoadingDtlHistory: boolean;
  productPriceSave: (
    request: ProductPriceSaveRequest
  ) => Promise<ProductPriceSaveResponse>;
  isLoadingProductPriceSave: boolean;
  selectedProductPrice: ProductPrice | null;
  productPriceDtls: ProductPriceDtl[] | undefined;
  isNew: boolean;
  setIsNew: (isNew: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;*/
  selectedPayRequest: PayRequest | null;
  isNew: boolean;
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
    width: "28%",
    type: "autoComplete",
    placeholder: "کالا را انتخاب کنید...",
    Cell: EditableInput,
  },
  {
    Header: "قیمت خرید",
    accessor: "lastBuyPrice",
    width: "4%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "مالیات",
    accessor: "tax",
    width: "4%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "تغییر",
    accessor: "lastDate",
    width: "4%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "پخش",
    accessor: "p1",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "داروخانه",
    accessor: "p2",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "مصرف کننده",
    accessor: "p3",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "مشتری",
    accessor: "p4",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "مشتری",
    accessor: "p5",
    width: "3%",
    Cell: ({ value }: any) => convertToFarsiDigits(value),
  },
  {
    Header: "پخش",
    accessor: "p1O",
    width: "4%",
    type: "inputText",
    Cell: EditableInput,
  },
  {
    Header: "داروخانه",
    accessor: "p2O",
    width: "4%",
    type: "inputText",
    Cell: EditableInput,
  },
  {
    Header: "مصرف کننده",
    accessor: "p3O",
    width: "4%",
    type: "inputText",
    Cell: EditableInput,
  },
  {
    Header: "مشتری",
    accessor: "p4O",
    width: "4%",
    type: "inputText",
    Cell: EditableInput,
  },
  {
    Header: "مشتری",
    accessor: "p5O",
    width: "4%",
    type: "inputText",
    Cell: EditableInput,
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

const ProductPriceForm = ({
  /*addProductList,
  productPriceDtlHistory,
  isLoadingDtlHistory,
  productPriceSave,
  isLoadingProductPriceSave,
  selectedProductPrice,
  productPriceDtls,
  isNew,
  setIsNew,
  setIsEdit,*/
  selectedPayRequest,
  isNew,
}: Props) => {
  /*const [addList, setAddList] = useState<ProductPriceListItemTable[]>([]);
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
  const { setField: setProductPriceDtlHistoryField } = useProductPriceStore();
  const { authApiResponse } = useAuthStore();
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<
    ProductPriceListItemTable2[]
  >([]);
  const [dat, setDat] = useState<string>("");
  const [tim, setTim] = useState<string>("");
  const [dsc, setDsc] = useState<string>("");
  const [isModalRegOpen, setIsModalRegOpen] = useState(false);
  const [isModalEmptyOpen, setIsModalEmptyOpen] = useState(false);

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
              }
            : item.Cell,
      };
    });
  }, [products, setSearch]);

  ////////////////////////////////////////////////////////
  const handleShowHistory = (row: any) => {
    if (row.original.pId !== 0) {
      console.log(row.original.pId, "row.original.pId");
      setProductPriceDtlHistoryField("pId", row.original.pId);
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
  ///////////////////////////////////////////////////////
  const newRow: ProductPriceListItemTable = {
    id: 0,
    pId: 0,
    bName: "",
    product: "",
    lastDate: "",
    lastBuyPrice: 0,
    tax: 0,
    p1O: 0,
    p2O: 0,
    p3O: 0,
    p4O: 0,
    p5O: 0,
    dtlDsc: "",
    deleted: false,
    isDeleted: false,
  };

  const handleShowDeleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDeleted(e.target.checked);
  };
  ////////////////////////////////////////////////////////
  useEffect(() => {
    let timeoutId: number;
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
    if (
      isNew === false &&
      selectedProductPrice !== null &&
      selectedProductPrice.flwId === 0 &&
      productPriceDtls !== undefined
    ) {
      //for edit
      console.log(productPriceDtls, "productPriceDtls");
      setAddList(
        productPriceDtls.map((item) => ({
          ...item,
          id: item.id,
          pId: item.pId,
          bName: item.bName,
          product: item.product,
          lastDate: item.lastDate,
          lastBuyPrice: item.lastBuyPrice,
          tax: item.tax,
          p1O: item.p1O,
          p2O: item.p2O,
          p3O: item.p3O,
          p4O: item.p4O,
          p5O: item.p5O,
          p1: item.p1,
          p2: item.p2,
          p3: item.p3,
          p4: item.p4,
          p5: item.p5,
          dtlDsc: item.dtlDsc,
          deleted: item.deleted,
          isDeleted: false,
          index: productPriceDtls.length + 1,
        }))
      );
    }
  }, [selectedProductPrice]);
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
  ): Promise<ProductPriceListResponse | undefined> => {
    if (e) e.preventDefault();
    let request: ShowProductListRequest;
    request = {
      id: 0,
      productId: productId,
      acc_Year: yearId,
      brands: brand?.map((b) => Number(b.id)) ?? [],
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
      res.data.result.forEach((product: ProductPriceListItem) => {
        setAddList((prev) => [
          ...prev,
          {
            id: product.id,
            pId: product.pId,
            bName: product.bName,
            product: product.product,
            lastDate: product.lastDate,
            lastBuyPrice: product.lastBuyPrice,
            tax: product.tax,
            p1O: 0,
            p2O: 0,
            p3O: 0,
            p4O: 0,
            p5O: 0,
            p1: product.p1O > 0 ? product.p1O : 0,
            p2: product.p2O > 0 ? product.p2O : 0,
            p3: product.p3O > 0 ? product.p3O : 0,
            p4: product.p4O > 0 ? product.p4O : 0,
            p5: product.p5O > 0 ? product.p5O : 0,
            dtlDsc: product.dtlDsc,
            deleted: product.deleted,
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
    setData: Dispatch<SetStateAction<ProductPriceListItemTable2[]>>
  ) => {
    setData((prev: ProductPriceListItemTable2[]) => [
      ...prev,
      { ...newRow, index: index },
    ]);
  };
  ////////////////////////////////////////////////////////
  const handleSubmitSave = async (
    e?: React.MouseEvent<HTMLButtonElement>
  ): Promise<string | undefined> => {
    if (e) e.preventDefault();
    let request: ProductPriceSaveRequest;
    const dtls = originalData
      .filter((item) => item.pId !== 0)
      .map((item) => {
        const dtl = {
          id: item.id,
          pId: item.pId,
          ordr: 0,
          p1: Number(convertToLatinDigits(item.p1O.toString())),
          p2: Number(convertToLatinDigits(item.p2O.toString())),
          p3: Number(convertToLatinDigits(item.p3O.toString())),
          p4: Number(convertToLatinDigits(item.p4O.toString())),
          p5: Number(convertToLatinDigits(item.p5O.toString())),
          dtlDsc: item.dtlDsc,
          deleted: item.isDeleted,
        };
        if (
          item.p1O !== 0 ||
          item.p2O !== 0 ||
          item.p3O !== 0 ||
          item.p4O !== 0 ||
          item.p5O !== 0
        ) {
          return dtl;
        } else {
          return undefined;
        }
      })
      .filter((item) => item !== undefined);
    console.log(dtls, "dtls");
    if (dtls.length === 0) {
      setIsModalEmptyOpen(true);
      return "اقلام مشخص نشده!";
    }
    request = {
      usrId: authApiResponse?.data.result.login.usrId ?? 0,
      skipWarning: true,
      chartId: chartId,
      id: isNew ? 0 : selectedProductPrice?.id ?? 0, //if isNew is true, id is 0, otherwise id is selectedProductPerm?.id for edit
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
      await productPriceSave(request);
      setIsModalRegOpen(true);
      return "اطلاعات با موفقیت ثبت شد.";
      //setIsNew(false);
      //setIsEdit(false);
      //return response;
      //console.log( "request");
    } catch (error) {
      console.error("Error ثبت :", error);
    }
  };*/
  ///////////////////////////////////////////////////////
  const workFlowRowSelectResponse = {
    err: 0,
    msg: "",
    workTableRow: {
      id: 974431,
      regFDate: selectedPayRequest?.dat ?? "",
      regTime: selectedPayRequest?.tim ?? "",
      regDateTime: selectedPayRequest?.dat + " - " + selectedPayRequest?.tim,
      formId: selectedPayRequest?.id ?? 0,
      formTitle: "درخواست پرداخت",
      formCode: selectedPayRequest?.id.toString() ?? "",
      formCost: 0.0,
      fChartName: "مدیر عامل (برنامه نویس)",
      flowMapTitle: "ثبت اولیه",
      dsc: selectedPayRequest?.dsc ?? "",
      operation: 0,
      wfmS_FlowMapId: 0,
      wfmS_FlowId: selectedPayRequest?.flwId ?? 0,
      flowNo: 0,
      canEditForm1: true,
      canEditForm2: true,
      printForm1: true,
      printForm2: true,
    },
    flowButtons: [
      {
        id: 405020302,
        name: "ارسال به سرپرست خرید",
        webAPIUrl: "",
        imageIndex: 3,
      },
      {
        id: 405020382,
        name: "لغو و بایگانی",
        webAPIUrl: "",
        imageIndex: 4,
      },
    ],
    workTableForms: {
      form1Title: "درخواست پرداخت",
      form1ViewPath: "PayRequest/_PayRequest",
      canEditForm1: true,
      canEditForm1Mst1: true,
      canEditForm1Mst2: true,
      canEditForm1Mst3: true,
      canEditForm1DtlDel: true,
      canEditForm1Dtl1: false,
      canEditForm1Dtl2: true,
      canEditForm1Dtl3: true,
      form2Title: "",
      form2ViewPath: "",
      canEditForm2: true,
    },
    flowDescriptions: [
      {
        usrName: "برنامه نویس",
        dsc: selectedPayRequest?.dsc ?? "",
      },
    ],
  };

  return (
    <div>
      <PayRequestShow workFlowRowSelectResponse={workFlowRowSelectResponse} isNew={isNew}/>
    </div>
  );
};

export default ProductPriceForm;
