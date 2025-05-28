import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { useBrandStore } from "../../store/brandStore";
import Skeleton from "../layout/Skeleton";
import { useNavigate } from "react-router-dom";
import { Table } from "../controls/Table";
import { useGeneralContext } from "../../context/GeneralContext";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { convertPersianDate } from "../../utilities/general";
import ReportIcon from "../../assets/images/GrayThem/report16.png";
import ProviderProducerParams from "../provider/ProviderProducerParams";
import { useProducerList } from "../../hooks/useProducerList";
import { RpProduct } from "../../types/producer";
import { useProducerStore } from "../../store/producerStore";

type ProducerListFormProps = {
  brand: { id: string; title: string } | null;
  setBrand: (brand: { id: string; title: string } | null) => void;
  sanadKind: { id: string; title: string } | null;
  setSanadKind: (sanadKind: { id: string; title: string } | null) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  onShowDetails?: (providerId: string) => void;
};

export const headCells: HeadCell<RpProduct>[] = [
  {
    id: "index",
    label: "ردیف",
    disableSorting: true,
    cellWidth: "10%",
  },
  { id: "name", label: "نام کالا", cellWidth: "20%" },
  { id: "cnt", label: "تعداد", isNumber: true, cellWidth: "10%" },
  {
    id: "total",
    label: "مبلغ",
    isNumber: true,
    isCurrency: true,
    cellWidth: "10%",
  },
  { id: "offerCnt", label: "تعداد", isNumber: true, cellWidth: "10%" },
];

export default function ProviderListForm({
  brand,
  setBrand,
  sanadKind,
  setSanadKind,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onShowDetails,
}: ProducerListFormProps) {
  const { producerList, error, isLoading } = useProducerList();

  console.log(producerList.producers, "producers", producerList.rpProducts, "rpProducts");

  const headerGroups: HeaderGroup[] = [
    { label: "", colSpan: 1 },
    { label: "", colSpan: 1 },
    { label: "ریالی", colSpan: 2 },
    { label: "آفر", colSpan: 1 },
    { label: "تامین", colSpan: producerList.producers.length },
    { label: "", colSpan: 1 },
  ];

  const dynamicHeadCells: HeadCell<RpProduct>[] = producerList.producers.map(
    (producer) => ({
      id: producer.id.toString(),
      label: producer.name,
      cellWidth: "10%",
      isNumber: true,
    })
  );

  const rotation = {
    id: "id" as keyof RpProduct,
    label: "گردش",
    icon: ReportIcon,
    hasDetails: true,
    cellWidth: "5%",
  };

  const allHeadCells = [...headCells, ...dynamicHeadCells, rotation];

  const { systemId, yearId } = useGeneralContext();

  const { setField: setBrandField } = useBrandStore();
  const { setField } = useProducerStore();

  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (error) {
      console.log(error);
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    setBrandField("accSystem", systemId);
    setBrandField("search", search);
  }, [search, systemId]);

  useEffect(() => {
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

  // Custom cell click handler for Table
  const handleCellClick = (cell: HeadCell<RpProduct>, item: RpProduct) => {
    if (cell.hasDetails && cell.id === "id" && onShowDetails) {
      onShowDetails(item.id.toString());
    }
  };

  return (
    <Paper className="p-2 m-2 w-full h-full">
      <ProviderProducerParams
        brand={brand}
        setBrand={setBrand}
        sanadKind={sanadKind}
        setSanadKind={setSanadKind}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setSearch={setSearch}
      />

      {isLoading ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : producerList.err !== 0 ? (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          {producerList.msg}
        </p>
      ) : producerList.rpProducts.length > 0 ? (
        <div className="h-screen-minus-200 mt-2">
          <Table
            data={producerList.rpProducts.map((product) => {
              // Create an object with dynamic keys for each producer's amnt
              const dynamicAmnts: Record<string, number> = {};
              product.rpProducers.forEach((producer) => {
                dynamicAmnts[producer.id.toString()] = producer.amnt || 0;
              });
              return {
                ...product,
                ...dynamicAmnts, // Spread dynamic amnt fields
              };
            })}
            headCells={allHeadCells}
            resetPageSignal={brand?.id}
            headerGroups={headerGroups}
            cellClickHandler={handleCellClick}
            hasSumRow={true}
          />
        </div>
      ) : (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          هیچ کالایی یافت نشد.
        </p>
      )}
    </Paper>
  );
}
