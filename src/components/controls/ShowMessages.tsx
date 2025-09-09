import { HeadCell } from "../../hooks/useTable";
import { Table } from "./Table";
import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";
import { colors } from "../../utilities/color";

type Props = {
  dtlErrMsgs: any;
  color: string;
  heightWindow?: number;
};
type Message = { index: number; dsc: string };
function ShowMessages({ dtlErrMsgs, color, heightWindow }: Props) {
  //const { regResponse } = useWarehouseStore();
  const headCells: HeadCell<Message>[] = [
    {
      id: "index",
      label: "ردیف",
      disableSorting: true,
      cellWidth: "5%",
      isNumber: true,
      changeColor: true,
    },
    {
      id: "dsc",
      label: "شرح",
      disableSorting: true,
      cellWidth: "95%",
      isNumber: true,
      changeColor: true,
    },
    {
      id: "err",
      label: "وضعیت",
      disableSorting: true,
      cellWidth: "5%",
      isNumber: true,
      changeColor: true,
      isNotVisible: true,
    },
  ];
  const handleCellColorChange = (cell: HeadCell<Message>, item: any) => {
    let rowColor = "";
    if (cell.changeColor) {
      if (item.err === 1) {
        rowColor = colors.red100;
      } else if (item.err === 0) {
        rowColor = colors.yellow100;
      } else {
        rowColor = color;
      }
    }
    return rowColor;
  };
  const { height, width } = useCalculateTableHeight();
  const data = dtlErrMsgs?.map((dtlErrMsg: any, index: number) => ({
    index: index + 1,
    dsc: dtlErrMsg.msg,
    err: dtlErrMsg.err,
  }));
  return (
    <div
      className="mt-2"
      style={width > 640 ? { height: heightWindow ?? height } : {}}
    >
      <Table
        data={data}
        headCells={headCells}
        wordWrap={true}
        cellColorChangeHandler={handleCellColorChange}
        cellFontSize="0.75rem"
      />
    </div>
  );
}

export default ShowMessages;
