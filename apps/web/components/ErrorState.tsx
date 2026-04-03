import React from "react";
import "../styles/Errorstate.css";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="errorState" data-testid="error-state">
    <div className="errorIcon">Ewo! Err</div>
    <div className="errorTitle">Something went wrong</div>
    <div className="errorMessage">{message}</div>
    <button
      className="retryButton"
      onClick={onRetry}
      data-testid="retry-button"
      aria-label="Retry loading orders"
    >
      Try Again
    </button>
  </div>
);