import PageTitle from "../../layout/PageTitle";
import Add32 from "../../../assets/images/GrayThem/add32.png";
import Refresh32 from "../../../assets/images/GrayThem/rfrsh32.png";
import Del24 from "../../../assets/images/GrayThem/del24.png";
import Edit24 from "../../../assets/images/GrayThem/edit24.png";
import { DefinitionInvironment } from "../../../types/definitionInvironment";

type Props = {
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  handleEdit: () => void;
  refetch: () => void;
  definitionInvironment: DefinitionInvironment;
};

const WorkflowMapHeader = ({
  setIsNew,
  handleDelete,
  handleEdit,
  refetch,
  definitionInvironment,
}: Props) => {
  return (
    <header className="flex flex-col gap-2 md:flex-row items-center justify-between border-gray-300 border-b pb-2">
      <PageTitle definitionInvironment={definitionInvironment} />
      <div className="flex px-4 items-center gap-4">
        <div
          className="flex flex-col items-center cursor-pointer hover:font-bold hover:bg-gray-300 rounded-md p-1"
          onClick={() => {
            console.log("new");
            setIsNew(true);
          }} // for new
        >
          <img src={Add32} alt="Add32" className="w-6 h-6" />
          <p className="text-xs">جدید</p>
        </div>
        <div
          className={`flex flex-col items-center hover:font-bold hover:bg-gray-300 rounded-md p-1 cursor-pointer
          }`}
          onClick={() => handleDelete()}
        >
          <img src={Del24} alt="Del24" className="w-6 h-6" />
          <p className="text-xs">حذف</p>
        </div>
        <div
          className={`flex flex-col items-center hover:font-bold hover:bg-gray-300 rounded-md p-1 cursor-pointer`}
          onClick={() => handleEdit()} // for edit
        >
          <img
            src={
              Edit24
            }
            alt="Edit24"
            className="w-6 h-6"
          />
          <p className="text-xs">ویرایش</p>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer hover:font-bold hover:bg-gray-300 rounded-md p-1"
          onClick={() => refetch()}
        >
          <img src={Refresh32} alt="Refresh32" className="w-6 h-6" />
          <p className="text-xs">بازخوانی</p>
        </div>
      </div>
    </header>
  );
};

export default WorkflowMapHeader;
