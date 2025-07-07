import { ReactNode } from 'react';

export type Column = {
  Header: string;
  accessor: string;
  width?: string;
  backgroundColor?: string;
  type?: string;
  visible?:boolean;
  placeholder?:string;
  isCurrency?:boolean;
  Cell?: (props: any) => ReactNode;
};
export type ColumnGroup = {
  Header: string;
  columns: Column[];
  backgroundColor?: string;
};

export type DefaultOptionType = {
  id: number;
  title: string;
};  

export type DefaultOptionTypeStringId = {
  id: string;
  title: string;
};  


export type TableColumns = (ColumnGroup | Column)[];