import { Order, OrderStatus } from "../types";
import { mockOrders } from "../data/mockOrders";

let orderStore: Order[] = [...mockOrders];

const FETCH_DELAY_MS = 1200;
const UPDATE_DELAY_MS = 700;

export let __simulateError = false;
export const setSimulateError = (value: boolean) => {
  __simulateError = value;
};

export const fetchOrders = (): Promise<Order[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (__simulateError) {
        reject(new Error("Network request failed"));
        return;
      }
      resolve([...orderStore]);
    }, FETCH_DELAY_MS);
  });
};

export const updateOrderStatus = (
  id: string,
  status: OrderStatus,
): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (__simulateError) {
        reject(new Error("Failed to update order"));
        return;
      }

      const index = orderStore.findIndex((o) => o.id === id);
      if (index === -1) {
        reject(new Error(`Order ${id} not found`));
        return;
      }

      orderStore[index] = { ...orderStore[index], status };
      resolve({ ...orderStore[index] });
    }, UPDATE_DELAY_MS);
  });
};

export const resetOrderStore = () => {
  orderStore = [...mockOrders];
};
