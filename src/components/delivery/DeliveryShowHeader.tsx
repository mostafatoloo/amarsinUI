import { useEffect, useState } from "react";
import { useWarehouse } from "../../hooks/useWarehouse";
import { useOrderStore } from "../../store/orderStore";
import { ResultDeliveryShow } from "../../types/delivery";
import { convertToFarsiDigits } from "../../utilities/general";
import AutoComplete from "../controls/AutoComplete";
import { FaCircle } from "react-icons/fa";

type Props = {
  deliveryShowResponse: ResultDeliveryShow;
  canEditForm: boolean;
};

const DeliveryShowHeader = ({ deliveryShowResponse, canEditForm }: Props) => {
  const { warehouseSearchResponse } = useWarehouse();
  const { setField: setWarehouseField } = useOrderStore();
  const [warehouseSearch, setWarehouseSearch] = useState<string>("");
  const [ttacTextColor, setTtacTextColor] = useState<string>("");

  useEffect(() => {
    //console.log(convertToLatinDigits(warehouseSearch),"warehouseSearch");
    setWarehouseField("search", "ا");
    setWarehouseField("page", 1);
    setWarehouseField("pageSize", 30);
    setWarehouseField("lastId", 0);
    setWarehouseField("CustomerTypeId", -1);
    setWarehouseField("PartKey", 0);
  }, []);

  useEffect(() => {
    console.log(warehouseSearch)
    switch (
      deliveryShowResponse.deliveryMst &&
      deliveryShowResponse.deliveryMst?.status
    ) {
      case 0:
        setTtacTextColor("text-blue-600");
        break;
      case 1:
        setTtacTextColor("text-green-700");
        break;
      case -1:
        setTtacTextColor("text-gray-500");
        break;
      default:
        setTtacTextColor("text-red-700");
        break;
    }
  }, [deliveryShowResponse]);
  return (
    <div className="mt-2 text-sm w-full flex flex-col gap-2 border border-gray-400 rounded-md p-2">
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="w-1/3 flex">
          <label className="p-1 w-24 text-left">شناسه - کد:</label>
          <input
            type="text"
            value={convertToFarsiDigits(deliveryShowResponse.deliveryMst.code)}
            disabled
            className="text-xs md:text-sm w-full p-1 text-gray-400 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-1/3 flex">
          <label className="p-1 w-24 text-left">تاریخ:</label>
          <input
            type="text"
            value={convertToFarsiDigits(
              `${deliveryShowResponse.deliveryMst.dat} - ${deliveryShowResponse.deliveryMst.tim}`
            )}
            disabled
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-1/3 flex">
          <div className="flex items-center justify-between w-full">
            <label className="p-1 w-24 text-left">انبار:</label>
            <AutoComplete
              disabled={!canEditForm}
              options={warehouseSearchResponse.data.result.searchResults.map(
                (b) => ({
                  id: b.id,
                  title: b.text,
                })
              )}
              value={{
                id: deliveryShowResponse.wId,
                title: convertToFarsiDigits(deliveryShowResponse.wName),
              }}
              handleChange={(_event, newValue) => {
                console.log(newValue);
              }}
              setSearch={setWarehouseSearch}
              showLabel={false}
              outlinedInputPadding="10px"
              backgroundColor={"transparent"}
              showClearIcon={false}
              inputPadding="0 !important"
              desktopfontsize="12px"
              placeholder="انبار را انتخاب کنید..."
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="w-2/3 flex">
          <label className="p-1 w-24 text-left">خریدار :</label>
          <input
            type="text"
            value={deliveryShowResponse.deliveryMst.srName}
            disabled
            className="text-xs md:text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-1/3 flex">
          <label className="p-1 w-24 text-left">GLN:</label>
          <input
            type="text"
            value={convertToFarsiDigits(deliveryShowResponse.deliveryMst.gln)}
            disabled
            className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="flex">
        <label className="p-1 w-24 text-left">توضیحات:</label>
        <input
          type="text"
          value={convertToFarsiDigits(deliveryShowResponse.deliveryMst.exp)}
          disabled
          className="text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-right w-24">
          <label className="p-1 w-full text-left">تیتک:</label>
          <div>
            <FaCircle className={ttacTextColor} size={10} />
          </div>
        </div>
        <input
          type="text"
          disabled={!canEditForm}
          value={convertToFarsiDigits(deliveryShowResponse.deliveryMst.msg)}
          className={`text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md bg-transparent ${ttacTextColor}`}
        />
      </div>
    </div>
  );
};

export default DeliveryShowHeader;
