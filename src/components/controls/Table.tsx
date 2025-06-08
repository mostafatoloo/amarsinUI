import { TableBody, TableCell, TableRow, useTheme } from "@mui/material";

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
  resetPageSignal: string | undefined;
  pagination?: boolean;
  cellClickHandler?: (cell: HeadCell<T>, item: T) => void;
  hasSumRow?: boolean;
};

export function Table<T>({
  data,
  headCells,
  headerGroups,
  resetPageSignal,
  pagination = false,
  cellClickHandler,
  hasSumRow = false,
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
    recordsAfterPagingAndSorting,
    recordsAfterSorting,
    isMobile,
    mobileMainColumns,
    mobileRestColumns,
    page,
    rowsPerPage,
  } = useTable<T>(
    data,
    headCells,
    headerGroups ?? [],
    filterFn,
    resetPageSignal
  );

  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div className="h-full">
      <TblContainer>
        <TblHead />
        <TableBody sx={{ overflowY: "auto" }}>
          {(pagination ? recordsAfterPagingAndSorting() : recordsAfterSorting()).map(
            (item, idx) => (
              <TableRow
                key={idx}
                sx={
                  idx ===
                    (pagination ? recordsAfterPagingAndSorting() : recordsAfterSorting())
                      .length -
                      1 && hasSumRow
                    ? {
                        //for sum row
                        backgroundColor: theme.palette.grey[200],
                        fontWeight: "bold",
                      }
                    : {}
                }
              >
                {/* mobile main columns */}
                {(isMobile ? mobileMainColumns : headCells).map(
                  (cell: HeadCell<T>) => {
                    const lastRow =
                      idx ===
                      (pagination ? recordsAfterPagingAndSorting() : recordsAfterSorting())
                        .length -
                        1;
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
                          pagination ? page * rowsPerPage + idx + 1 : idx + 1
                        );
                      }
                    } else if (cell.isCurrency) {
                      displayValue = convertToFarsiDigits(
                        formatNumberWithCommas(item[cell.id as keyof T] as number)
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
                      <TableCell
                        key={String(cell.id)}
                        className={isMobile ? "text-xs" : ""}
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
                          : displayValue !== undefined && displayValue !== null
                          ? String(displayValue)
                          : ""}
                      </TableCell>
                    );
                  }
                )}
                {/* mobile rest columns */}
                {isMobile && mobileRestColumns.length > 0 && (
                  <TableCell className="text-xs">
                    {mobileRestColumns.map((cell: HeadCell<T>) => {
                      const lastRow =
                        idx ===
                        (pagination ? recordsAfterPagingAndSorting() : recordsAfterSorting)
                          .length -
                          1;
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
                          pagination ? page * rowsPerPage + idx + 1 : idx + 1
                        );
                      } else if (cell.isCurrency) {
                        displayValue = convertToFarsiDigits(
                          formatNumberWithCommas(item[cell.id as keyof T] as number)
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
                      );
                    })}
                  </TableCell>
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </TblContainer>
      {pagination && <TblPagination />}
    </div>
  );
}
