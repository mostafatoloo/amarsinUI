import { useState } from "react";
import Skeleton from "../layout/Skeleton";
import useCalculateTableHeight from "../../hooks/useCalculateTableHeight";
import TTable from "../controls/TTable";
import { TableColumns } from "../../types/general";
import { TablePaginationActions } from "../controls/TablePaginationActions";

type Props = {
  isLoading: boolean;
  columns: TableColumns;
  data: any[];
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalCount: number;
};

const CupboardsReportShowTable = ({
  isLoading,
  columns,
  data,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  totalCount,
}: Props) => {
  const { width, height } = useCalculateTableHeight();
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  return (
    <div className="px-2 h-full">
      {isLoading ? (
        <Skeleton />
      ) : (
        <div
          className="mt-2 overflow-y-auto"
          style={width > 640 ? { height: height - 50 } : { height: "fit" }}
        >
          <TTable
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            columns={columns}
            data={data}
            fontSize="0.75rem"
            changeRowSelectColor={true}
          />
          <div className="w-full bg-white rounded-md">
            <TablePaginationActions
              setSelectedRowIndex={setSelectedRowIndex}
              page={pageNumber - 1}
              setPage={setPageNumber}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalCount={totalCount ?? 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CupboardsReportShowTable;
