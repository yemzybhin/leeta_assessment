import React, { useState } from "react";
import "../styles/ordersHeader.css";
import { BellIcon, BellAlertIcon } from "@heroicons/react/24/solid";

interface OrdersHeaderProps {
  loading: boolean;
  total: number;
  title: string;
  lable: string;
  hasProps: boolean;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  loading,
  total,
  title,
  lable,
  hasProps,
}) => {
  const [enabled, setEnabled] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const toggleSwitch = () => setEnabled(!enabled);

  return (
    <div className="orders-header">
      <div className="title-row">
        <div className="title">{title}</div>
        <div className="subtitle">{loading ? "Loading…" : lable}</div>
      </div>

      {hasProps && (
        <div className="actions">
          {/* Custom Pill Switch */}
          <div
            className={`switch-track ${enabled ? "enabled" : ""}`}
            onClick={toggleSwitch}
          >
            <div className="switch-thumb" />
          </div>

          <div
            className="bell-wrapper"
            onClick={() => setHasNotification(!hasNotification)}
          >
            {hasNotification ? (
              <BellAlertIcon className="bell-icon" />
            ) : (
              <BellIcon className="bell-icon" />
            )}
            {hasNotification && <div className="badge" />}
          </div>
        </div>
      )}
    </div>
  );
};
