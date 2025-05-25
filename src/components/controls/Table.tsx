import { TableBody, TableCell, TableRow } from "@mui/material";

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
};

export function Table<T>({
  data,
  headCells,
  headerGroups,
  resetPageSignal,
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
  
  return (
    <div style={{ height: "70vh", overflowY: "auto" }}>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, idx) => (
            <TableRow key={idx}>
              {(isMobile ? mobileMainColumns : headCells).map(
                (cell: HeadCell<T>) => {
                  let displayValue;
                  if (cell.icon !== undefined) {
                    console.log(cell.icon, "cell.icon");
                    displayValue = <img src={'/src/assets/images/GrayThem/report16.png'} alt={cell.label} />;
                  } 
                  else if (cell.id === "index") {
                    displayValue = convertToFarsiDigits(page * rowsPerPage + idx + 1);
                  } 
                  else if (cell.isCurrency) {
                    displayValue = convertToFarsiDigits(
                      formatNumberWithCommas(item[cell.id] as number)
                    );
                  } else {
                    const value = item[cell.id];
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
                        if (cell.path) {
                          navigate(`${cell.path}/${item[cell.id as keyof T]}`);
                        }
                      }}
                    >
                      {typeof displayValue === "string" || typeof displayValue === "number" || React.isValidElement(displayValue)
                        ? displayValue
                        : displayValue !== undefined && displayValue !== null
                          ? String(displayValue)
                          : ""}
                    </TableCell>
                  );
                }
              )}
              {isMobile && mobileRestColumns.length > 0 && (
                <TableCell className="text-xs">
                  {mobileRestColumns.map((cell: HeadCell<T>) => {
                    let displayValue;
                    console.log(cell, "cell.icon");
                    if (cell.icon !== undefined) {
                      displayValue = <img src={cell.icon} alt={cell.label} />;
                    } else if (cell.id === "index") {
                      displayValue = convertToFarsiDigits(page * rowsPerPage + idx + 1);
                    } else if (cell.isCurrency) {
                      displayValue = convertToFarsiDigits(
                        formatNumberWithCommas(item[cell.id] as number)
                      );
                    } else {
                      const value = item[cell.id];
                      displayValue =
                        cell.isNumber && value !== undefined && value !== null
                          ? convertToFarsiDigits(
                              value as string | number | null | undefined
                            )
                          : value;
                    }
                    return (
                      <div key={String(cell.id)}
                        onClick={() => {
                          if (cell.path) {
                            navigate(cell.path);
                          }
                        }}
                      >
                        <strong>{cell.label}:</strong>
                        {typeof displayValue === "string" || typeof displayValue === "number" || React.isValidElement(displayValue)
                          ? displayValue
                          : displayValue !== undefined && displayValue !== null
                            ? String(displayValue)
                            : ""}
                      </div>
                    );
                  })}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );
}
