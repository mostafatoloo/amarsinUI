import { useEffect, } from "react";
import { Paper } from "@mui/material";
import Skeleton from "../layout/Skeleton";
import { useNavigate } from "react-router-dom";
import { Table } from "../controls/Table";
import { useGeneralContext } from "../../context/GeneralContext";
import { HeadCell } from "../../hooks/useTable";
import { WorkFlowTable } from "../../types/workflow";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useWorkflowStore } from "../../store/workflowStore";

export const headCells: HeadCell<WorkFlowTable>[] = [
  {
    id: "index",
    label: "ردیف",
    disableSorting: true,
    cellWidth: "5%",
    isNumber: true,
  },
  { id: "regDateTime", label: "زمان" ,cellWidth: "10%",isNumber: true},
  { id: "formTitle", label: "فرم" ,cellWidth: "25%"},
  { id: "formCode", label: "کد" ,cellWidth: "5%",isNumber:true},
  { id: "formCost", label: "مقدار" ,cellWidth: "10%",isCurrency:true},
  { id: "flowMapTitle", label: "مرحله" ,cellWidth: "10%"},
  { id: "fChartName", label: "فرستنده" ,cellWidth: "15%",isNumber:true},
  { id: "dsc", label: "شرح" ,cellWidth: "20%",isNumber:true},
];

export default function WorkflowForm() {
  const { workFlowResponse, error, isLoading } = useWorkflow();

  const { systemId,chartId } = useGeneralContext();

  const { setField } = useWorkflowStore();
  //if error occurred then navigate to login page
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    setField("systemId",systemId)
    setField("chartId",chartId)
  }, [systemId,chartId]);
  
  
  if (error) return <div>Error: {error.message} </div>;

  return (
    <>
      <Paper className="p-2 m-2 w-full h-full">
        {/*<div className="flex xl:w-1/4 justify-center items-center gap-2">
          <label htmlFor="year" className="">
            برند:
          </label>
          <AutoComplete
            options={brands.map((b) => ({
              id: b.id,
              title: b.text,
            }))}
            value={brand}
            handleChange={(_event, newValue) => {
              return setBrand(newValue);
            }}
            setSearch={setSearch}
            showLabel={false}
            inputPadding="0 !important"
          />
        </div>*/}

        {isLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : 
        workFlowResponse.err !== 0 ? (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            {workFlowResponse.msg}
          </p>
        ) : workFlowResponse.workTables.length > 0 ? (
          <div className="h-screen-minus-200 mt-2">
            <Table
              data={workFlowResponse.workTables}
              headCells={headCells}
              resetPageSignal={systemId.toString()}
              pagination={true}
            />
          </div>
        ) : (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            کاری در کارتابل شما وجود ندارد!
          </p>
        )}
      </Paper>
    </>
  );
}
