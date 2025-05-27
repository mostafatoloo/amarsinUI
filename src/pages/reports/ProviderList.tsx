import PageTitle from "../../components/layout/PageTitle";
import ExcelExport from "../../utilities/ExcelExport";
import { useBrandStore } from "../../store/brandStore";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import { useProviderList } from "../../hooks/useProviderList";
import ProviderListForm, {
  headCells,
} from "../../components/provider/ProviderListForm";
import ProviderListDetails from "../../components/provider/ProviderListDetails";
import {  useParams } from "react-router-dom";
import ModalForm from "../../components/layout/ModalForm";

export default function ProviderList() {
  const { providerList } = useProviderList();
  const { setField } = useBrandStore();
  const { systemId } = useGeneralContext();
  const { id } = useParams();


  const [brand, setBrand] = useState<{ id: string; title: string } | null>({
    id: "0",
    title: "",
  });
  const [sanadKind, setSanadKind] = useState<{
    id: string;
    title: string;
  } | null>({
    id: "1",
    title: "فروش",
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setField("accSystem", systemId);
  }, []);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleShowDetails = (productId: string) => {
    setSelectedProductId(productId);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProductId(null);
  };
  const hasDetails = true;
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
      {/* {id ? (
        <header
          className={`w-full flex items-center justify-between border-gray-300 ${colors.cyan}`}
        >
          <span className="text-center text-white font-bold text-sm md:text-base w-full ">
            گردش
          </span>
        </header>
      ) : null} */}

      {/* Main content */}
      <main className="h-full flex flex-col items-center justify-center px-2">
        <ProviderListForm
          brand={brand}
          setBrand={setBrand}
          sanadKind={sanadKind}
          setSanadKind={setSanadKind}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onShowDetails={handleShowDetails}
        />
      </main>
      {hasDetails && (
        <ModalForm isOpen={detailsOpen} onClose={handleCloseDetails} title="جزئیات گردش">
          {selectedProductId && (
            <ProviderListDetails
              productId={selectedProductId}
              brand={brand}
              sanadKind={sanadKind}
              startDate={startDate}
              endDate={endDate}
            />
          )}
        </ModalForm>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 text-xs text-gray-500 px-4 py-1 flex justify-between"></footer>
    </div>
  );
}
