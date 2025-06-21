import {  useState } from "react";
import WarehouseShowHeader from "./WarehouseShowHeader";
import WarehouseShowTable from "./WarehouseShowTable";
import ModalForm from "../layout/ModalForm";
import ProductCatalogue from "./ProductCatalogue";
import { WarehouseTemporaryReceiptIndentDtl } from "../../types/warehouse";

const WarehouseShow = () => {
  
  const [statusClicked, setStatusClicked] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<WarehouseTemporaryReceiptIndentDtl | null>(null);
  const handleClose = () => {
    setStatusClicked(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full flex flex-col">
      <WarehouseShowHeader />
      <p className="mt-2 px-2 text-sm">اقلام</p>
      <WarehouseShowTable
        setStatusClicked={setStatusClicked}
        setSelectedProduct={setSelectedProduct}
      />
      <ModalForm
        isOpen={statusClicked}
        onClose={handleClose}
        title="کاتالوگ محصول"
        width="50%"
      >
        {selectedProduct && <ProductCatalogue dtl={selectedProduct}/>}
      </ModalForm>
    </div>
  );
};

export default WarehouseShow;
