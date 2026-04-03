import React from "react";
import "../styles/ordercrad.css";
import {
  CurrencyBangladeshiIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import GasIcon from "../public/assets/icons/gas.png";

import { Order } from "@repo/ui";
import Image from "next/image";

interface OrderCardProps {
  order: Order;
  onMarkDelivered: (id: string) => void;
  onMarkRejected: (id: string) => void;
  gasPrice: number;
  isUpdating: boolean;
}

const timeAgo = (date: string | number | Date) => {
  const now = new Date().getTime();
  const past = new Date(date).getTime();
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const formatToPrice = (num: number, price: number) =>
  (num * price).toLocaleString();

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onMarkDelivered,
  onMarkRejected,
  gasPrice,
  isUpdating,
}) => {
  const canAct = order.status !== "delivered";
  const canAccept = order.status === "pending";

  const handleNavigate = () => {
    console.log("Ewo!");
  };

  return (
    <div className="card" onClick={handleNavigate}>
      <div className="topRow">
        <div className="productBox">
          <Image
            src={GasIcon}
            alt="Product"
            width={20}
            height={20}
            className="productImage"
          />
        </div>

        <div className="info">
          <div className="nameRow">
            <img src={order.avatar} alt="Avatar" className="avatar" />
            <span className="name">{order.customerName.split(" ")[0]}</span>
            <span className="type">- Refill</span>
          </div>

          <span className="time">Requested {timeAgo(order.createdAt)}</span>

          <div className="metaRow">
            <span className="meta">{order.quantity} kg</span>
            <span className="divider">|</span>

            <div className="metaItem">
              <CurrencyBangladeshiIcon className="heroicon" />
              <span className="meta">
                ₦{formatToPrice(order.quantity, gasPrice)}
              </span>
            </div>

            <div className="metaItem">
              <MapPinIcon className="heroicon" />
              <span className="meta">{order.distance} km</span>
            </div>
          </div>
        </div>

        <div className="tag">
          <span className="tagText">Pick up & refill</span>
        </div>
      </div>

      {canAct ? (
        <div className="actions">
          {canAccept && (
            <button
              className="acceptBtn"
              onClick={(e) => {
                e.stopPropagation();
                onMarkDelivered(order.id);
              }}
              disabled={isUpdating}
            >
              {isUpdating ? <div className="spinner" /> : <span>Accept</span>}
            </button>
          )}
          <button
            className="rejectBtn"
            onClick={(e) => {
              e.stopPropagation();
              onMarkRejected(order.id);
            }}
            disabled={isUpdating}
          >
            Reject
          </button>
        </div>
      ) : (
        <span className="delivered">Delivered</span>
      )}
    </div>
  );
};
