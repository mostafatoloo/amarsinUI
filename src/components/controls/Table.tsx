import {
  TableBody,
  TableCell,
  TableRow,
  useTheme,
  Typography,
} from "@mui/material";

import {
  convertToFarsiDigits,
  formatNumberWithCommas,
} from "../../utilities/general";
import React, { useRef, useState } from "react";
import useTable, { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { useNavigate } from "react-router-dom";

type TableProps<T> = {
  data: T[];
  headCells: HeadCell<T>[];
  headerGroups?: HeaderGroup[];
  //resetPageSignal: string | undefined;
  pagination?: boolean;
  cellClickHandler?: (cell: HeadCell<T>, item: T) => void;
  cellColorChangeHandler?: (cell: HeadCell<T>, item: T) => string;
  hasSumRow?: boolean;
  page?: number;
  setPage?: (page: number) => void;
  pageSize?: number;
  setPageSize?: (pageSize: number) => void;
  totalCount?: number;
  setSelectedId?: (value: number) => void;
  cellFontSize?: string;
  wordWrap?: boolean;
};

export function Table<T>({
  data,
  headCells,
  headerGroups,
  //resetPageSignal,
  pagination = false,
  cellClickHandler,
  cellColorChangeHandler,
  hasSumRow = false,
  page = 0,
  setPage,
  pageSize = 10,
  setPageSize,
  totalCount,
  setSelectedId,
  cellFontSize,
  wordWrap,
}: TableProps<T>) {
  const [filterFn] = useState<{
    fn: (items: T[]) => T[];
  }>({
    fn: (items) => items,
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaging,
    recordsAfterSorting,
    isMobile,
    mobileMainColumns,
    mobileRestColumns,
  } = useTable<T>(
    data,
    headCells,
    headerGroups ?? [],
    filterFn,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalCount
  );

  const navigate = useNavigate();
  const theme = useTheme();
  const records = pagination ? recordsAfterPaging() : recordsAfterSorting();
  const inputRef = useRef<number>(0);
  //const [focusFlag,setFocusFlag] = useState(false)

  const renderInput = (item: T, cell: HeadCell<T>, i: number) => {
    return (
      <input
        type="text"
        autoFocus={i===inputRef.current ? true : false}
        value={cell.val === "0" ? String(item[cell.id as keyof T]) : cell.val}
        onChange={(e) => {
          cell.setVal?.(e);
          console.log(e.target.value);
        }}
        style={{
          backgroundColor: cell.backgroundColor,
        }}
        onClick={()=>{console.log("enter"+i);inputRef.current=i}}
      />
    );
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <TblContainer>
        <TblHead />
        <TableBody sx={{ overflowY: "auto" }}>
          {records.length > 0 ? (
            records.map((item, idx) => (
              <React.Fragment key={idx}>
                <TableRow
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedId?.(item["id" as keyof T] as number);
                  }}
                  sx={
                    idx === records.length - 1 && hasSumRow
                      ? {
                          backgroundColor: theme.palette.grey[200],
                          fontWeight: "bold",
                        }
                      : {}
                  }
                >
                  {(isMobile ? mobileMainColumns : headCells).map(
                    (cell: HeadCell<T>, i) => {
                      const lastRow = idx === records.length - 1;
                      let displayValue;

                      if (cell.type === "input" && inputRef.current===i) {
                        console.log(inputRef.current,"inputRef.current",i)
                        inputRef.current=i
                      }

                      if (cell.icon !== undefined) {
                        displayValue =
                          hasSumRow && lastRow ? (
                            ""
                          ) : (
                            <img src={cell.icon} alt={cell.label} />
                          );
                      } else if (cell.id === "index") {
                        if (hasSumRow && lastRow) {
                          displayValue = "";
                        } else {
                          displayValue = convertToFarsiDigits(
                            pagination ? page * pageSize + idx + 1 : idx + 1
                          );
                        }
                      } else if (cell.isCurrency) {
                        displayValue = convertToFarsiDigits(
                          formatNumberWithCommas(
                            item[cell.id as keyof T] as number
                          )
                        );
                      } else {
                        const value = item[cell.id as keyof T];
                        displayValue =
                          cell.isNumber && value !== undefined && value !== null
                            ? convertToFarsiDigits(
                                value as string | number | null | undefined
                              )
                            : value;
                      }
                      return (
                        cell.isNotVisible !== true && (
                          <TableCell
                            title={
                              wordWrap ? "" : String(item[cell.id as keyof T])
                            }
                            key={String(cell.id)}
                            sx={{
                              maxWidth: !wordWrap ? "20px" : "",
                              width: cell.cellWidth,
                              textWrap: !wordWrap ? "nowrap" : "wrap",
                              overflow: !wordWrap ? "hidden" : "auto",
                              fontSize: isMobile ? "0.7rem" : cellFontSize,
                              backgroundColor:
                                cell.changeColor && cellColorChangeHandler
                                  ? cellColorChangeHandler(cell, item)
                                  : cell.backgroundColor,
                            }}
                            onClick={() => {
                              if (cellClickHandler && !lastRow) {
                                cellClickHandler(cell, item);
                              } else if (cell.path) {
                                navigate(
                                  `${cell.path}/${item[cell.id as keyof T]}`
                                );
                              }
                            }}
                          >
                            {/* if item[cell] is of "input" type */}
                            {cell.type === "input"
                              ? renderInput(item, cell, i)
                              : typeof displayValue === "string" ||
                                typeof displayValue === "number" ||
                                React.isValidElement(displayValue)
                              ? displayValue
                              : displayValue !== undefined &&
                                displayValue !== null
                              ? String(displayValue)
                              : ""}
                          </TableCell>
                        )
                      );
                    }
                  )}
                  {isMobile && (
                    <TableCell
                      sx={{ fontSize: isMobile ? "0.7rem" : cellFontSize }}
                    >
                      {mobileRestColumns.map((cell: HeadCell<T>) => {
                        const lastRow = idx === records.length - 1;
                        let displayValue;

                        if (cell.icon !== undefined) {
                          displayValue =
                            hasSumRow && lastRow ? (
                              ""
                            ) : (
                              <img src={cell.icon} alt={cell.label} />
                            );
                        } else if (cell.id === "index") {
                          displayValue = convertToFarsiDigits(
                            pagination ? page * pageSize + idx + 1 : idx + 1
                          );
                        } else if (cell.isCurrency) {
                          displayValue = convertToFarsiDigits(
                            formatNumberWithCommas(
                              item[cell.id as keyof T] as number
                            )
                          );
                        } else {
                          const value = item[cell.id as keyof T];
                          displayValue =
                            cell.isNumber &&
                            value !== undefined &&
                            value !== null
                              ? convertToFarsiDigits(
                                  value as string | number | null | undefined
                                )
                              : value;
                        }
                        return (
                          cell.isNotVisible !== true && (
                            <div
                              key={String(cell.id)}
                              onClick={() => {
                                if (cellClickHandler) {
                                  cellClickHandler(cell, item);
                                } else if (cell.path) {
                                  navigate(
                                    `${cell.path}/${item[cell.id as keyof T]}`
                                  );
                                }
                              }}
                            >
                              <strong>{cell.label}:</strong>
                              {typeof displayValue === "string" ||
                              typeof displayValue === "number" ||
                              React.isValidElement(displayValue)
                                ? displayValue
                                : displayValue !== undefined &&
                                  displayValue !== null
                                ? String(displayValue)
                                : ""}
                            </div>
                          )
                        );
                      })}
                    </TableCell>
                  )}
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headCells.length + (isMobile ? 1 : 0)}>
                <div className="flex justify-center items-center h-full p-6 text-red-400">
                  <Typography variant="body1">رکوردی یافت نشد</Typography>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TblContainer>
      {pagination && records.length > 0 && <TblPagination />}
    </div>
  );
}
