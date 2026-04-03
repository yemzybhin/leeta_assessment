import React from "react";
import "../styles/statPill.css";

interface StatPillProps {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
  flex?: number;
  onClick?: () => void;
  formatNumber?: boolean;
}

export const StatPill: React.FC<StatPillProps> = ({
  value,
  label,
  icon,
  flex,
  onClick,
  formatNumber = true,
}) => {
  const displayValue =
    typeof value === "number" && formatNumber ? value.toLocaleString() : value;

  return (
    <div
      className={`stat-pill ${onClick ? "clickable" : ""}`}
      style={{ flex }}
      onClick={onClick}
    >
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-label">{label}</div>
      <div className="stat-value">{displayValue}</div>
    </div>
  );
};