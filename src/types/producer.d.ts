interface RpProducer {
  id: number;
  strFrmId: number;
  amnt: number;
}

interface  RpProduct {
  id: number;
  name: string;
  cnt: number;
  total: number;
  offerCnt: number;
  rpProducers: RpProducer[];
}

interface Producer {
  id: number;
  name: string;
}

export interface ProducerList {
  err: number;
  msg: string;
  producers:Producer[];
  rpProducts: RpProduct[];
}

export interface ProducerListRequest {
  accSystem: number;
  accYear: number;
  brandId: number;
  sanadKind: number;
  fDate: string;
  tDate: string;
}

export interface ProducerState extends ProducerListRequest {
  producerList: ProducerList;
  setField: (field: keyof ProducerListRequest, value: any) => void;
  setProducerList: (producerList: ProducerList) => void;
}
