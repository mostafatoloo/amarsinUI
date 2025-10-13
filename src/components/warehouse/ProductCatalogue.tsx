import { useEffect } from "react";
import { useWarehouse } from "../../hooks/useWarehouse";
import {
  ProductCatalogTable,
  WarehouseTemporaryReceiptIndentDtl,
} from "../../types/warehouse";
import { useWarehouseStore } from "../../store/warehouseStore";
import { green, red } from "@mui/material/colors";
import Skeleton from "../layout/Skeleton";
import TTable from "../controls/TTable";
import { Column } from "../../types/general";
import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";
import { convertToFarsiDigits } from "../../utilities/general";

type Props = {
  dtl: WarehouseTemporaryReceiptIndentDtl;
  visible: boolean;
};

const ProductCatalogue = ({ dtl, visible }: Props) => {
  const { productCatalog, isLoadingProductCatalog } = useWarehouse();
  const { setField } = useWarehouseStore();
  const columns: Column[] = [
    {
      Header: "ردیف",
      accessor: "rowId",
      width: "5%",
      Cell: ({ value }: any) => convertToFarsiDigits(value),
    },
    {
      Header: "عنوان",
      accessor: "title",
      width: visible ? "15%" : "35%",
      Cell: ({ value }: any) => convertToFarsiDigits(value),
    },
    {
      Header: "اطلاعات سیستم",
      accessor: "systemInfo",
      width: "40%",
      visible,
      Cell: ({ value }: any) => convertToFarsiDigits(value),
    },
    {
      Header: "اطلاعات سامانه",
      accessor: "samaneInfo",
      width: visible ? "40%" : "60%",
      Cell: ({ value }: any) => convertToFarsiDigits(value),
    },
  ];
  const titles = [
    "بچ",
    "صاحب مجوز",
    "کالا",
    "تولید",
    "انقضاء",
    "GTIN",
    "IRC",
    "تعداد در بسته",
    "کد گروه",
    "گروه",
    "کد وضعیت",
    "وضعیت",
  ];

  const systemInfos = [
    dtl.code,
    "",
    dtl.pName,
    dtl.produce,
    dtl.expire,
    dtl.gtin,
    dtl.irc,
    "",
    "",
    "",
    "",
  ];
  const samaneInfos = [
    productCatalog.data?.BatchCode,
    productCatalog.data?.LicenseOwner,
    productCatalog.data?.PersianProductName,
    productCatalog.data?.Manufacturing,
    productCatalog.data?.Expiration,
    productCatalog.data?.GTIN,
    productCatalog.data?.IRC,
    productCatalog.data?.PackageCount.toString(),
    productCatalog.data?.ProductCategoryCode.toString(),
    productCatalog.data?.ProductCategory,
    productCatalog?.statusCode.toString(),
  ];

  let data: ProductCatalogTable[] = [];
  let i: number;
  for (i = 0; i < 12; i++) {
    let record: ProductCatalogTable =
      i !== 11
        ? {
            rowId: String(i + 1),
            title: titles[i],
            systemInfo: systemInfos[i] ?? "",
            samaneInfo: samaneInfos[i] ?? "",
          }
        : {
            rowId: "",
            title: titles[i],
            systemInfo: "",
            samaneInfo: productCatalog.statusMessage,
          };
    data.push(record);
  }

  useEffect(() => {
    console.log(dtl, "dtl in useEffect");
    console.log(dtl.cId, "dtl.cId");
    setField("productId", dtl.cId);
    //getProductCatalog()
  }, [dtl.cId]);

  const handleCellColorChange = (row: any): string | null => {
    if (row.original.title === "وضعیت")
      return row.original.samaneInfo === "مجاز" ? green[200] : red[200];
    return "";
  };

  const {  width } = useCalculateTableHeight();

  return (
    <>
      {isLoadingProductCatalog ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : (
        <>
          <TTable
            data={data}
            columns={columns}
            wordWrap={true}
            CellColorChange={handleCellColorChange}
            fontSize={width > 640 ? "1rem" : "0.75rem"}
          />
        </>
      )}
    </>
  );
};

export default ProductCatalogue;
