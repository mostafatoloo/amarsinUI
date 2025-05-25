import { useEffect } from "react";
import { useGeneralContext } from "../../../context/GeneralContext";
import { useProviderDetailList } from "../../../hooks/useProviderList";
import { HeadCell } from "../../../hooks/useTable";
import { convertPersianDate } from "../../../utilities/general";
import { useProviderDetailStore } from "../../../store/providerStore";
import { Paper } from "@mui/material";
import { ProviderDetail } from "../../../types/provider";
import Skeleton from "../../layout/Skeleton";
import { Table } from "../../controls/Table";

type ProviderListDetailsProps = {
  productId: string;
  brand: { id: string; title: string } | null;
  sanadKind: { id: string; title: string } | null;
  startDate: Date | null;
  endDate: Date | null;
};

export const headCells: HeadCell<ProviderDetail>[] = [
  {
    id: "index",
    label: "ردیف",
    disableSorting: true,
  },
  { id: "kind", label: "نوع" },
  { id: "factorNo", label: "شماره فاکتور",isNumber:true },
  { id: "dat", label: "تاریخ",isNumber:true },
  { id: "customerId", label: "شماره. مشتری",isNumber:true },
  { id: "nId", label: "کد/شناسه ملی" ,isNumber:true},
  { id: "srName", label: "نام مشتری" },
  { id: "nId", label: "بچ" ,isNumber:true},
  { id: "dat", label: "انقضاء" ,isNumber:true},
  { id: "cnt", label: "تعداد", isNumber: true },
  { id: "offerCnt", label: "آفر", isNumber: true },
  { id: "cost", label: "قیمت فروش", isNumber: true },
  { id: "dcrmnt", label: "تخفیف", isNumber: true },
  { id: "valueTax", label: "مالیات", isNumber: true },
  { id: "total", label: "مبلغ", isNumber: true },
  { id: "shRId", label: "ش. برگه مسیر" ,isNumber:true},
  { id: "shRDate", label: "ت. برگه مسیر" ,isNumber:true},
  //{ id: "productId", label: "شناسه کالا" },
  //{ id: "bName", label: "نام برند" },
  //{ id: "cupInfoes", label: "اطلاعات صندوق" },
];

export default function ProviderListDetails({
  productId,
  brand,
  sanadKind,
  startDate,
  endDate,
}: ProviderListDetailsProps) {
  const { providerDetailList, error, isLoading } = useProviderDetailList();
  console.log(providerDetailList, "providerDetailList");

  const { systemId, yearId } = useGeneralContext();
  const { setField } = useProviderDetailStore();

  useEffect(() => {
    setField("productId", productId);
    setField("accSystem", systemId);
    setField("accYear", yearId);
    setField("brandId", brand === null || !brand ? 0 : brand.id);
    setField("sanadKind", sanadKind?.id);
    setField(
      "fDate",
      startDate === null || !startDate
        ? ""
        : convertPersianDate(startDate.toLocaleDateString("fa-IR"))
    );
    setField(
      "tDate",
      endDate === null || !endDate
        ? ""
        : convertPersianDate(endDate.toLocaleDateString("fa-IR"))
    );
  }, [systemId, yearId, brand?.id, sanadKind?.id, startDate, endDate]);
  if (error) return <div>Error: {error.message} </div>;

  return (
    <Paper className="p-2 m-2 w-full">
      {isLoading ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : providerDetailList.rpProviderDetails.length > 0 ? (
        <Table
          data={providerDetailList.rpProviderDetails}
          headCells={headCells}
          resetPageSignal={brand?.id}
        />
      ) : (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          هیچ اطلاعاتی یافت نشد.
        </p>
      )}
    </Paper>
  );
}
