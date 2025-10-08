import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";
import { colors } from "../../utilities/color";
import { Column } from "../../types/general";
import TTable from "./TTable";

type Props = {
  dtlErrMsgs: any;
  color: string;
  heightWindow?: number;
};
function ShowMessages({ dtlErrMsgs, color, heightWindow }: Props) {
  const columns:Column[] =[
    {
      Header: "ردیف",
      accessor: "index",
      width: "5%",
    },
    {
      Header: "شرح",
      accessor: "dsc",
      width: "95%",
    },
    {
      Header: "وضعیت",
      accessor: "err",
      width: "5%",
      visible: false,
    },
  ];
  const handleCellColorChange = (row: any): string | null => {
    let rowColor=""
    if (row.original.err===1)
      rowColor = colors.red100;
    else if (row.original.err===0)
      rowColor = colors.yellow100;
    else
      rowColor = color;
    return rowColor;
  };
///////////////////////////////////////////////////////////////
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
      <TTable
        data={data}
        columns={columns}
        wordWrap={true}
        CellColorChange={handleCellColorChange}
      />
    </div>
  );
}

export default ShowMessages;
