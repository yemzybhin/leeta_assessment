import React from "react";
import "../styles/FilterTabs.css";

export type OrderStatus = "pending" | "in_transit" | "delivered"; // adjust if needed
type FilterOption = OrderStatus | "all";

interface FilterTabsProps {
  active: FilterOption;
  onChange: (status: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

const TABS: { key: FilterOption; label: string }[] = [
  { key: "pending", label: "New" },
  { key: "in_transit", label: "Accepted" },
  { key: "delivered", label: "Completed" },
  { key: "all", label: "All" },
];

export const FilterTabs: React.FC<FilterTabsProps> = ({
  active,
  onChange,
  counts,
}) => (
  <div className="filterTabs" data-testid="filter-tabs">
    {TABS.map((tab) => {
      const isActive = tab.key === active;
      return (
        <button
          key={tab.key}
          className={`tab ${isActive ? "tabActive" : ""}`}
          onClick={() => onChange(tab.key)}
          data-testid={`filter-tab-${tab.key}`}
          aria-label={`Filter by ${tab.label}`}
          aria-pressed={isActive}
        >
          <span className={`tabLabel ${isActive ? "tabLabelActive" : ""}`}>
            {tab.label}
          </span>
          {counts[tab.key] !== undefined && (
            <span className={`badge ${isActive ? "badgeActive" : ""}`}>
              {counts[tab.key]}
            </span>
          )}
        </button>
      );
    })}
  </div>
);
