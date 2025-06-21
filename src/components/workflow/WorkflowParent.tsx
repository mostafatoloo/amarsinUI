import { useEffect, useState, useCallback, useRef } from "react";
import { Paper } from "@mui/material";
import Skeleton from "../layout/Skeleton";
import { useNavigate } from "react-router-dom";
import { Table } from "../controls/Table";
import { useGeneralContext } from "../../context/GeneralContext";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useWorkflowRowSelectStore, useWorkflowStore } from "../../store/workflowStore";
import { HeadCell } from "../../hooks/useTable";
import { WorkFlowTable } from "../../types/workflow";
import AutoComplete from "../controls/AutoComplete";
import { convertToFarsiDigits } from "../../utilities/general";
import { debounce } from "lodash";
import { blue,  } from "@mui/material/colors";

type Props = {
  setSelectedId: (value: number) => void;
};

export default function WorkflowParent({ setSelectedId }: Props) {
  const { workFlowResponse, error, isLoading } = useWorkflow();
  const { flowMapId: flowMapIdStore ,setField} = useWorkflowStore();
  const { systemId, chartId, defaultRowsPerPage } = useGeneralContext();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultRowsPerPage);
  const { workTableId } = useWorkflowRowSelectStore();
  const navigate = useNavigate();
  const abortControllerRef = useRef<AbortController | null>(null);

  const headCells: HeadCell<WorkFlowTable>[] = [
    {
      id: "index",
      label: "ردیف",
      disableSorting: true,
      cellWidth: "5%",
      isNumber: true,
      changeColor:true
    },
    {
      id: "regDateTime",
      label: "زمان",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      changeColor:true
    },
    {
      id: "formTitle",
      label: "فرم",
      cellWidth: "25%",
      disableSorting: true,
      changeColor:true
    },
    {
      id: "formCode",
      label: "کد",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      changeColor:true
    },
    {
      id: "formCost",
      label: "مقدار",
      cellWidth: "10%",
      isCurrency: true,
      disableSorting: true,
      changeColor:true
    },
    {
      id: "flowMapTitle",
      label: "مرحله",
      cellWidth: "10%",
      disableSorting: true,
      changeColor:true
    },
    {
      id: "fChartName",
      label: "فرستنده",
      cellWidth: "10%",
      isNumber: true,
      disableSorting: true,
      changeColor:true
    },
    {
      id: "dsc",
      label: "شرح",
      cellWidth: "20%",
      isNumber: true,
      disableSorting: true,
      changeColor:true
    },
/*    {
      id: "formId",
      label: "شناسه فرم",
      cellWidth: "5%",
      isNotVisible: true,
    },*/
  ];

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

  useEffect(() => {
    setField("flowMapId", "-1");
  }, [chartId]);

  //define flowMapTitles
  const [flowMapTitle, setFlowMapTitle] = useState<{
    id: string;
    title: string;
  } | null>({
    id: "-1",
    title: "همه",
  });
  //add filter options
  const [dateTime, setDateTime] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [cost, setCost] = useState("");
  const [flowMapId, setFlowMapId] = useState("-1");
  const [name, setName] = useState("");
  const [dsc, setDsc] = useState("");

  useEffect(() => {
    setPageNumber(1);
  }, [
    flowMapIdStore,
    dateTime,
    title,
    code,
    cost,
    name,
    dsc,
    chartId,
    systemId,
  ]);

  useEffect(() => {
    console.log(flowMapId); //just for handling warning of unused flowMapId
    if (
      flowMapIdStore?.toString() === "-1" &&
      workFlowResponse.totalCount > 0
    ) {
      setFlowMapTitle({
        id: "-1",
        title:
          workFlowResponse.flowMapTitles.length > 0
            ? `${
                workFlowResponse.flowMapTitles[0].name
              } (${convertToFarsiDigits(
                workFlowResponse.flowMapTitles[0].count
              )})`
            : "",
      });
    } else if (
      flowMapIdStore?.toString() === "-1" &&
      workFlowResponse.totalCount === 0
    )
      setFlowMapTitle({
        id: "-1",
        title: "",
      });
  }, [chartId, flowMapIdStore, workFlowResponse.totalCount]);

  const handleDebounceFilterChange = useCallback(
    debounce((field: string, value: string|number) => {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();

      setField(field, value);
    }, 500),
    [setField]
  );

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(()=>{
    setSelectedId(workFlowResponse.workTables.length>0 ? workFlowResponse.workTables[0].id : 0)
  },[workFlowResponse])

  // Custom cell click handler for Table
  const handleCellColorChange = (
    cell: HeadCell<WorkFlowTable>,
    item: WorkFlowTable
  ) => {
    if (cell.changeColor && item?.["id"] === workTableId) {
      return blue[50];
    }
    return "";
  };

  if (error) return <div>Error: {error.message} </div>;

  return (
    <>
      <Paper className="p-2 mt-2 w-full">
        <div className="w-full flex justify-center md:justify-end items-center ">
          <input
            name="dateTime"
            value={dateTime ?? ""}
            onChange={(e) => {
              handleDebounceFilterChange("dateTime", e.target.value);
              setDateTime(e.target.value);
            }}
            className={`border p-1 text-sm rounded-sm w-1/4 md:w-[10%]`}
            //style={{width:headCells[1].cellWidth}}
          />
          <input
            name="title"
            value={title ?? ""}
            onChange={(e) => {
              handleDebounceFilterChange("title", e.target.value);
              setTitle(e.target.value);
            }}
            className={`border p-1 text-sm rounded-sm w-1/4 md:w-[25%]`}
            //style={{  width: headCells[2].cellWidth}}
          />
          <input
            name="code"
            value={code ?? ""}
            onChange={(e) => {
              handleDebounceFilterChange("code", e.target.value);
              setCode(e.target.value);
            }}
            className="border p-1 text-sm rounded-sm hidden md:block"
            style={{ width: headCells[3].cellWidth }}
          />
          <input
            name="cost"
            value={cost ?? ""}
            onChange={(e) => {
              handleDebounceFilterChange("cost", e.target.value);
              setCost(e.target.value);
            }}
            className="border p-1 text-sm rounded-sm hidden md:block"
            style={{ width: headCells[4].cellWidth }}
          />
          <div
            className="hidden md:block"
            style={{ width: headCells[5].cellWidth }}
          >
            <AutoComplete
              options={workFlowResponse.flowMapTitles.map((b) => ({
                id: b.id.toString(),
                title: `${b.name} (${convertToFarsiDigits(b.count)})`,
              }))}
              value={flowMapTitle}
              handleChange={(_event, newValue) => {
                setField("flowMapId", newValue?.id ?? "-1");
                return setFlowMapTitle(newValue);
              }}
              setSearch={setFlowMapId}
              showLabel={false}
              inputPadding="0 !important"
              mobilefontsize="0.6rem"
              desktopfontsize="0.7rem"
            />
          </div>
          <input
            name="name"
            value={name ?? ""}
            onChange={(e) => {
              handleDebounceFilterChange("name", e.target.value);
              setName(e.target.value);
            }}
            className="border p-1 text-sm rounded-sm hidden md:block"
            style={{ width: headCells[6].cellWidth }}
          />
          <input
            name="dsc"
            value={dsc ?? ""}
            onChange={(e) => {
              handleDebounceFilterChange("dsc", e.target.value);
              setDsc(e.target.value);
            }}
            className="border p-1 text-sm rounded-sm hidden md:block"
            style={{ width: headCells[7].cellWidth }}
          />
        </div>

        {isLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : workFlowResponse.err !== 0 ? (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            {workFlowResponse.msg}
          </p>
        ) : (
          <div className="w-full mt-2" 
          //style={{ height: parentHeight }}
          >
            <Table
              data={workFlowResponse.workTables}
              headCells={headCells}
              pagination={true}
              page={pageNumber - 1}
              setPage={setPageNumber}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalCount={workFlowResponse.totalCount}
              setSelectedId={setSelectedId}
              cellFontSize="0.75rem"
              wordWrap= {false}
              cellColorChangeHandler={handleCellColorChange}
            />
          </div>
        )}
      </Paper>
    </>
  );
}
