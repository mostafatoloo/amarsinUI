import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { useBrandStore } from "../../store/brandStore";
import Skeleton from "../layout/Skeleton";
import { useNavigate } from "react-router-dom";
import { Table } from "../controls/Table";
import { useGeneralContext } from "../../context/GeneralContext";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { useProviderList } from "../../hooks/useProviderList";
import { ProviderItem } from "../../types/provider";
import { useProviderStore } from "../../store/providerStore";
import { convertPersianDate } from "../../utilities/general";
import ReportIcon from "../../assets/images/GrayThem/report16.png";
import ProviderProducerParams from "./ProviderProducerParams";
import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";

type ProviderListFormProps = {
  brand: { id: string; title: string } | null;
  setBrand: (brand: { id: string; title: string } | null) => void;
  sanadKind: { id: string; title: string } | null;
  setSanadKind: (sanadKind: { id: string; title: string } | null) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  onShowDetails: (providerId: string) => void;
};

export const headCells: HeadCell<ProviderItem>[] = [
  {
    id: "index",
    label: "ردیف",
    disableSorting: true,
    cellWidth: "10%",
  },
  { id: "name", label: "نام کالا", cellWidth: "55%" },
  { id: "cnt", label: "تعداد", isNumber: true, cellWidth: "10%" },
  {
    id: "total",
    label: "مبلغ",
    isNumber: true,
    isCurrency: true,
    cellWidth: "10%",
  },
  { id: "offerCnt", label: "تعداد", isNumber: true, cellWidth: "10%" },
  {
    id: "id",
    label: "گردش",
    icon: ReportIcon,
    hasDetails: true,
    cellWidth: "5%",
  },
];

const headerGroups: HeaderGroup[] = [
  { label: "", colSpan: 1 },
  { label: "", colSpan: 1 },
  { label: "ریالی", colSpan: 2 },
  { label: "آفر", colSpan: 1 },
  { label: "", colSpan: 1 },
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
}: ProviderListFormProps) {
  const { providerList, error, isLoading } = useProviderList();

  const { systemId, yearId } = useGeneralContext();

  const { setField: setBrandField } = useBrandStore();
  const { setField } = useProviderStore();

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
  const handleCellClick = (
    cell: HeadCell<ProviderItem>,
    item: ProviderItem
  ) => {
    if (cell.hasDetails && cell.id === "id" && onShowDetails) {
      onShowDetails(item.id.toString());
    } else if (cell.path) {
      navigate(`${cell.path}/${item[cell.id as keyof ProviderItem]}`);
    }
  };

  const {height,width}=useCalculateTableHeight()


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
      ) : providerList.err !== 0 ? (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          {providerList.msg}
        </p>
      ) : (
        <div className="mt-2"  style={width>640 ? { height:height } : {}}>
          {/* remove h-screen-minus-300 */}
          <Table
            data={providerList.rpProviders}
            headCells={headCells}
            headerGroups={headerGroups}
            // Pass custom cell click handler
            cellClickHandler={handleCellClick}
            hasSumRow={true}
            wordWrap={true}
          />
        </div>
      )}
    </Paper>
  );
}
