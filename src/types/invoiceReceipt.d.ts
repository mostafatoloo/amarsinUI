import { ReactNode } from "react";

// for api/Indent/showMrs
export interface IndentMrsResponse {
  err: number;
  msg: string;
  indents: Indents[];
  indentDtls: IndentDtl[];
}

interface Indents {
  id: number;
  ordr: number;
  ordrId: number;
  payDuration: number;
  mrsId: number;
  dat: string;
  tim: string;
  cId: number;
  srName: string;
  dsc: string;
  usrName: string;
  flwId: number;
  flowMapName: string;
  salesPriceId: number;
  salesPriceTitle: string;
  saleFDate: string;
  saleTDate: string;
}

interface IndentDtl {
  id: number;
  ordr: number;
  custId: number;
  customer: string;
  pId: number;
  bName: string;
  productCode: string;
  product: string;
  sumCompanyCnt: number;
  sumStoreCnt: number;
  lbDate: string;
  companyStock: number;
  storeStock: number;
  productExp: string;
  cnt: number;
  offer: number;
  cost: number;
  dcrmntPrcnt: number;
  dcrmnt: number;
  taxValue: number;
  total: number;
  dtlDsc: string;
  del: boolean;
  recieptId: number;
  recieptDsc: string;
}

export interface IndentDtlTable extends IndentDtl {
  icons: ReactNode;
  productAutoComplete: ReactNode;
}

export interface InvoiceReceiptState {
  mrsId: number;
  indentMrsResponse: IndentMrsResponse;
  setIndentMrsResponse: (indentMrsResponse: IndentMrsResponse) => void;
  setField: (field: string, value: any) => void;
}
/*
  5943
  0	
Response body
Download
{
  "err": 0,
  "msg": null,
  "indents": [
    {
      "id": 5958,
      "ordr": 0,
      "ordrId": 5944,
      "payDuration": 0,
      "mrsId": 5943,
      "dat": "1404/4/1",
      "tim": "09:36",
      "cId": 31496,
      "srName": "شرکت داروسازی سیمرغ داروی عطار: داروسازی سیمرغ داروی عطار",
      "dsc": "تست",
      "usrName": "برنامه نویس",
      "flwId": 4667441,
      "flowMapName": "دریافت پیش فاکتور",
      "salesPriceId": 1,
      "salesPriceTitle": "پخش",
      "saleFDate": "1404/04/01",
      "saleTDate": "1404/04/01"
    }
  ],
  "indentDtls": [
    {
      "id": 60281,
      "ordr": 0,
      "custId": 0,
      "customer": null,
      "pId": 642,
      "bName": "فدك",
      "productCode": "117104",
      "product": "117104: فدک پارافین خوراکی",
      "sumCompanyCnt": 0,
      "sumStoreCnt": 0,
      "lbDate": "",
      "companyStock": 0,
      "storeStock": 0,
      "productExp": null,
      "cnt": 10,
      "offer": 2,
      "cost": 100000,
      "dcrmntPrcnt": 0,
      "dcrmnt": 0,
      "taxValue": 0,
      "total": 1000000,
      "dtlDsc": "تست",
      "del": false,
      "recieptId": 0,
      "recieptDsc": ""
    },
    {
      "id": 60282,
      "ordr": 0,
      "custId": 0,
      "customer": null,
      "pId": 645,
      "bName": "فدك",
      "productCode": "117107",
      "product": "117107: فدك روغن زیتون موضعی 50 گرمی",
      "sumCompanyCnt": 0,
      "sumStoreCnt": 0,
      "lbDate": "",
      "companyStock": 0,
      "storeStock": 0,
      "productExp": null,
      "cnt": 15,
      "offer": 3,
      "cost": 150000,
      "dcrmntPrcnt": 0,
      "dcrmnt": 0,
      "taxValue": 0,
      "total": 2250000,
      "dtlDsc": "",
      "del": false,
      "recieptId": 0,
      "recieptDsc": ""
    },
    {
      "id": 60283,
      "ordr": 0,
      "custId": 0,
      "customer": null,
      "pId": 1354,
      "bName": "دينا",
      "productCode": "37114",
      "product": "37114: دينا گوش پاک کن بزرگسال 100 عددی",
      "sumCompanyCnt": 0,
      "sumStoreCnt": 0,
      "lbDate": "",
      "companyStock": 0,
      "storeStock": 0,
      "productExp": null,
      "cnt": 2,
      "offer": 0,
      "cost": 20000,
      "dcrmntPrcnt": 0,
      "dcrmnt": 0,
      "taxValue": 0,
      "total": 40000,
      "dtlDsc": "",
      "del": false,
      "recieptId": 0,
      "recieptDsc": ""
    },
    {
      "id": 60284,
      "ordr": 0,
      "custId": 0,
      "customer": null,
      "pId": 1125,
      "bName": "دينا",
      "productCode": "37116",
      "product": "37116: دينا  نخ دندان نازک نعنایی 50 متری ",
      "sumCompanyCnt": 0,
      "sumStoreCnt": 0,
      "lbDate": "",
      "companyStock": 0,
      "storeStock": 0,
      "productExp": null,
      "cnt": 3,
      "offer": 0,
      "cost": 500000,
      "dcrmntPrcnt": 0,
      "dcrmnt": 0,
      "taxValue": 0,
      "total": 1500000,
      "dtlDsc": "",
      "del": false,
      "recieptId": 0,
      "recieptDsc": ""
    },
    {
      "id": 60285,
      "ordr": 0,
      "custId": 0,
      "customer": null,
      "pId": 10825,
      "bName": "سيمرغ",
      "productCode": "1291004",
      "product": "1291004: سیمرغ قرص ملاتوسیم 3 میلی گرم ملاتونین 30 عددی ",
      "sumCompanyCnt": 0,
      "sumStoreCnt": 0,
      "lbDate": "1404/01/31",
      "companyStock": 822,
      "storeStock": 0,
      "productExp": null,
      "cnt": 5,
      "offer": 1,
      "cost": 767558,
      "dcrmntPrcnt": 0,
      "dcrmnt": 0,
      "taxValue": 0,
      "total": 3837790,
      "dtlDsc": "",
      "del": false,
      "recieptId": 0,
      "recieptDsc": ""
    },
    {
      "id": 60286,
      "ordr": 0,
      "custId": 0,
      "customer": null,
      "pId": 10917,
      "bName": "سيمرغ",
      "productCode": "1291008",
      "product": "1291008: سیمرغ قرص سیموویت ویتامین B 12 مکمل 1000 میکروگرم 30 عددی",
      "sumCompanyCnt": 0,
      "sumStoreCnt": 0,
      "lbDate": "1403/07/08",
      "companyStock": 81,
      "storeStock": 0,
      "productExp": null,
      "cnt": 7,
      "offer": 2,
      "cost": 1287000,
      "dcrmntPrcnt": 0,
      "dcrmnt": 0,
      "taxValue": 0,
      "total": 9009000,
      "dtlDsc": "",
      "del": false,
      "recieptId": 0,
      "recieptDsc": ""
    }
  ]
}
  */
