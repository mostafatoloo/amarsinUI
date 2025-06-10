import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import Skeleton from "../layout/Skeleton";
import { useNavigate } from "react-router-dom";
import { Table } from "../controls/Table";
import { useGeneralContext } from "../../context/GeneralContext";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useWorkflowStore } from "../../store/workflowStore";
import { useWorkflowFilters } from "./useWorkflowFilters";
import Input from "../controls/Input";

/*export const headCells: HeadCell<WorkFlowTable>[] = [
  {
    id: "index",
    label: "ردیف",
    disableSorting: true,
    cellWidth: "5%",
    isNumber: true,
  },
  { id: "regDateTime", label: "زمان", cellWidth: "10%", isNumber: true ,disableSorting: true,},
  { id: "formTitle", label: "فرم", cellWidth: "20%" , disableSorting: true },
  { id: "formCode", label: "کد", cellWidth: "10%", isNumber: true ,disableSorting: true},
  { id: "formCost", label: "مقدار", cellWidth: "10%", isCurrency: true,disableSorting: true, },
  { id: "flowMapTitle", label: "مرحله", cellWidth: "10%" ,disableSorting: true,},
  { id: "fChartName", label: "فرستنده", cellWidth: "15%", isNumber: true ,disableSorting: true,},
  { id: "dsc", label: "شرح", cellWidth: "20%", isNumber: true ,disableSorting: true, },
];*/

export default function WorkflowForm() {
  const { workFlowResponse, error, isLoading } = useWorkflow();
  const { systemId, chartId, defaultRowsPerPage } = useGeneralContext();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultRowsPerPage);
  const { setField } = useWorkflowStore();
  const { headCells, filters } = useWorkflowFilters();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    setField("systemId", systemId);
    setField("chartId", chartId);
    setField("page", pageNumber);
    setField("pageSize", pageSize);
  }, [systemId, chartId, pageNumber, pageSize]);


  if (error) return <div>Error: {error.message} </div>;

  return (
    <>
      <Paper className="p-2 m-2 w-full h-full">
        {/*<Input 
          name="dateTime"
          label="dateTime"
          value={filters.dateTime ?? ""}
          onChange={(e) => setField("dateTime", e.target.value)}
        />
        
        <Input
          name="dsc"
          label="dsc"
          value={filters.dsc ?? ""}
          onChange={(e) => setField("dsc", e.target.value)}
        />*/}

        {isLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : workFlowResponse.err !== 0 ? (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            {workFlowResponse.msg}
          </p>
        ) : (
          <div className="h-screen-minus-200 mt-2">
            <Table
              data={workFlowResponse.workTables}
              headCells={headCells}
              pagination={true}
              page={pageNumber - 1}
              setPage={setPageNumber}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalCount={workFlowResponse.totalCount}
              //onFilterChange={handleFilterChange}
            />
          </div>
        )}
      </Paper>
    </>
  );
}
