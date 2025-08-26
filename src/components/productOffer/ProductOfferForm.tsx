import { useEffect, useState } from "react";
import ProductOfferFormParams from "./ProductOfferFormParams";
import { DefaultOptionTypeStringId } from "../../types/general";
import ConfirmCard from "../layout/ConfirmCard";
import Button from "../controls/Button";
import { handleExport } from "../../utilities/ExcelExport";
import {
  ProductOfferProduct,
  ProductOfferProductTable,
  ShowProductListRequest,
  ShowProductListResponse,
} from "../../types/productOffer";
import { useGeneralContext } from "../../context/GeneralContext";

type Props = {
  addProductList: (
    request: ShowProductListRequest
  ) => Promise<ShowProductListResponse>;
};

const ProductOfferForm = ({ addProductList }: Props) => {
  const [addList, setAddList] = useState<ProductOfferProduct[]>([]);
  const [brand, setBrand] = useState<DefaultOptionTypeStringId[] | null>([]);
  const [brandSearch, setBrandSearch] = useState<string>("");
  const { yearId } = useGeneralContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileName = "data_export.xlsx";

  const newRow: ProductOfferProductTable = {
    id: 0,
    ordr: 0,
    pId: 0,
    bName: "",
    product: "",
    lastDate: "",
    s1NO: 0,
    s1DO: 0,
    s2NO: 0,
    s2DO: 0,
    s3NO: 0,
    s3DO: 0,
    s4NO: 0,
    s4DO: 0,
    s5NO: 0,
    s5DO: 0,
    s1N: 0,
    s1D: 0,
    s2N: 0,
    s2D: 0,
    s3N: 0,
    s3D: 0,
    s4N: 0,
    s4D: 0,
    s5N: 0,
    s5D: 0,
    dtlDsc: "",
    deleted: false,
    index: 0,
    isDeleted: false,
  };

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

  const handleSubmitAndAddToTable = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number = 0
  ) => {
    const res = await handleSubmit(e, productId);

    if (res && res.data.result.productOfferProducts) {
      // Map through the new products
      res.data.result.productOfferProducts.forEach((product) => {
        setAddList((prev) => [
          ...prev,
          {
            id: product.id,
            ordr: 0,
            pId: product.pId,
            bName: product.bName,
            product: product.product,
            lastDate: product.lastDate,
            s1NO: product.s1NO,
            s1DO: product.s1DO,
            s2NO: product.s2NO,
            s2DO: product.s2DO,
            s3NO: product.s3NO,
            s3DO: product.s3DO,
            s4NO: product.s4NO,
            s4DO: product.s4DO,
            s5NO: product.s5NO,
            s5DO: product.s5DO,
            s1N: product.s1N,
            s1D: product.s1D,
            s2N: product.s2N,
            s2D: product.s2D,
            s3N: product.s3N,
            s3D: product.s3D,
            s4N: product.s4N,
            s4D: product.s4D,
            s5N: product.s5N,
            s5D: product.s5D,
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
          //  index: rowIndex + res.indentProducts.length + 1
          isDeleted: false,
        },
      ]);
    }
  };

  return (
    <div>
      <ProductOfferFormParams
        brand={brand}
        setBrand={setBrand}
        setBrandSearch={setBrandSearch}
      />
      <ConfirmCard
        variant="flex-row gap-2 rounded-bl-md rounded-br-md justify-end"
        backgroundColor="bg-white"
      >
        <Button
          text="ایجاد لیست"
          backgroundColor="bg-white"
          color="text-blue-500"
          backgroundColorHover="bg-blue-500"
          colorHover="text-white"
          variant="shadow-lg"
          onClick={handleSubmitAndAddToTable}
        />
        <Button
          text="اکسل"
          backgroundColor="bg-white"
          color="text-green-500"
          backgroundColorHover="bg-green-500"
          colorHover="text-white"
          variant="shadow-lg"
          onClick={() =>
            handleExport({
              data: [],
              setIsModalOpen,
              headCells: [],
              fileName,
            })
          }
        />
      </ConfirmCard>
    </div>
  );
};

export default ProductOfferForm;
