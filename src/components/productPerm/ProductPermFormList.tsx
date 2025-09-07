import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ConfirmCard from "../layout/ConfirmCard";
import Button from "../controls/Button";
import TTable from "../controls/TTable";
import Accept from "../../assets/images/GrayThem/img24_3.png";
import { DefaultOptionType, TableColumns } from "../../types/general";
import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";
import { red } from "@mui/material/colors";
import ModalMessage from "../layout/ModalMessage";
import {
  ProductPermDtlHistory,
  ProductPermListItem,
  ProductPermListItemTable,
  ProductPermListItemTable2,
  ProductPermListResponse,
  ProductPermSaveResponse,
} from "../../types/productPerm";
import ProductPermFormListHeader from "./ProductPermFormListHeader";
import ProductPermFormListHistory from "./ProductPermFormListHistory";
import { useProductPermStore } from "../../store/productPermStore";

type Props = {
  setIsNew: (isNew: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  addList: ProductPermListItemTable[];
  showDeleted: boolean;
  handleSubmit: (
    e?: React.MouseEvent<HTMLButtonElement>,
    productId?: number
  ) => Promise<ProductPermListResponse | undefined>;
  isLoadingProductOfferSave: boolean;
  handleSubmitSave: () => Promise<ProductPermSaveResponse | undefined>;
  isDtlHistoryLoading: boolean;
  handleAddRow: (
    index: number,
    setData: Dispatch<SetStateAction<ProductPermListItemTable2[]>>
  ) => void;
  productPermDtlHistory: ProductPermDtlHistory[];
  originalData: ProductPermListItemTable2[];
  setOriginalData: Dispatch<SetStateAction<ProductPermListItemTable2[]>>;
  columns: TableColumns;
  showHistory: boolean;
  setShowHistory: Dispatch<SetStateAction<boolean>>;
  isModalRegOpen: boolean;
  setIsModalRegOpen: Dispatch<SetStateAction<boolean>>;
};

const ProductPermFormList = ({
  setIsNew,
  setIsEdit,
  addList,
  showDeleted,
  handleSubmit,
  isLoadingProductOfferSave,
  handleSubmitSave,
  isDtlHistoryLoading,
  handleAddRow,
  productPermDtlHistory,
  originalData,
  setOriginalData,
  columns,
  showHistory,
  setShowHistory,
  isModalRegOpen,
  setIsModalRegOpen,
}: Props) => {
  const { productPermSaveResponse } = useProductPermStore();
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [dtlDscSearch, setDtlDscSearch] = useState<string>("");
  const [productSearch, setProductSearch] = useState<string>("");
  const [deletedData, setDeletedData] = useState<ProductPermListItemTable2[]>(
    []
  );
  const [data, setData] = useState<ProductPermListItemTable2[]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0); //for selected row index in productPermFormList table

  const columnsHistory: TableColumns = [
    {
      Header: "ردیف",
      accessor: "index",
      width: "5%",
    },
    {
      Header: "تغییر",
      accessor: "date",
      width: "10%",
    },
    {
      Header: "تایید",
      accessor: "accepted",
      width: "5%",
    },
    {
      Header: "نیاز به مجوز",
      accessor: "np",
      width: "10%",
    },
    {
      Header: "شرح",
      accessor: "dtlDsc",
      width: "70%",
    },
  ];

  // Initialize data when addList changes
  useEffect(() => {
    if (addList.length > 0) {
      let i = 1;
      let initialData = addList.map((item) => ({
        ...item,
        index: i++,
        isDeleted: false,
      }));
      //initialData.push({ ...newRow, index: initialData.length + 1 });
      setOriginalData(initialData);
      setData(initialData);
    }
  }, [addList]);
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
  }, [brandSearch, productSearch, dtlDscSearch, originalData]);
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
  //////////////////////////////////////////////////////
  const updateMyData = (rowIndex: number, columnId: string, value: string) => {
    // We also turn on the flag to not reset the page
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
            };
          }
          return row;
        })
      );
    }
  };
  ////////////////////////////////////////////////////
  const changeRowValues = (
    value: string,
    rowIndex: number,
    columnId: string
  ) => {
    updateMyData(rowIndex, columnId, value);
  };
  /////////////////////////////////////////////////////
  const updateMyRow = async (rowIndex: number, value: DefaultOptionType) => {
    const productId = value?.id ?? 0;
    if (productId === 0) return;
    const response = await handleSubmit(undefined, productId);
    let productOfferProducts: ProductPermListItem[] | undefined =
      response?.data.result;
    setOriginalData((old) =>
      old.map((row, index) => {
        if (index === rowIndex && productOfferProducts) {
          return {
            ...old[rowIndex],
            index: rowIndex + 1,
            bName: productOfferProducts[0].bName,
            product: productOfferProducts[0].product,
            pId: productOfferProducts[0].pId,
            lastDate: productOfferProducts[0].lastDate,
            npo: productOfferProducts[0].npo,
            npCk: productOfferProducts[0].np ? (
              <img src={Accept} alt="Accept" className="w-4 h-4" />
            ) : null,
            dtlDsc: productOfferProducts[0].dtlDsc,
            isDeleted: false,
          };
        }
        return row;
      })
    );
    if (rowIndex === originalData.length - 1) {
      handleAddRow(rowIndex + 2, setOriginalData);
    }
  };
  /////////////////////////////////////////////////////
  // Custom cell click handler for Table
  const handleCellColorChange = (row: any): string | null => {
    if (row.original.isDeleted) {
      return red[100];
    }
    return null;
  };
  /////////////////////////////////////////////////////
  const { height, width } = useCalculateTableHeight();
  ////////////////////////////////////////////////////////
  useEffect(() => {
    let timeoutId: number;
    if (isModalRegOpen) {
      timeoutId = setTimeout(() => {
        setIsModalRegOpen(false);
        setIsNew(false);
        setIsEdit(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalRegOpen]);

  return (
    <>
      <div className="mt-2 w-full bg-white rounded-md">
        <div
          className="overflow-y-auto"
          style={width > 640 ? { height: height - 400 } : {}}
        >
          <ProductPermFormListHeader
            columns={columns}
            brandSearch={brandSearch}
            setBrandSearch={setBrandSearch}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
            dtlDscSearch={dtlDscSearch}
            setDtlDscSearch={setDtlDscSearch}
          />

          <TTable
            canEditForm={true}
            columns={columns}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            data={data}
            updateMyData={updateMyData}
            fontSize="0.75rem"
            changeRowSelectColor={true}
            wordWrap={true}
            updateMyRow={updateMyRow}
            CellColorChange={handleCellColorChange}
            changeRowValues={changeRowValues}
            showToolTip={true}
          />
        </div>
        <ConfirmCard variant="flex-row gap-2 rounded-bl-md rounded-br-md justify-end ">
          <Button
            text={isLoadingProductOfferSave ? "در حال ثبت اطلاعات..." : "ثبت"}
            backgroundColor="bg-green-500"
            color="text-white"
            backgroundColorHover="bg-green-600"
            colorHover="text-white"
            variant="shadow-lg w-64"
            onClick={handleSubmitSave}
          />
        </ConfirmCard>
      </div>
      <ProductPermFormListHistory
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        isDtlHistoryLoading={isDtlHistoryLoading}
        productPermDtlHistory={productPermDtlHistory}
        columnsHistory={columnsHistory}
      />
      <ModalMessage
        isOpen={isModalRegOpen}
        onClose={() => setIsModalRegOpen(false)}
        backgroundColor={
          productPermSaveResponse?.meta.errorCode === -1
            ? "bg-green-200"
            : "bg-red-200"
        }
        bgColorButton={
          productPermSaveResponse?.meta.errorCode === -1
            ? "bg-green-500"
            : "bg-red-500"
        }
        color="text-white"
        message={
          productPermSaveResponse?.meta.errorCode !== -1
            ? productPermSaveResponse?.meta.message || ""
            : "اطلاعات با موفقیت ثبت شد."
        }
        visibleButton={false}
      />
    </>
  );
};

export default ProductPermFormList;
