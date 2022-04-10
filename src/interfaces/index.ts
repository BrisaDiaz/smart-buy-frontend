export interface Product {
  price: number;
  title: string;
  image: string;
  link: string;
  market: string;
}
export interface TrackedProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  link: string;
  market: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackedPrice {
  createdAt: string;
  value: number;
  productId: string;
}
