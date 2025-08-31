import { TableColumns } from "../../types/general";

type Props = {
  columns: TableColumns;
  sortId: number;
  sortDate: number;
  sortTime: number;
  sortDsc: number;
  sortAccepted: number;
  sortUsrName: number;
  sortStep: number;
  setSortId: (sortId: number) => void;
  setSortDate: (sortDate: number) => void;
  setSortTime: (sortTime: number) => void;
  setSortDsc: (sortDsc: number) => void;
  setSortAccepted: (sortAccepted: number) => void;
  setSortUsrName: (sortUsrName: number) => void;
  setSortStep: (sortStep: number) => void;
};

const ProductOfferHeader = ({
  columns,
  sortId,
  sortDate,
  sortTime,
  sortDsc,
  sortAccepted,
  sortUsrName,
  sortStep,
  setSortId,
  setSortDate,
  setSortTime,
  setSortDsc,
  setSortAccepted,
  setSortUsrName,
  setSortStep,
}: Props) => {
  const setSort = (
    setHeaderList: ((sort: number) => void)[],
    sortColumn: number,
    setSortColumn: (sort: number) => void
  ) => {
    setHeaderList.forEach((setHeader) => {
      setHeader(0);
    });
    if (sortColumn === 1) setSortColumn(-1);
    else setSortColumn(1);
  };
  return (
    <div className="flex text-xs font-bold text-gray-500 w-full h-6">
      {columns.map((column: any) => (
        <div
          className="flex bg-gray-200 border border-gray-300 text-center items-center justify-center border-r last:border-l cursor-pointer"
          key={column.id}
          style={{ width: column.width }}
          onClick={() => {
            if (column.accessor === "id") {
              setSort(
                [
                  setSortDate,
                  setSortTime,
                  setSortDsc,
                  setSortAccepted,
                  setSortUsrName,
                  setSortStep,
                ],
                sortId,
                setSortId
              );
            } else if (column.accessor === "dat") {
              setSort(
                [
                  setSortId,
                  setSortTime,
                  setSortDsc,
                  setSortAccepted,
                  setSortUsrName,
                  setSortStep,
                ],
                sortDate,
                setSortDate
              );
            } else if (column.accessor === "tim") {
              setSort(
                [
                  setSortId,
                  setSortDate,
                  setSortDsc,
                  setSortAccepted,
                  setSortUsrName,
                  setSortStep,
                ],
                sortTime,
                setSortTime
              );
            } else if (column.accessor === "dsc") {
              setSort(
                [
                  setSortId,
                  setSortDate,
                  setSortTime,
                  setSortAccepted,
                  setSortUsrName,
                  setSortStep,
                ],
                sortDsc,
                setSortDsc
              );
            } else if (column.accessor === "accepted") {
              setSort(
                [
                  setSortId,
                  setSortDate,
                  setSortTime,
                  setSortDsc,
                  setSortUsrName,
                  setSortStep,
                ],
                sortAccepted,
                setSortAccepted
              );
            } else if (column.accessor === "usrName") {
              setSort(
                [
                  setSortId,
                  setSortDate,
                  setSortTime,
                  setSortDsc,
                  setSortAccepted,
                  setSortStep,
                ],
                sortUsrName,
                setSortUsrName
              );
            } else if (column.accessor === "flowMapName") {
              setSort(
                [
                  setSortId,
                  setSortDate,
                  setSortTime,
                  setSortDsc,
                  setSortAccepted,
                  setSortUsrName,
                ],
                sortStep,
                setSortStep
              );
            }
          }}
        >
          {column.Header}
        </div>
      ))}
    </div>
  );
};

export default ProductOfferHeader;
