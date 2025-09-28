import { useEffect, useState } from "react";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import ProductOfferForm from "./ProductOfferForm";
import { useProductOffer } from "../../hooks/useProductOffer";
import { useProductOfferStore } from "../../store/productOfferStore";
import { ProductOffer } from "../../types/productOffer";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

const ProductOfferForWorkFlow = ({ workFlowRowSelectResponse }: Props) => {
  const {
    productOfferDtl,
    productOfferDtlData,
    addProductList,
    productOfferDtlHistory,
    isLoadingProductOfferDtlHistory,
    productOfferSave,
    isLoadingProductOfferSave,
  } = useProductOffer();

  const { setField } = useProductOfferStore();

  const [selectedProductOffer, setSelectedProductOffer] =
    useState<ProductOffer | null>(null);

  useEffect(() => {
    setField("id", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId]);

  useEffect(() => {
    workFlowRowSelectResponse.workTableRow.formId !== 0 &&
      setSelectedProductOffer(
        productOfferDtlData?.productOffers?.find(
          (item) => item.id === workFlowRowSelectResponse.workTableRow.formId
        ) || null
      );
  }, [
    workFlowRowSelectResponse.workTableRow.formId,
    productOfferDtlData?.productOffers,
  ]);

  return (
    <div className="w-full h-full py-2">
      <ProductOfferForm
        canEditForm1={workFlowRowSelectResponse.workTableForms.canEditForm1}
        addProductList={addProductList}
        productOfferDtlHistory={productOfferDtlHistory || []}
        isLoadingProductOfferDtlHistory={isLoadingProductOfferDtlHistory}
        productOfferSave={productOfferSave}
        isLoadingProductOfferSave={isLoadingProductOfferSave}
        selectedProductOffer={selectedProductOffer} //for check if selectedProductOffer.flwId===0 new else edit && sending selectedProductOffer.id in edit
        productOfferDtls={productOfferDtl}
        isNew={false} //for check if isNew new else edit
        setIsNew={() => false}
        setIsEdit={() => true}
        fromWorkFlow={true} //for going to editting in product offer form as default
      />
    </div>
  );
};

export default ProductOfferForWorkFlow;
