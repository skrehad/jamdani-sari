export interface Saree {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  newArrival?: boolean;
}
