import { SetStateAction, Dispatch, useState, useEffect } from "react";
import CupboardsReportShowHeader from "./CupboardsReportShowHeader";
import { useCupboardReport } from "../../hooks/useCupboardsReport";
import { useCupboardsReportStore } from "../../store/cupboardsReportStore";
import { useGeneralContext } from "../../context/GeneralContext";
import { convertToFarsiDigits } from "../../utilities/general";
import { FaCheck } from "react-icons/fa";
import CupboardsReportShowTable from "./CupboardsReportShowTable";
import { TableColumns } from "../../types/general";

type Props = {
  data: any;
  setData: Dispatch<SetStateAction<any[]>>;
  columns: TableColumns;
};

const CupboardsReportShow = ({ data, setData, columns }: Props) => {
  const { cupboardsReportResponse, isLoadingCupboardsReport } =
    useCupboardReport();
  const { setField: setCupboardsReportField } = useCupboardsReportStore();
  const { systemId, yearId,defaultRowsPerPage } = useGeneralContext();
  const [errId, setErrId] = useState<number>(0);
  const [err, setErr] = useState<boolean>(true);
  const [existsCupboards, setExistsCupboards] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultRowsPerPage);

  useEffect(() => {
    setCupboardsReportField("errId", errId);
    setCupboardsReportField("err", err);
    setCupboardsReportField("existsCupboards", existsCupboards);
    setCupboardsReportField("systemId", systemId);
    setCupboardsReportField("yearId", yearId);
    setCupboardsReportField("pageNumber", pageNumber);
  }, [errId, err, existsCupboards, systemId, yearId, pageNumber]);


  useEffect(() => {
    setPageNumber(1);
  }, [
    yearId,
    systemId,
    errId,
    err,
    existsCupboards
  ])

  useEffect(() => {
    const tempData = cupboardsReportResponse.data.result.map((c, index) => {
      return {
        ...c,
        fullCode: convertToFarsiDigits(c.fullCode),
        fullName: convertToFarsiDigits(c.fullName),
        prodDate: convertToFarsiDigits(c.prodDate),
        expDate: convertToFarsiDigits(c.expDate),
        gtin: convertToFarsiDigits(c.gtin),
        ttac: c.ttac ? <FaCheck /> : null,
        code: convertToFarsiDigits(c.code), // for batch
        irc: convertToFarsiDigits(c.irc),
        uid: convertToFarsiDigits(c.uid),
        tmp: convertToFarsiDigits(c.tmp),
        inc: convertToFarsiDigits(c.inc),
        outc: convertToFarsiDigits(c.outc),
        stck: convertToFarsiDigits(c.stck),
        status: convertToFarsiDigits(c.status),
        index: convertToFarsiDigits((pageNumber - 1) * pageSize + index + 1),
      };
    });
    console.log(tempData)
    setData(tempData);
  }, [cupboardsReportResponse.data.result]);
  return (
    <div>
      <CupboardsReportShowHeader
        errId={errId}
        setErrId={setErrId}
        err={err}
        setErr={setErr}
        existsCupboards={existsCupboards}
        setExistsCupboards={setExistsCupboards}
      />
      <CupboardsReportShowTable
        isLoading={isLoadingCupboardsReport}
        columns={columns}
        data={data}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalCount={cupboardsReportResponse.data.total_count ?? 0}
      />
    </div>
  );
};

export default CupboardsReportShow;
