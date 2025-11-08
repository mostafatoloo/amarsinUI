import { useEffect, useState } from "react";
import { useProductPrice } from "../../hooks/useProductPrice";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import { ProductPrice } from "../../types/productPrice";
import { useProductPriceStore } from "../../store/productPriceStore";
import ProductPriceForm from "./ProductPriceForm";
import { useGeneralContext } from "../../context/GeneralContext";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

const ProductPriceForWorkFlow = ({ workFlowRowSelectResponse }: Props) => {
  const {
    productPriceDtl,
    productPriceDtlData,
    addProductList,
    productPriceDtlHistory,
    isLoadingDtlHistory,
    productPriceSave,
    isLoadingProductPriceSave,
  } = useProductPrice();

  const { setField } = useProductPriceStore();
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedProductPrice, setSelectedProductPrice] =
  useState<ProductPrice | null>(null);
  
  const {yearId, systemId  }=useGeneralContext()
  useEffect(() => {
    setField("yearId", yearId);
    setField("systemId",systemId );
    setField("id", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId, yearId,systemId]);

  useEffect(() => {
    console.log(productPriceDtlData);
    console.log(
      productPriceDtlData?.productPrices?.find(
        (item) => item.id === workFlowRowSelectResponse.workTableRow.formId
      ) || null
    );
    if (workFlowRowSelectResponse.workTableRow.formId !== 0) {      
      setSelectedProductPrice(
        productPriceDtlData?.productPrices?.find(
          (item) => item.id === workFlowRowSelectResponse.workTableRow.formId
        ) || null
      );
      setSelectedId(workFlowRowSelectResponse.workTableRow.formId);
    }
  }, [
    workFlowRowSelectResponse.workTableRow.formId,
    productPriceDtlData?.productPrices,
  ]);

  return (
    <div className="w-full h-full py-2">
      <ProductPriceForm
        canEditForm1={workFlowRowSelectResponse.workTableForms.canEditForm1}
        addProductList={addProductList}
        productPriceDtlHistory={productPriceDtlHistory || []}
        isLoadingDtlHistory={isLoadingDtlHistory}
        productPriceSave={productPriceSave}
        isLoadingProductPriceSave={isLoadingProductPriceSave}
        selectedProductPrice={selectedProductPrice} //for check if selectedProductPrice.flwId===0 new else edit && sending selectedProductPrice.id in edit
        productPriceDtls={productPriceDtl}
        isNew={false} //for check if isNew new else edit
        isEdit={true}
        setIsNew={() => false}
        setIsEdit={() => true}
        fromWorkFlow={true} //for going to editting in product grace form as default
        selectedId={selectedId}
      />
    </div>
  );
};

export default ProductPriceForWorkFlow;
