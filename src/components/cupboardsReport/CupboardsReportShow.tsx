import { SetStateAction, Dispatch, useState, useEffect } from "react";
import CupboardsReportShowHeader from "./CupboardsReportShowHeader";
import { useCupboardsReportStore } from "../../store/cupboardsReportStore";
import { useGeneralContext } from "../../context/GeneralContext";
import { convertToFarsiDigits } from "../../utilities/general";
import { FaCheck } from "react-icons/fa";
import CupboardsReportShowTable from "./CupboardsReportShowTable";
import { TableColumns } from "../../types/general";
import Flow16 from "../../assets/images/GrayThem/flow16.png";
import EditIcon from "../../assets/images/GrayThem/edit_gray16.png";
import { WarehouseTemporaryReceiptIndentDtl } from "../../types/warehouse";
import { CupboardsReportResponse } from "../../types/cupboardsReport";

type Props = {
  cupboardsReportResponse: CupboardsReportResponse;
  isLoadingCupboardsReport: boolean;
  data: any;
  setData: Dispatch<SetStateAction<any[]>>;
  columns: TableColumns;
};

const CupboardsReportShow = ({
  cupboardsReportResponse,
  isLoadingCupboardsReport,
  data,
  setData,
  columns,
}: Props) => {
  const { setField: setCupboardsReportField } = useCupboardsReportStore();
  const { systemId, yearId } = useGeneralContext();
  const [errId, setErrId] = useState<number>(0);
  const [err, setErr] = useState<boolean>(true);
  const [existsCupboards, setExistsCupboards] = useState<boolean>(true);
  // for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(35);

  const [selectedProduct, setSelectedProduct] =
    useState<WarehouseTemporaryReceiptIndentDtl | null>(null);
  const [statusClicked, setStatusClicked] = useState(false);

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
  }, [yearId, systemId, errId, err, existsCupboards]);

  useEffect(() => {
    const tempData = cupboardsReportResponse.data.result.map((c, index) => {
      const dtl: WarehouseTemporaryReceiptIndentDtl = {
        id: 0,
        iocId: 0,
        produce: c.prodDate,
        expire: c.expDate,
        uId: "",
        status: 0,
        cId: c.id,
        code: c.code,
        gtin: c.gtin,
        irc: c.irc,
        pCode: "",
        pName: c.fullName,
        cnt: 0,
        stock: 0,
        pOffer: 0,
        indents: [],
        rCnt: 0,
        rOffer: 0,
      };
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
        statusImages: (
          <div className="flex justify-evenly items-center w-full">
            <input
              type="checkbox"
              checked={dtl.status === 0 ? false : true}
              readOnly
              onClick={() => handleStatusClick(dtl)}
            />
            <img src={Flow16} alt="Flow16" className="w-4 h-4" />
            <img src={EditIcon} alt="EditIcon" className="w-4 h-4" />
          </div>
        ),
      };
    });
    console.log(tempData);
    setData(tempData);
  }, [cupboardsReportResponse.data.result]);
  ///////////////////////////////////////////////////////////////////
  const handleStatusClick = (dtl: any) => {
    console.log(dtl, "dtl");
    setSelectedProduct(dtl);
    setStatusClicked(true);
  };

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
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        statusClicked={statusClicked}
        setStatusClicked={setStatusClicked}
      />
    </div>
  );
};

export default CupboardsReportShow;
