"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useOrders, Order, OrderStatus } from "@repo/ui";
import { OrderCard } from "./ordercard";
import { LoadingState } from "./loadingstate";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { FilterTabs } from "./FilterTabs";
import { Toast, useToast } from "./toast";
import { OrdersHeader } from "./OrdersHeaders";
import { StatPill } from "./statpill";

import {
  ArrowPathIcon,
  FireIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";

import "../styles/orders.css";

type FilterOption = OrderStatus | "all";

const UpdatePricePopup: React.FC<{
  visible: boolean;
  onClose: () => void;
  currentPrice: number;
  onUpdate: (newPrice: number) => void;
}> = ({ visible, onClose, currentPrice, onUpdate }) => {
  const [price, setPrice] = useState(currentPrice.toString());

  useEffect(() => setPrice(currentPrice.toString()), [currentPrice]);

  const handleUpdate = () => {
    const numPrice = parseInt(price.replace(/,/g, ""), 10);
    if (!isNaN(numPrice)) {
      onUpdate(numPrice);
      onClose();
    }
  };

  const formatNumber = (num: string) =>
    num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Update Gas Price</h2>
        <input
          type="text"
          value={price}
          onChange={(e) =>
            setPrice(formatNumber(e.target.value.replace(/,/g, "")))
          }
          className="popup-input"
        />
        <button className="popup-update-btn" onClick={handleUpdate}>
          Update
        </button>
        <button className="popup-cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const OrdersScreenTest: React.FC = () => {
  const {
    priceperkg,
    setPricePerKg,
    orders,
    allOrders,
    loading,
    error,
    updatingId,
    refresh,
    markToTransit,
    markAsRejected,
    filterStatus,
    setFilterStatus,
  } = useOrders();

  const { toast, showToast } = useToast();
  const [showPopup, setShowPopup] = useState(false);

  const formatToPrice = (num: number) => num.toLocaleString();

  const counts = useMemo(
    () => ({
      all: allOrders.length,
      pending: orders.filter((o: Order) => o.status === "pending").length,
      in_transit: orders.filter((o: Order) => o.status === "in_transit").length,
      delivered: orders.filter((o: Order) => o.status === "delivered").length,
    }),
    [orders, allOrders.length],
  );

  const handleMarkDelivered = async (id: string) => {
    try {
      await markToTransit(id);
      showToast("Order marked to transit!", "success");
    } catch {
      showToast("Failed to update order. Please retry.", "error");
    }
  };

  const handleMarkRejected = async (id: string) => {
    try {
      await markAsRejected(id);
      showToast("Order marked as rejected!", "success");
    } catch {
      showToast("Failed to update order. Please retry.", "error");
    }
  };

  const Header = () => (
    <>
      <div className="stats-strip">
        <StatPill
          icon={<FireIcon className="stat-icon" />}
          value={counts.all}
          label="Today's Orders"
          onClick={() => setFilterStatus("all")}
        />
        <StatPill
          icon={<CreditCardIcon className="stat-icon" />}
          value={"₦3,590,938"}
          label="Today's Earnings"
        />
      </div>

      <div className="price-card">
        <div>
          <p className="price-label">Gas Price LPG</p>
          <p className="price-value">₦{formatToPrice(priceperkg)}</p>
        </div>
        <button className="update-price-btn" onClick={() => setShowPopup(true)}>
          Update price
        </button>
      </div>

      <div className="filter-tabs">
        <FilterTabs
          active={filterStatus as FilterOption}
          onChange={setFilterStatus}
          counts={counts}
        />
      </div>
    </>
  );

  return (
    <div className="orders-screen">
      <div className="header-actions">
        <button className="refresh-btn" onClick={refresh} disabled={loading}>
          <ArrowPathIcon className="icon-small" />
        </button>
      </div>

      <OrdersHeader
        loading={loading}
        total={counts.all}
        title="Orders"
        lable="GasHub Enterprise"
        hasProps
      />

      {Header()}

      <div className="orders-list">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={refresh} />}
        {!loading && !error && orders.length === 0 && (
          <EmptyState
            message={
              filterStatus === "all"
                ? "No orders assigned yet."
                : `No ${filterStatus.replace("_", " ")} orders right now.`
            }
          />
        )}
        {!loading &&
          !error &&
          orders.map((order: Order) => (
            <OrderCard
              key={order.id}
              order={order}
              gasPrice={priceperkg}
              onMarkDelivered={handleMarkDelivered}
              onMarkRejected={handleMarkRejected}
              isUpdating={updatingId === order.id}
            />
          ))}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />

      <UpdatePricePopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        currentPrice={priceperkg}
        onUpdate={(newPrice) => setPricePerKg(newPrice)}
      />
    </div>
  );
};

export default OrdersScreenTest;
