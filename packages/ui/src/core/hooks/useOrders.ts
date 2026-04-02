import { useState, useEffect, useCallback } from "react";
import { Order, OrderStatus, UseOrdersReturn } from "../types";
import { fetchOrders, updateOrderStatus } from "../api/ordersApi";
import { filter } from "minimatch";

export const useOrders = (): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [priceperkg, setPricePerKg] = useState<number>(1500);
  const [deliveryFee, setDeliveryFee] = useState<number>(200);
  const [servicecharge, setServiceCharge] = useState<number>(100);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(`Failed to load orders: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const markAsDelivered = useCallback(async (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "delivered" } : o)),
    );
    setUpdatingId(id);

    try {
      const updated = await updateOrderStatus(id, "delivered");

      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "pending" } : o)),
      );
      throw err;
    } finally {
      setUpdatingId(null);
    }
  }, []);

  const markToTransit = useCallback(async (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "in_transit" } : o)),
    );
    setUpdatingId(id);

    try {
      const updated = await updateOrderStatus(id, "in_transit");
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "pending" } : o)),
      );
      throw err;
    } finally {
      setUpdatingId(null);
    }
  }, []);

  const markAsRejected = useCallback(async (id: string) => {
    let removedOrder: Order | undefined;

    try {
      setOrders((prev) => {
        const orderToRemove = prev.find((o) => o.id === id);
        removedOrder = orderToRemove;
        return prev.filter((o) => o.id !== id);
      });

      setUpdatingId(id);
    } catch (err) {
      if (removedOrder) {
        setOrders((prev) => [removedOrder!, ...prev]);
      }
      throw err;
    } finally {
      setUpdatingId(null);
    }
  }, []);

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return {
    orders: filteredOrders,
    allOrders: orders,
    priceperkg,
    setPricePerKg,
    deliveryFee,
    setDeliveryFee,
    servicecharge,
    setServiceCharge,
    loading,
    error,
    updatingId,
    refresh: loadOrders,
    markAsRejected,
    markAsDelivered,
    markToTransit,
    filterStatus,
    setFilterStatus,
  };
};
