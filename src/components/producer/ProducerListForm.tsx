import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { useBrandStore } from "../../store/brandStore";
import Skeleton from "../layout/Skeleton";
import { useNavigate } from "react-router-dom";
import { Table } from "../controls/Table";
import { useGeneralContext } from "../../context/GeneralContext";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { convertPersianDate } from "../../utilities/general";
import ProviderProducerParams from "../provider/ProviderProducerParams";
import { useProducerList } from "../../hooks/useProducerList";
import { RpProduct } from "../../types/producer";
import { useProducerStore } from "../../store/producerStore";
import { blue } from "@mui/material/colors";
import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";

type ProducerListFormProps = {
  data: RpProduct[];
  headCells: HeadCell<RpProduct>[];
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

export default function ProviderListForm({
  data,
  headCells,
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

  const headerGroups: HeaderGroup[] = [
    { label: "", colSpan: 1 },
    { label: "", colSpan: 1 },
    { label: "ریالی", colSpan: 2 },
    { label: "آفر", colSpan: 1 },
    {
      label: "تامین",
      colSpan: producerList.producers.length,
      backgroundColor: blue[50],
    },
    { label: "", colSpan: 1 },
  ];

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

  const { height, width } = useCalculateTableHeight();

  return (
    <Paper className="p-2 m-2 w-full md:h-full">
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
          هیچ کالایی یافت نشد.
        </p>
      ) : producerList.rpProducts.length > 0 ? (
        <div className="mt-2 " style={width > 640 ? { height: height } : {}}>
          <Table
            data={data}
            headCells={headCells}
            headerGroups={headerGroups}
            cellClickHandler={handleCellClick}
            hasSumRow={true}
            cellFontSize="0.75rem"
            wordWrap={true}
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
