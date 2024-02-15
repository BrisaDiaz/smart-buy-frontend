export type Market =
  | 'cordiez'
  | 'coto'
  | 'dia'
  | 'disco'
  | 'hiperlibertad'
  | 'jumbo'
  | 'la anonima online'
  | 'maxiconsumo'
  | 'super mami'
  | 'vea';
export interface Product {
  price: number;
  title: string;
  image: string;
  link: string;
  market: Market;
}
export interface TrackedProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  link: string;
  market: Market;
  createdAt: string;
  updatedAt: string;
}

export interface TrackedPrice {
  createdAt: string;
  value: number;
  productId: string;
}
