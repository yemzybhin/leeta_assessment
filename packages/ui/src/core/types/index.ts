export type OrderStatus = "pending" | "in_transit" | "delivered";

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
  filterStatus: OrderStatus | "all";
  setFilterStatus: (status: OrderStatus | "all") => void;
}

export interface ToastProps {
  message: string;
  type?: "success" | "error";
  visible: boolean;
}

export interface StatPillProps {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
  flex?: number;
  onClick?: () => void;
  formatNumber?: boolean;
}

export interface OrdersHeaderProps {
  loading: boolean;
  total: number;
  title: string;
  lable: string;
  hasProps: boolean;
}

export type FilterOption = OrderStatus | "all";

export interface OrderCardProps {
  order: Order;
  onMarkDelivered: (id: string) => void;
  onMarkRejected: (id: string) => void;
  gasPrice: number;
  isUpdating: boolean;
}

export type SkeletonBlockProps = {
  width: number | string;
  height: number;
};

export interface FilterTabsProps {
  active: FilterOption;
  onChange: (status: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

export interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export interface EmptyStateProps {
  message?: string;
}
