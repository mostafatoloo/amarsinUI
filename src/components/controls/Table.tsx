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
import React, { useState } from "react";
import useTable, { HeadCell, HeaderGroup } from "../../hooks/useTable";
import { useNavigate } from "react-router-dom";

type TableProps<T> = {
  data: T[];
  headCells: HeadCell<T>[];
  headerGroups?: HeaderGroup[];
  //resetPageSignal: string | undefined;
  pagination?: boolean;
  cellClickHandler?: (cell: HeadCell<T>, item: T) => void;
  hasSumRow?: boolean;
  page?: number;
  setPage?: (page: number) => void;
  pageSize?: number;
  setPageSize?: (pageSize: number) => void;
  totalCount?: number;
  setSelectedId?: (value: number) => void;
  cellFontSize?: string;
};

export function Table<T>({
  data,
  headCells,
  headerGroups,
  //resetPageSignal,
  pagination = false,
  cellClickHandler,
  hasSumRow = false,
  page = 0,
  setPage,
  pageSize = 10,
  setPageSize,
  totalCount,
  setSelectedId,
  cellFontSize,
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

  return (
    <div className="h-full flex flex-col gap-2">
      <TblContainer>
        <TblHead />
        <TableBody sx={{ overflowY: "auto"}}>
          {records.length > 0 ? (
            records.map((item, idx) => (
              <React.Fragment key={idx}>
                <TableRow
                  onClick={() =>
                    setSelectedId?.(item["id" as keyof T] as number)
                  }
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
                    (cell: HeadCell<T>) => {
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
                            key={String(cell.id)}
                            sx={{
                              fontSize: isMobile ? "0.7rem" : cellFontSize,
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
                            {typeof displayValue === "string" ||
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
