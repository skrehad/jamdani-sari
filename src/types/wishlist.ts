export interface IWishlist {
  id: string;
  userId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    category: string;
  };
}
