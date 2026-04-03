import React from "react";
import "../styles/EmptyState.css";
import { EmptyStateProps } from '@repo/ui'


export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No orders found",
}) => (
  <div className="emptyState" data-testid="empty-state">
    <div className="emptyIcon">Ewo!</div>
    <div className="emptyTitle">No Orders Yet</div>
    <div className="emptyMessage">{message}</div>
  </div>
);
