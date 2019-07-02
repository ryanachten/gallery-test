export type Action = {
  type: string;
  payload?: any;
  error?: any;
};

export enum Size {
  ALL = "",
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL"
}

export type Product = {
  index: number;
  isSale: boolean;
  isExclusive: boolean;
  price: string;
  productImage: string;
  productName: string;
  size: Size[];
};
