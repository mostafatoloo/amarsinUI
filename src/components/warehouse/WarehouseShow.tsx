import WarehouseShowHeader from "./WarehouseShowHeader";
import WarehouseShowTable from "./WarehouseShowTable";

const WarehouseShow = () => {
  return (
    <div className="w-full flex flex-col">
      <WarehouseShowHeader />
      <p className="mt-2 px-2 text-sm">اقلام</p>
      <WarehouseShowTable />
    </div>
  );
};

export default WarehouseShow;
