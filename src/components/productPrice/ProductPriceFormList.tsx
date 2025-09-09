import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ConfirmCard from "../layout/ConfirmCard";
import Button from "../controls/Button";
import TTable from "../controls/TTable";
import { DefaultOptionType, TableColumns } from "../../types/general";
import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";
import { red } from "@mui/material/colors";
import ModalMessage from "../layout/ModalMessage";
import {
  ProductPriceDtlHistory,
  ProductPriceListItem,
  ProductPriceListItemTable,
  ProductPriceListItemTable2,
  ProductPriceListResponse,
} from "../../types/productPrice";
import { useProductPriceStore } from "../../store/productPriceStore";
import ProductPriceFormListHistory from "./ProductPriceFormListHistory";
import ProductPriceFormListHeader from "./ProductPriceFormListHeader";
import { colors } from "../../utilities/color";
import ModalForm from "../layout/ModalForm";
import ShowMessages from "../controls/ShowMessages";

type Props = {
  setIsNew: (isNew: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  addList: ProductPriceListItemTable[];
  showDeleted: boolean;
  handleSubmit: (
    e?: React.MouseEvent<HTMLButtonElement>,
    productId?: number
  ) => Promise<ProductPriceListResponse | undefined>;
  isLoadingProductPriceSave: boolean;
  handleSubmitSave: () => Promise<string | undefined>;
  isDtlHistoryLoading: boolean;
  handleAddRow: (
    index: number,
    setData: Dispatch<SetStateAction<ProductPriceListItemTable2[]>>
  ) => void;
  productPriceDtlHistory: ProductPriceDtlHistory[];
  originalData: ProductPriceListItemTable2[];
  setOriginalData: Dispatch<SetStateAction<ProductPriceListItemTable2[]>>;
  columns: TableColumns;
  showHistory: boolean;
  setShowHistory: Dispatch<SetStateAction<boolean>>;
  isModalRegOpen: boolean;
  setIsModalRegOpen: Dispatch<SetStateAction<boolean>>;
  isModalEmptyOpen: boolean;
  setIsModalEmptyOpen: Dispatch<SetStateAction<boolean>>;
};

const ProductPriceFormList = ({
  setIsNew,
  setIsEdit,
  addList,
  showDeleted,
  handleSubmit,
  isLoadingProductPriceSave,
  handleSubmitSave,
  isDtlHistoryLoading,
  handleAddRow,
  productPriceDtlHistory,
  originalData,
  setOriginalData,
  columns,
  showHistory,
  setShowHistory,
  isModalRegOpen,
  setIsModalRegOpen,
  isModalEmptyOpen,
  setIsModalEmptyOpen,
}: Props) => {
  const { productPriceSaveResponse } = useProductPriceStore();
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [dtlDscSearch, setDtlDscSearch] = useState<string>("");
  const [productSearch, setProductSearch] = useState<string>("");
  const [deletedData, setDeletedData] = useState<ProductPriceListItemTable2[]>(
    []
  );
  const [data, setData] = useState<ProductPriceListItemTable2[]>([]);

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
      Header: "پخش",
      accessor: "p1",
      width: "10%",
    },
    {
      Header: "داروخانه",
      accessor: "p2",
      width: "10%",
    },
    {
      Header: "مصرف کننده",
      accessor: "p3",
      width: "10%",
    },
    {
      Header: "مشتری",
      accessor: "p4",
      width: "10%",
    },
    {
      Header: "مشتری",
      accessor: "p5",
      width: "10%",
    },
    {
      Header: "شرح",
      accessor: "dtlDsc",
      width: "40%",
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
    let productPriceProducts: ProductPriceListItem[] | undefined =
      response?.data.result;
    console.log(productPriceProducts, "productPriceProducts");
    setOriginalData((old) =>
      old.map((row, index) => {
        if (index === rowIndex && productPriceProducts) {
          return {
            ...old[rowIndex],
            index: rowIndex + 1,
            bName: productPriceProducts[0].bName,
            product: productPriceProducts[0].product,
            pId: productPriceProducts[0].pId,
            lastDate: productPriceProducts[0].lastDate,
            p1: productPriceProducts[0].p1O,
            p2: productPriceProducts[0].p2O,
            p3: productPriceProducts[0].p3O,
            p4: productPriceProducts[0].p4O,
            p5: productPriceProducts[0].p5O,
            dtlDsc: productPriceProducts[0].dtlDsc,
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
  ////////////////////////////////////////////////////////
  useEffect(() => {
    let timeoutId: number;
    if (isModalEmptyOpen) {
      timeoutId = setTimeout(() => {
        setIsModalEmptyOpen(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalEmptyOpen]);
  ////////////////////////////////////////////////////////
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0); //for selected row index in productGraceFormList table
  return (
    <>
      <div className="mt-2 w-full bg-white rounded-md">
        <div
          className="overflow-y-auto"
          style={width > 640 ? { height: height - 400 } : {}}
        >
          <ProductPriceFormListHeader
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
            data={data}
            updateMyData={updateMyData}
            fontSize="0.75rem"
            changeRowSelectColor={true}
            wordWrap={true}
            updateMyRow={updateMyRow}
            CellColorChange={handleCellColorChange}
            changeRowValues={changeRowValues}
            showToolTip={true}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
          />
        </div>
        <ConfirmCard variant="flex-row gap-2 rounded-bl-md rounded-br-md justify-end ">
          <Button
            text={isLoadingProductPriceSave ? "در حال ثبت اطلاعات..." : "ثبت"}
            backgroundColor="bg-green-500"
            color="text-white"
            backgroundColorHover="bg-green-600"
            colorHover="text-white"
            variant="shadow-lg w-64"
            onClick={handleSubmitSave}
          />
        </ConfirmCard>
      </div>
      <ProductPriceFormListHistory
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        isDtlHistoryLoading={isDtlHistoryLoading}
        productPriceDtlHistory={productPriceDtlHistory}
        columnsHistory={columnsHistory}
      />
      <ModalMessage
        isOpen={isModalRegOpen}
        onClose={() => setIsModalRegOpen(false)}
        backgroundColor={
          productPriceSaveResponse?.meta.errorCode === -1
            ? "bg-green-200"
            : "bg-red-200"
        }
        bgColorButton={
          productPriceSaveResponse?.meta.errorCode === -1
            ? "bg-green-500"
            : "bg-red-500"
        }
        color="text-white"
        message={
          productPriceSaveResponse?.meta.errorCode !== -1
            ? productPriceSaveResponse?.meta.message || ""
            : "اطلاعات با موفقیت ثبت شد."
        }
        visibleButton={false}
      />
      {<ModalMessage
        isOpen={isModalEmptyOpen}
        onClose={() => setIsModalEmptyOpen(false)}
        backgroundColor={"bg-red-200"}
        bgColorButton={"bg-red-500"}
        color="text-white"
        message={"اقلام مشخص نشده!"}
        visibleButton={false}
      />}

      {productPriceSaveResponse?.data.result.dtlErrMsgs?.length > 0 && (
        <ModalForm
          isOpen={isModalRegOpen}
          onClose={() => setIsModalRegOpen(false)}
          title="پیام ها"
          width="1/2"
        >
          <ShowMessages
            dtlErrMsgs={productPriceSaveResponse.data.result.dtlErrMsgs || []}
            color={colors.red100}
            heightWindow={300}
          />
        </ModalForm>
      )}
    </>
  );
};

export default ProductPriceFormList;
