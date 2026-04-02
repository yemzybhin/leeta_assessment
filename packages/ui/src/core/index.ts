export * from "./types";
export * from "./hooks";
export * from "./api";
export * from "./data";
export * from "./logger";

import { OrderStatus } from "./types";

export const formatTimestamp = (iso: string): string => {
  const date = new Date(iso);

  const day = date.getDate();
  const year = date.getFullYear();

  const month = date.toLocaleDateString("en-NG", {
    month: "short",
  });

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const formattedTime = `${hours}:${minutes} ${ampm[0]}${ampm[1]}`;

  return `${getOrdinal(day)} ${month}, ${year} | ${formattedTime}`;
};

export const getStatusMeta = (
  status: OrderStatus,
): { label: string; colorKey: "amber" | "blue" | "green" } => {
  switch (status) {
    case "pending":
      return { label: "Pending", colorKey: "amber" };
    case "in_transit":
      return { label: "In Transit", colorKey: "blue" };
    case "delivered":
      return { label: "Delivered", colorKey: "green" };
  }
};
