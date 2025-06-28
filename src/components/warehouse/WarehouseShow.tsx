import { useEffect, useState } from "react";
import WarehouseShowHeader from "./WarehouseShowHeader";
import WarehouseShowTable from "./WarehouseShowTable";
import ModalForm from "../layout/ModalForm";
import ProductCatalogue from "./ProductCatalogue";
import { WarehouseTemporaryReceiptIndentDtl } from "../../types/warehouse";
import WarehouseIndentTable from "./WarehouseIndentTable";
import { useGeneralContext } from "../../context/GeneralContext";
import ModalMessage from "../layout/ModalMessage";
import { useWarehouseStore } from "../../store/warehouseStore";
import WarehouseMessages from "./WarehouseMessages";

const WarehouseShow = () => {
  const [isModalOpenReg, setIsModalOpenReg] = useState(false);
  const [statusClicked, setStatusClicked] = useState(false);
  const [confirmHasError, setConfirmHasError] = useState(false);
  const { selectIndentsResponse, regResponse } = useWarehouseStore();
  const [editClicked, setEditClicked] = useState(false);
  const [iocId, setIocId] = useState(0);
  const [selectedProduct, setSelectedProduct] =
    useState<WarehouseTemporaryReceiptIndentDtl | null>(null);

  const handleProductCatalogueClose = () => {
    setStatusClicked(false);
    setSelectedProduct(null);
  };
  const handleWarehouseIndentListClose = () => {
    setEditClicked(false);
    setIocId(0);
  };
  const handleWarehouseMessagesClose = () => {
    setConfirmHasError(false);
  };

  const { isModalOpen, setIsModalOpen } = useGeneralContext();
  useEffect(() => {
    let timeoutId: number;
    if (isModalOpen || isModalOpenReg) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
        setIsModalOpenReg(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen, isModalOpenReg]);

  return (
    <div className="w-full flex flex-col">
      <WarehouseShowHeader />
      <p className="mt-2 px-2 text-sm">اقلام</p>
      <WarehouseShowTable
        setEditClicked={setEditClicked}
        setStatusClicked={setStatusClicked}
        setSelectedProduct={setSelectedProduct}
        setIocId={setIocId}
        setIsModalOpenReg={setIsModalOpenReg}
        setConfirmHasError={setConfirmHasError}
      />
      {/*open product catalog if status is clicked*/}
      <ModalForm
        isOpen={statusClicked}
        onClose={handleProductCatalogueClose}
        title="کاتالوگ محصول"
        width="1/2"
      >
        {selectedProduct && <ProductCatalogue dtl={selectedProduct} />}
      </ModalForm>
      {/*open product catalog if status is clicked*/}
      <ModalForm
        isOpen={editClicked}
        onClose={handleWarehouseIndentListClose}
        title="لیست درخواستها"
        width="2/3"
      >
        <WarehouseIndentTable
          iocId={iocId}
          handleWarehouseIndentListClose={handleWarehouseIndentListClose}
        />
      </ModalForm>

      {/*open WarehouseMessages if تایید is clicked with errors*/}
      <ModalForm
        isOpen={confirmHasError}
        onClose={handleWarehouseMessagesClose}
        title="پیام ها"
        width="2/3"
      >
        <WarehouseMessages />
      </ModalForm>

      <ModalMessage
        isOpen={isModalOpen}
        backgroundColor="bg-red-200"
        bgColorButton="bg-red-500"
        bgColorButtonHover="bg-red-600"
        color="text-white"
        onClose={() => setIsModalOpen(false)}
        message={selectIndentsResponse.meta.message}
        visibleButton={false}
      />
      <ModalMessage
        isOpen={isModalOpenReg}
        backgroundColor="bg-green-200"
        bgColorButton="bg-green-500"
        bgColorButtonHover="bg-green-600"
        color="text-white"
        onClose={() => setIsModalOpenReg(false)}
        message={regResponse.meta.message}
        visibleButton={false}
      />
    </div>
  );
};

export default WarehouseShow;
