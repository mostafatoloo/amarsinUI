import PageTitle from "../../components/layout/PageTitle";
import ExcelExport from "../../utilities/ExcelExport";
import { useBrandStore } from "../../store/brandStore";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import { useProviderList } from "../../hooks/useProviderList";
import ProviderListForm, {
  headCells,
} from "../../components/inventory/providerListForm/ProviderListForm";
import ProviderListDetails from "../../components/inventory/providerListForm/ProviderListDetails";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../utilities/color";
import { ArrowBack } from "@mui/icons-material";

export default function ProviderList() {
  const { providerList } = useProviderList();
  const { setField } = useBrandStore();
  const { systemId } = useGeneralContext();
  const { id } = useParams();

  const navigate = useNavigate();

  const [brand, setBrand] = useState<{ id: string; title: string } | null>({
    id: "0",
    title: "",
  });
  const [sanadKind, setSanadKind] = useState<{
    id: string;
    title: string;
  } | null>({
    id: "1",
    title: "",
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setField("accSystem", systemId);
  }, []);

  const handleExitClick = () => {
    navigate(-1);
  };
  console.log(id, "id");

  return (
    <div
      className={`h-[calc(100vh-72px)] flex flex-col bg-gray-200  ${
        id ? "" : "pt-2"
      }`}
    >
      {/* Top header */}
      {!id ? (
        <header className="flex items-center justify-between border-gray-300">
          <PageTitle />
          <ExcelExport data={providerList.rpProviders} headCells={headCells} />
        </header>
      ) : null}
      {/* Sub-header */}
      {id ? (
        <header
          className={`w-full flex items-center justify-between border-gray-300 ${colors.cyan}`}
        >
          <span className="text-center text-white font-bold text-sm md:text-base w-full ">
            گردش
          </span>
          <button
            className="text-white px-4 py-2 rounded-md w-20"
            onClick={handleExitClick}
          >
            <ArrowBack />
            {/* <img src={ExitBtn} alt="exit" className="w-8 h-8" /> */}
          </button>
        </header>
      ) : null}

      {/* Main content */}
      <main className="flex flex-col items-center justify-center px-2">
        {id ? (
          <ProviderListDetails
            productId={id}
            brand={brand}
            sanadKind={sanadKind}
            startDate={startDate}
            endDate={endDate}
          />
        ) : (
          <ProviderListForm
            brand={brand}
            setBrand={setBrand}
            sanadKind={sanadKind}
            setSanadKind={setSanadKind}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 text-xs text-gray-500 px-4 py-1 flex justify-between"></footer>
    </div>
  );
}
