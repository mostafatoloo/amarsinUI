import InvoiceShow from "../invoice/InvoiceShow";
import WarehouseShow from "../warehouse/WarehouseShow";
import { WorkflowRowSelectResponse } from "../../types/workflow";
import InvoiceReceiptShow from "../invoiceReceipt/InvoiceReceiptShow";
import RegRecievedCheque from "../cheque/RegRecievedCheque";
import PaymentInvoiceShow from "../paymentInvoices/PaymentInvoiceShow";
import OrderRegShow from "../order/OrderRegShow";
import PayRequestShow from "../payRequest/PayRequestShow";
import ReceiptPurchaseShow from "../warehouseTemporarilyReceiptPurchase/ReceiptPurchaseShow";
import ProductGraceForWorkFlow from "../productGrace/ProductGraceForWorkFlow";
import ProductOfferForWorkFlow from "../productOffer/ProductOfferForWorkFlow";
import ProductPriceForWorkFlow from "../productPrice/ProductPriceForWorkFlow";
import ProductPermForWorkFlow from "../productPerm/ProductPermForWorkFlow";
import WarehouseTemporaryReceiptShow from "../preInvoiceReturn/WarehouseTemporaryReceiptShow";

type Props = {
  workFlowRowSelectResponse: WorkflowRowSelectResponse;
};

export default function WorkflowComponent({
  workFlowRowSelectResponse,
}: Props) {
  let componentToRender1: React.ReactNode | null = null;
  let componentToRender2: React.ReactNode | null = null;

  switch (workFlowRowSelectResponse.workTableForms.form1ViewPath) {
    case "Invoice/_Show":
    case "InvoiceBuy/_InvoiceBuy":
    case "Procurement/_Procurement":
      componentToRender1 = (
        <InvoiceShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          caption={"اقلام"}
        />
      );
      break;
    case "InvoiceReturn/_InvoiceReturn":
      componentToRender1 = (
        <InvoiceShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          caption={"اقلام مرجوعی"}
        />
      );
      break;
    case "WarehouseTemporaryReceipt/_WarehouseTemporaryReceiptIndent": //کارشناس خرید => ثبت اولیه رسید موقت
      componentToRender1 = (
        <WarehouseShow workFlowRowSelectResponse={workFlowRowSelectResponse} />
      );
      break;
    case "Indent/_CreateIndent": //کارشناس خرید => دریافت پیش فاکتور
      componentToRender1 = (
        <InvoiceReceiptShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Payment/_Cheque": //کمک حسابداری
      componentToRender1 = (
        <RegRecievedCheque
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Payment/_PaymentInvoices": //کارشناس بازرگانی=>تایید اطلاعات چک دریافتی
      componentToRender1 = (
        <PaymentInvoiceShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Order/_Order": //کارشناس بازرگانی -> ثبت اولیه - سفارش
      componentToRender1 = (
        <OrderRegShow workFlowRowSelectResponse={workFlowRowSelectResponse} />
      );
      break;
    case "WarehouseTemporaryReceipt/_WarehouseTemporaryReceiptPurchase": // کارشناس خرید -> تایید فاکتور خرید
      componentToRender1 = (
        <ReceiptPurchaseShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "ProductGrace/_ProductGrace": // ثبت فرجه
      componentToRender1 = (
        <ProductGraceForWorkFlow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "ProductOffer/_ProductOfferEdit": //ثیت آفر
    case "ProductOffer/_ProductOffer":
      componentToRender1 = (
        <ProductOfferForWorkFlow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "ProductPrice/_ProductPrice": //ثبت لیست قیمت
      componentToRender1 = (
        <ProductPriceForWorkFlow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "ProductPerm/_ProductPerm": //ثبت لیست نیاز به مجوز
      componentToRender1 = (
        <ProductPermForWorkFlow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "PreInvoiceReturn/_PreInvoiceReturnWareHouseTemporaryReceipt": //مدیر انبار / تایید و ارسال به انبار- پیش فاکتور مرجوعی
      componentToRender1 = (
        <WarehouseTemporaryReceiptShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "PayRequest/_PayRequest": //کارشناس خرید -> ثبت اولیه
      componentToRender1 = (
        <PayRequestShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          isNew={false}
          setIsNew={() => {}}
          setIsEdit={() => {}}
        />
      );
      break;
    default:
      componentToRender1 = null;
      break;
  }
  switch (workFlowRowSelectResponse.workTableForms.form2ViewPath) {
    case "Invoice/_Show":
    case "InvoiceBuy/_InvoiceBuy":
    case "Procurement/_Procurement":
      componentToRender2 = (
        <InvoiceShow //کارشناس خرید-> دریافت اصل فاکتور*****************
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          caption={"اقلام"}
        />
      );
      break;
    case "InvoiceReturn/_InvoiceReturn": //****************
      componentToRender2 = (
        <InvoiceShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          caption={"اقلام مرجوعی"}
        />
      );
      break;
    case "WarehouseTemporaryReceipt/_WarehouseTemporaryReceiptIndent": //کارشناس خرید => ثبت اولیه رسید موقت
      componentToRender2 = (
        <WarehouseShow workFlowRowSelectResponse={workFlowRowSelectResponse} />
      );
      break;
    case "Indent/_CreateIndent": //کارشناس خرید => دریافت پیش فاکتور
      componentToRender2 = (
        <InvoiceReceiptShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Payment/_Cheque": //کمک حسابداری***************
      componentToRender2 = (
        <RegRecievedCheque
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Payment/_PaymentInvoices": //کارشناس بازرگانی=>تایید اطلاعات چک دریافتی
      componentToRender2 = (
        <PaymentInvoiceShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "Order/_Order": //کارشناس بازرگانی -> ثبت اولیه - سفارش
      componentToRender2 = (
        <OrderRegShow workFlowRowSelectResponse={workFlowRowSelectResponse} />
      );
      break;
    case "WarehouseTemporaryReceipt/_WarehouseTemporaryReceiptPurchase": //کارشناس خرید -> تایید فاکتور خرید
      componentToRender2 = (
        <ReceiptPurchaseShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "ProductGrace/_ProductGrace": //ثبت فرجه***************
      componentToRender2 = (
        <ProductGraceForWorkFlow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "ProductOffer/_ProductOfferEdit": //ثیت آفر***************
    case "ProductOffer/_ProductOffer":
      componentToRender2 = (
        <ProductOfferForWorkFlow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "ProductPrice/_ProductPrice": //ثبت لیست قیمت***************
      componentToRender2 = (
        <ProductPriceForWorkFlow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "ProductPerm/_ProductPerm": //ثبت لیست نیاز به مجوز***************
      componentToRender2 = (
        <ProductPermForWorkFlow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "PreInvoiceReturn/_PreInvoiceReturnWareHouseTemporaryReceipt": //مدیر انبار / تایید و ارسال به انبار- پیش فاکتور مرجوعی
      componentToRender1 = (
        <WarehouseTemporaryReceiptShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
        />
      );
      break;
    case "PayRequest/_PayRequest": //کارشناس خرید -> ثبت اولیه
      componentToRender2 = (
        <PayRequestShow
          workFlowRowSelectResponse={workFlowRowSelectResponse}
          isNew={false}
          setIsNew={() => {}}
          setIsEdit={() => {}}
        />
      );
      break;
    default:
      componentToRender2 = null;
      break;
  }

  return (
    <div>
      {componentToRender1}
      {componentToRender2}
    </div>
  );
}
