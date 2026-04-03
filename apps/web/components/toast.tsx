import React, { useEffect, useState } from "react";
import "../styles/toast.css";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  visible,
}) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div
      className={`toast ${type} ${visible ? "show" : ""}`}
      aria-hidden={!visible}
    >
      <span className="icon">{type === "success" ? "✓" : "✕"}</span>
      <span className="message">{message}</span>
    </div>
  );
};

// Hook to manage toast
export const useToast = () => {
  const [toast, setToast] = useState({
    message: "",
    type: "success" as "success" | "error",
    visible: false,
  });
  let timerRef: number | null = null;

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    if (timerRef) clearTimeout(timerRef);
    setToast({ message, type, visible: true });
    timerRef = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return { toast, showToast };
};
