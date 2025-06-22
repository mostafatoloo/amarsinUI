import {  useState } from "react";
import WarehouseShowHeader from "./WarehouseShowHeader";
import WarehouseShowTable from "./WarehouseShowTable";
import ModalForm from "../layout/ModalForm";
import ProductCatalogue from "./ProductCatalogue";
import { WarehouseTemporaryReceiptIndentDtl } from "../../types/warehouse";
import WarehouseIndentTable from "./WarehouseIndentTable";

const WarehouseShow = () => {
  const [statusClicked, setStatusClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<WarehouseTemporaryReceiptIndentDtl | null>(null);

  const handleProductCatalogueClose = () => {
    setStatusClicked(false);
    setSelectedProduct(null);
  };
  const handleWarehouseIndentListClose = () => {
    setEditClicked(false);
  };

  return (
    <div className="w-full flex flex-col">
      <WarehouseShowHeader />
      <p className="mt-2 px-2 text-sm">اقلام</p>
      <WarehouseShowTable
        setEditClicked={setEditClicked}
        setStatusClicked={setStatusClicked}
        setSelectedProduct={setSelectedProduct}
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
        <WarehouseIndentTable />
      </ModalForm>
    </div>
  );
};

export default WarehouseShow;
