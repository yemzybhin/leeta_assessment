export type OrderStatus = 'pending' | 'in_transit' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  price: string;
  distance: string;
  quantity: number;
  status: OrderStatus;
  createdAt: string;
  avatar: string;
}

export interface UseOrdersReturn {
  orders: Order[];
  allOrders: Order[];
  deliveryFee: number;
  servicecharge: number;
  priceperkg: number;
  setPricePerKg: (price: number) => void;
  setDeliveryFee: (fee: number) => void;
  setServiceCharge: (charge: number) => void;
  loading: boolean;
  error: string | null;
  updatingId: string | null;
  refresh: () => void;
  markAsDelivered: (id: string) => Promise<void>;
  markAsRejected: (id: string) => Promise<void>;
  markToTransit: (id: string) => Promise<void>;
  filterStatus: OrderStatus | 'all';
  setFilterStatus: (status: OrderStatus | 'all') => void;
}
