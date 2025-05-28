import { useEffect } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import { useProviderDetailList } from "../../hooks/useProviderList";
import { HeadCell } from "../../hooks/useTable";
import { convertPersianDate } from "../../utilities/general";
import { useProviderDetailStore } from "../../store/providerStore";
import { Paper } from "@mui/material";
import Skeleton from "../layout/Skeleton";
import { Table } from "../controls/Table";
import { ProviderDetailTable } from "../../types/provider";

type ProviderListDetailsProps = {
  productId: string;
  brand: { id: string; title: string } | null;
  sanadKind: { id: string; title: string } | null;
  startDate: Date | null;
  endDate: Date | null;
};

export const headCells: HeadCell<ProviderDetailTable>[] = [
  {
    id: "index",
    label: "ردیف",
    disableSorting: true,
    cellWidth: "5%",
  },
  { id: "kind", label: "نوع", cellWidth: "5%" },
  { id: "factorNo", label: "شماره فاکتور", isNumber: true, cellWidth: "5%" },
  { id: "dat", label: "تاریخ", isNumber: true, cellWidth: "5%" },
  { id: "customerId", label: "شماره. مشتری", isNumber: true, cellWidth: "5%" },
  { id: "nId", label: "کد/شناسه ملی", isNumber: true, cellWidth: "5%" },
  { id: "srName", label: "نام مشتری", cellWidth: "20%" },
  {
    id: "cupInfoes",
    label: "بچ |انقضاء",
    isNumber: true,
    cellWidth: "5%",
  },
  { id: "cnt", label: "تعداد", isNumber: true, cellWidth: "5%" },
  { id: "offerCnt", label: "آفر", isNumber: true, cellWidth: "5%" },
  { id: "cost", label: "قیمت فروش", isNumber: true, cellWidth: "5%" },
  { id: "dcrmnt", label: "تخفیف", isNumber: true, cellWidth: "5%" },
  { id: "valueTax", label: "مالیات", isNumber: true, cellWidth: "5%" },
  { id: "total", label: "مبلغ", isNumber: true, cellWidth: "5%" },
  { id: "shRId", label: "ش. برگه مسیر", isNumber: true, cellWidth: "5%" },
  { id: "shRDate", label: "ت. برگه مسیر", isNumber: true, cellWidth: "5%" },
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
    <Paper className="p-2 m-2 w-full h-full">
      {isLoading ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : providerDetailList.rpProviderDetails.length > 0 ? (
        <div className="h-screen-minus-200">
          <Table
            data={providerDetailList.rpProviderDetails.map((ProviderDetail) => {
              console.log(ProviderDetail.cupInfoes.length, "ProviderDetail");
              return {
                ...ProviderDetail,
                cupInfoes:
                  ProviderDetail.cupInfoes.length > 0
                    ? ProviderDetail.cupInfoes
                        .map((cupInfo) => {
                          return (
                            <p>
                              cupInfo !== undefined ? `${cupInfo.code} | $
                              {cupInfo.expDate}` : ""
                            </p>
                          );
                        })
                        .join(", ")
                    : "",
              };
            })}
            headCells={headCells}
            resetPageSignal={brand?.id}
          />
        </div>
      ) : (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          هیچ اطلاعاتی یافت نشد.
        </p>
      )}
    </Paper>
  );
}
