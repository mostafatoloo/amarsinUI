import InvoiceShowHeader from "./InvoiceShowHeader";
import InvoiceShowTable from "./InvoiceShowTable";

const InvoiceShow = () => {
  return (
    <div className="w-full flex flex-col">
      <InvoiceShowHeader />
      <p className="mt-2 px-2 text-sm">اقلام</p>
      <InvoiceShowTable />
    </div>
  );
};

export default InvoiceShow;
