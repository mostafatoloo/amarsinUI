import { useBrand } from "../../hooks/useBrands";
import AutoComplete from "../controls/AutoComplete";
import Input from "../controls/Input";
import { DefaultOptionTypeStringId } from "../../types/general";

type Props = {
    brand: DefaultOptionTypeStringId[] | null,
    setBrand: (brand: DefaultOptionTypeStringId[]) => void,
    setBrandSearch: React.Dispatch<React.SetStateAction<string>>,
};

const ProductOfferFormParams = ({brand, setBrand, setBrandSearch}: Props) => {
    const { brands } = useBrand();    
  return (
    <form className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 w-1/2">
        <div className="w-full">
          <Input
            name="dat"
            label="تاریخ:"
            variant="outlined"
            widthDiv="w-full"
            widthLabel="w-32"
            widthInput="w-full-minus-32"
            disabled
          />
        </div>
        <div className="w-full">
          <Input
            name="tim"
            label="ساعت:"
            variant="outlined"
            widthDiv="w-full"
            widthLabel="w-32"
            widthInput="w-full-minus-32"
            disabled
          />
        </div>
      </div>
      <div className="w-full">
        <Input
          name="dsc"
          label="توضیحات:"
          variant="outlined"
          widthDiv="w-full"
          widthLabel="w-24"
          widthInput="w-full-minus-24"
        />
      </div>
      <div className="flex gap-2 items-center">
        <label className="text-lg font-bold">شرایط</label>
        <hr className="w-full border-2 border-gray-300" />
      </div>
      <div className="w-full flex items-center">
        <label className="p-1 w-24 text-left">برند:</label>
        <div className="bg-slate-50 flex w-full">
          <AutoComplete
            options={brands.map((b) => ({
              id: b.id,
              title: b.text,
            }))}
            value={brand}
            handleChange={(_event, newValue) => {
              return setBrand(newValue as DefaultOptionTypeStringId[]);
            }}
            multiple={true}
            setSearch={setBrandSearch}
            showLabel={false}
            outlinedInputPadding="10px"
            placeholder={
              Array.isArray(brand) && brand.length > 0
                ? undefined
                : "برند را انتخاب کنید..."
            }
          />
        </div>
      </div>
    </form>
  );
};

export default ProductOfferFormParams;
