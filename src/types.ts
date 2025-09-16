export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerInfo;
  status: 'pending' | 'accepted' | 'preparing' | 'delivery' | 'completed';
  createdAt: Date;
  paymentMethod: 'card' | 'cash' | 'pix';
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type Page = 'home' | 'cart' | 'checkout' | 'admin' | 'confirmation';