import React, { Dispatch, SetStateAction, useState } from "react";
import { DefaultOptionType, TableColumns } from "../../types/general";
import { CellProps, useTable, useBlockLayout } from "react-table";
import {
  convertToFarsiDigits,
  convertToLatinDigits,
  formatNumberWithCommas,
} from "../../utilities/general";
import { colors } from "../../utilities/color";
import AutoComplete from "./AutoComplete";

type TableProps<T extends object> = {
  columns: TableColumns;
  data: T[];
  options?: DefaultOptionType[];
  setSearchText?: Dispatch<SetStateAction<string>>;
  updateMyData?: (rowIndex: number, columnId: string, value: string) => void;
  updateMyRow?: (rowIndex: number, values: DefaultOptionType) => void;
  changeRowValues?: (value: string, rowIndex: number, columnId: string) => void;
  skipPageReset?: boolean;
  fontSize?: string;
  wordWrap?: boolean;
  hasSumRow?: boolean;
  changeRowSelectColor?: boolean;
  setSelectedId?: (value: number) => void;
  CellColorChange?: (cell: any) => string | null;
  showToolTip?: boolean;
};

// Create an editable cell renderer
interface EditableCellProps<T extends object> extends CellProps<T, any> {
  updateMyData: (rowIndex: number, columnId: string, value: string) => void;
  updateMyRow?: (
    rowIndex: number,
    newValue: DefaultOptionType | DefaultOptionType[] | null
  ) => void;
  options?: DefaultOptionType[];
  setSearchText: Dispatch<SetStateAction<string>>;
  changeRowValues: (value: string, rowIndex: number, columnId: string) => void;
}

