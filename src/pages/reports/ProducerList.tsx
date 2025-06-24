import PageTitle from "../../components/layout/PageTitle";
import ExcelExport from "../../utilities/ExcelExport";
import { useBrandStore } from "../../store/brandStore";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import ReportIcon from "../../assets/images/GrayThem/report16.png";
import {  useParams } from "react-router-dom";
import { useProducerList } from "../../hooks/useProducerList";
import ProducerListForm from "../../components/producer/ProducerListForm";
import { HeadCell } from "../../hooks/useTable";
import { RpProduct } from "../../types/producer";
import { blue } from '@mui/material/colors';


export const headCells: HeadCell<RpProduct>[] = [
  {
    id: "index",
    label: "ردیف",
    disableSorting: true,
    cellWidth: "5%",
  },
  { id: "name", label: "نام کالا", cellWidth: "30%" },
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

export default function ProducerList() {
  const { producerList } = useProducerList();
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
    id: "2",
    title: "فروش",
  });

  
  const dynamicHeadCells: HeadCell<RpProduct>[] = producerList.producers.map(
    (producer) => ({
      id: producer.id.toString(),
      label: producer.name,
      cellWidth: producer.name.length>10 ? "15%" : "5%",
      isNumber: true,
      backgroundColor: blue[50],
    })
  );

  const rotation = {
    id: "id" as keyof RpProduct,
    label: "گردش",
    icon: ReportIcon,
    hasDetails: true,
    cellWidth: "5%",
    disableSorting: true,
  };

  const allHeadCells = [...headCells, ...dynamicHeadCells, rotation];

  const rpProducts= producerList.rpProducts.map((product) => {
    // Create an object with dynamic keys for each producer's amnt
    const dynamicAmnts: Record<string, number> = {};
    product.rpProducers.forEach((producer) => {
      dynamicAmnts[producer.id.toString()] = producer.amnt || 0;
    });
    return {
      ...product,
      ...dynamicAmnts, // Spread dynamic amnt fields
    };
  })
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setField("accSystem", systemId);
  }, []);

  return (
    <div
      className={`md:h-[calc(100vh-72px)] flex flex-col bg-gray-200 pt-2`}
    >
      {/* Top header */}
      {!id ? (
        <header className="flex items-center justify-between border-gray-300">
          <PageTitle />
          <ExcelExport data={rpProducts} headCells={allHeadCells} />
        </header>
      ) : null}

      {/* Main content */}
      <main className="flex flex-col items-center justify-center px-2">
        <ProducerListForm
          data={rpProducts}
          headCells={allHeadCells}
          brand={brand}
          setBrand={setBrand}
          sanadKind={sanadKind}
          setSanadKind={setSanadKind}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          //onShowDetails={handleShowDetails}
        />
      </main>
      {/*
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
      )}*/}

      {/* Footer */}
      
    </div>
  );
}
