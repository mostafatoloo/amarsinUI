import { useMemo } from "react";
import { useWorkflowStore } from "../../store/workflowStore";

const useWorkflowFilters = () => {
  const { 
    dsc, 
    dateTime, 
    title, 
    code, 
    cost, 
    flowMapId, 
    name,
    setField 
  } = useWorkflowStore();

  const headCells = useMemo(() => [
    {
      id: "index",
      label: "ردیف",
      disableSorting: true,
      cellWidth: "5%",
      isNumber: true,
    },
    { 
      id: "regDateTime", 
      label: "زمان", 
      cellWidth: "10%", 
      isNumber: true,
      disableSorting: true,
      filterable: true,
      filterType: "text" as const,
      //filterField: 'dateTime',
      filterValue: String(dateTime || ''),
      setFilterValue: (value: string) => setField('dateTime', value)
    },
    { 
      id: "formTitle", 
      label: "فرم", 
      cellWidth: "20%", 
      disableSorting: true,
      filterable: true,
      filterType: "text" as const,
      //filterField: 'title',
      filterValue: String(title || ''),
      setFilterValue: (value: string) => setField('title', value)
    },
    { 
      id: "formCode", 
      label: "کد", 
      cellWidth: "10%", 
      isNumber: true,
      disableSorting: true,
      filterable: true,
      filterType: "text" as const,
      //filterField: 'code',
      filterValue: String(code || ''),
      setFilterValue: (value: string) => setField('code', value)
    },
    { 
      id: "formCost", 
      label: "مقدار", 
      cellWidth: "10%", 
      isCurrency: true,
      disableSorting: true,
      filterable: true,
      filterType: "text" as const,
      //filterField: 'cost',
      filterValue: String(cost || ''),
      setFilterValue: (value: string) => setField('cost', value)
    },
    { 
      id: "flowMapTitle", 
      label: "مرحله", 
      cellWidth: "10%",
      disableSorting: true,
      filterable: true,
      filterType: "text" as const,
      //filterField: 'flowMapId',
      filterValue: String(flowMapId || ''),
      setFilterValue: (value: string) => setField('flowMapId', value)
    },
    { 
      id: "fChartName", 
      label: "فرستنده", 
      cellWidth: "15%", 
      isNumber: true,
      disableSorting: true,
      filterable: true,
      filterType: "text" as const,
      //filterField: 'name',
      filterValue: String(name || ''),
      setFilterValue: (value: string) => setField('name', value)
    },
    { 
      id: "dsc", 
      label: "شرح", 
      cellWidth: "20%", 
      isNumber: true,
      disableSorting: true,
      filterable: true,
      filterType: "text" as const,
      //filterField: 'dsc',
      filterValue: String(dsc || ''),
      setFilterValue: (value: string) => setField('dsc', value)
    }
  ], [dsc, dateTime, title, code, cost, flowMapId, name, setField]);

  return {
    headCells,
    filters: {
      dsc,
      dateTime,
      title,
      code,
      cost,
      flowMapId,
      name
    }
  };
};

export { useWorkflowFilters }; 