export function EditableInput<T extends object>({
  value: initialValue,
  row: { index },
  column,
  options,
  setSearchText,
  updateMyData,
  updateMyRow,
  changeRowValues,
}: EditableCellProps<T>) {
  const { id, type, placeholder, isCurrency, backgroundColor } = column as any;
  const [value, setValue] = React.useState<string>(initialValue);
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(
    () =>
      setValue(
        convertToFarsiDigits(
          isCurrency ? formatNumberWithCommas(initialValue) : initialValue
        )
      ),
    [initialValue]
  );

  // Handle change from AutoComplete
  const handleAutoCompleteChange = (
    event: any,
    newValue: DefaultOptionType | DefaultOptionType[] | null
  ) => {
    console.log(event);
    console.log(newValue, "newValue in handleAutoCompleteChange");
    setValue((newValue as DefaultOptionType)?.title ?? "");
    if (updateMyRow) {
      updateMyRow(index, newValue as DefaultOptionType);
    }
    if (newValue) {
      updateMyData(index, id, (newValue as DefaultOptionType)?.title ?? "");
    }
  };

  if (type === "autoComplete") {
    return (
      <AutoComplete
        options={options || []}
        //value={options?.find((opt) => opt.title === value) || null}
        value={value ? { id: 0, title: value } : null}
        handleChange={handleAutoCompleteChange}
        setSearch={setSearchText}
        showLabel={false}
        inputPadding="0 !important"
        outlinedInputPadding="5px"
        placeholder={placeholder}
        showBold={false}
        desktopfontsize="12px"
        showClearIcon={true}
        showBorder={false}
        changeColorOnFocus={true}
        showBorderFocused={true}
        textColor={colors.gray_600}
      />
    );
  }
  if (type === "textArea") {
    return (
      <textarea
        className="text-inherit p-0 m-0 border-0 w-full focus:outline-none"
        value={value}
        onChange={(e) => setValue(convertToFarsiDigits(e.target.value))}
        onBlur={() => {
          updateMyData(index, id, value);
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        style={{ backgroundColor: isFocused ? "white" : backgroundColor }}
      />
    );
  }

  return (
    <input
      className="text-inherit p-0 m-0 border-0 w-full focus:outline-none"
      style={{ backgroundColor: isFocused ? "white" : backgroundColor }}
      value={value}
      onChange={(e) => {
        setValue(convertToFarsiDigits(e.target.value));
        changeRowValues(e.target.value, index, id);
      }}
      onBlur={() => {
        updateMyData(index, id, value);
        setIsFocused(false);
      }}
      onFocus={() => setIsFocused(true)}
    />
  );
}

export default function TTable<T extends object>({
  columns,
  data,
  options = [],
  setSearchText,
  updateMyData = () => {},
  updateMyRow = () => {},
  changeRowValues = () => {},
  //skipPageReset,
  fontSize = "0.75rem",
  wordWrap = true,
  hasSumRow = false,
  changeRowSelectColor = false,
  setSelectedId,
  CellColorChange,
  showToolTip = false,
}: TableProps<T>) {
  const [rowSelect, setRowSelect] = useState(0);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows, // all rows, no pagination
  } = useTable(
    {
      columns,
      data,
      //defaultColumn,
      //autoResetPage: !skipPageReset,
      updateMyData,
      updateMyRow,
      changeRowValues,
      options,
      setSearchText,
    } as any,
    useBlockLayout
  );

  const tHead = (
    <thead className="bg-gray-200 ">
      {headerGroups.map((headerGroup) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          className="border-b border-gray-300 "
        >
          {headerGroup.headers.map((column: any) =>
            column.visible === false ? null : (
              <th
                {...column.getHeaderProps()}
                scope="col"
                className="py-1 text-center font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-300 bg-gray-300"
                key={String(column.id)}
                style={{
                  width: column.totalWidth || column.width,
                  backgroundColor: column.backgroundColor ?? colors.gray200,
                }}
              >
                {column.render("Header")}
              </th>
            )
          )}
        </tr>
      ))}
    </thead>
  );

  const tBody = (
    <tbody {...getTableBodyProps()} className="bg-white">
      {rows.length > 0 ? (
        rows.map((row: any, i: number) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="border-b border-gray-300 hover:cursor-pointer hover:bg-yellow-50"
            >
              {row.cells.map((cell: any) => {
                if (cell.column.visible === false) return null;
                return (
                  <td
                    {...cell.getCellProps()}
                    className="text-gray-500 border-r border-gray-300 flex justify-start items-center px-1"
                    key={cell.column.id}
                    title={showToolTip ? cell.value : ""}
                    style={{
                      width: cell.column.totalWidth || cell.column.width,
                      backgroundColor:
                        i === rowSelect && changeRowSelectColor
                          ? colors.blue50
                          : CellColorChange && !cell.column.backgroundColor
                          ? CellColorChange(row)
                          : cell.column.backgroundColor || "white",
                      whiteSpace: "pre-wrap",
                      textWrap: !wordWrap ? "nowrap" : "wrap",
                      overflow: !wordWrap ? "hidden" : "visible",
                      ...(hasSumRow && i === rows.length - 1
                        ? {
                            backgroundColor: colors.gray200,
                            fontWeight: "bold",
                            textAlign: "right",
                          }
                        : {}),
                    }}
                    onClick={() => {
                      if (setSelectedId) {
                        const itemId = Number(
                          convertToLatinDigits(row.original["id" as keyof T])
                        );
                        setSelectedId?.(itemId);
                      }
                      setRowSelect(i);
                    }}
                  >
                    {hasSumRow &&
                    i === rows.length - 1 &&
                    cell.column.id === "index"
                      ? ""
                      : cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })
      ) : (
        <tr className="w-full">
          <td className="text-center py-4">هیچ رکوردی وجود ندارد</td>
        </tr>
      )}
    </tbody>
  );

  return (
    <table
      {...getTableProps()}
      className="table-fixed w-full border border-gray-300 shadow-lg"
      style={{ fontSize }}
    >
      {tHead}
      {tBody}
    </table>
  );
}
