import { useEffect, useState } from "react";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import ProductPermForm from "./ProductPermForm";
import { useProductPerm } from "../../hooks/useProductPerm";
import { useProductPermStore } from "../../store/productPermStore";
import { ProductPerm } from "../../types/productPerm";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

const ProductPermForWorkFlow = ({ workFlowRowSelectResponse }: Props) => {
  const {
    productPermDtl,
    productPermDtlData,
    addProductList,
    productPermDtlHistory,
    isLoadingDtlHistory,
    productPermSave,
    isLoadingProductPermSave,
  } = useProductPerm();

  const { setField } = useProductPermStore();

  const [selectedProductPerm, setSelectedProductPerm] =
    useState<ProductPerm | null>(null);

  useEffect(() => {
    setField("id", workFlowRowSelectResponse.workTableRow.formId);
  }, [workFlowRowSelectResponse.workTableRow.formId]);

  useEffect(() => {
    workFlowRowSelectResponse.workTableRow.formId !== 0 &&
      setSelectedProductPerm(
        productPermDtlData?.productPerms?.find(
          (item) => item.id === workFlowRowSelectResponse.workTableRow.formId
        ) || null
      );
  }, [
    workFlowRowSelectResponse.workTableRow.formId,
    productPermDtlData?.productPerms,
  ]);

  return (
    <div className="w-full h-full py-2">
      <ProductPermForm
        canEditForm1={workFlowRowSelectResponse.workTableForms.canEditForm1}
        addProductList={addProductList}
        productPermDtlHistory={productPermDtlHistory || []}
        isLoadingDtlHistory={isLoadingDtlHistory}
        productPermSave={productPermSave}
        isLoadingProductPermSave={isLoadingProductPermSave}
        selectedProductPerm={selectedProductPerm} //for check if selectedProductPerm.flwId===0 new else edit && sending selectedProductPerm.id in edit
        productPermDtls={productPermDtl}
        isNew={false} //for check if isNew new else edit
        setIsNew={() => false}
        setIsEdit={() => true}
        fromWorkFlow={true} //for going to editting in product grace form as default
      />
    </div>
  );
};

export default ProductPermForWorkFlow;
