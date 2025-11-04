import { useEffect, useState } from "react";
import { useWarehouse } from "../../hooks/useWarehouse";
import { useOrderStore } from "../../store/orderStore";
import { ResultDeliveryShow } from "../../types/delivery";
import { convertToFarsiDigits } from "../../utilities/general";
import AutoComplete from "../controls/AutoComplete";
import { FaCircle } from "react-icons/fa";
import { useTTacStore } from "../../store/ttacStore";
import { useTtac } from "../../hooks/useTtac";
import { colors } from "../../utilities/color";

type Props = {
  deliveryShowResponse: ResultDeliveryShow;
  canEditForm: boolean;
};

const DeliveryShowHeader = ({ deliveryShowResponse, canEditForm }: Props) => {
  const { warehouseSearchResponse } = useWarehouse();
  const { titacResponse } = useTtac();
  const { setField: setTTacField } = useTTacStore();
  const { setField: setWarehouseField } = useOrderStore();
  const [warehouseSearch, setWarehouseSearch] = useState<string>("");
  const [ttacTextColor, setTtacTextColor] = useState<string>("");
  const [isTitacClick, setIsTitacClick] = useState<boolean>(false);

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
    console.log(warehouseSearch);
    setIsTitacClick(false);
    switch (
      deliveryShowResponse.deliveryMst &&
      deliveryShowResponse.deliveryMst?.status
    ) {
      case 0:
        setTtacTextColor(colors.blue500);
        break;
      case 1:
        setTtacTextColor(colors.green700);
        break;
      case -1:
        setTtacTextColor(colors.gray_500);
        break;
      default:
        setTtacTextColor(colors.red500);
        break;
    }
  }, [deliveryShowResponse]);

  useEffect(() => {
    switch (
      titacResponse.data.result &&
      titacResponse.data.result?.status
    ) {
      case 0:
        setTtacTextColor(colors.blue500);
        break;
      case 1:
        setTtacTextColor(colors.green700);
        break;
      case -1:
        setTtacTextColor(colors.gray_500);
        break;
      default:
        setTtacTextColor(colors.red500);
        break;
    }
  }, [titacResponse]);
  //for /api/TTAC/Titac?Id=1123156
  const ttacClick = () => {
    setIsTitacClick(true);
    setTTacField("ttacRequestId", deliveryShowResponse.deliveryMst.id);
  };
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
        <div className="flex items-center justify-right w-24" onClick={ttacClick}>
          <label className="p-1 w-full text-left cursor-pointer hover:font-bold hover:underline">
            تیتک:
          </label>
          <div>
            <FaCircle style={{color:ttacTextColor}} size={10} />
          </div>
        </div>
        <input
          type="text"
          disabled={!canEditForm}
          value={
            isTitacClick
              ? convertToFarsiDigits(titacResponse.data.result.msg)
              : convertToFarsiDigits(deliveryShowResponse.deliveryMst.msg)
          }
          className={`text-sm text-gray-400 w-full p-1 border border-gray-300 rounded-md bg-transparent`}
          style={{color:ttacTextColor}}
        />
      </div>
    </div>
  );
};

export default DeliveryShowHeader;
