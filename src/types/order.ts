export interface IOrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: IOrderItem[];
}

export interface IOrderRow {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: {
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}
