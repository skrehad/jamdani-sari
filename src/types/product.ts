export interface IProductImage {
  url: string;
  type: string;
}

type ProductCategory = "PURE_COTTON" | "HALF_SILK";
type ProductStatus = "IN_STOCK" | "PRE_ORDER";

export interface IProduct {
  id: string; // assuming your DB gives an ID
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  discount?: number;
  blouse: string;
  ghuri: string;
  length: string;
  care: string;
  stock: number;
  status: ProductStatus;
  images?: IProductImage[];
  createdAt?: string; // optional timestamps
  updatedAt?: string;
}

export interface ImageWithPreview {
  file: File;
  preview: string;
  type: string;
}
