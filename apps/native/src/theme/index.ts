export const colors = {
  primary: "#FF6B00",
  primaryLight: "#FFF0E6",

  backgroundFade: "#E9EDF0",

  background: "#F5F5F5",
  surface: "#FFFFFF",

  blue: "#083C90",

  textBlack: "#000000",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",

  statusPending: "#F59E0B",
  statusPendingBg: "#FFFBEB",
  statusInTransit: "#3B82F6",
  statusInTransitBg: "#EFF6FF",
  statusDelivered: "#10B981",
  statusDeliveredBg: "#ECFDF5",

  buttonGreen: "#49b17d",

  border: "#E5E7EB",
  error: "#EF4444",
  errorBg: "#FEF2F2",
  white: "#FFFFFF",
  disabled: "#D1D5DB",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  fontSizeXs: 11,
  fontSizeSm: 12,
  fontSizeMd: 14,
  fontSizeLg: 16,
  fontSizeXl: 18,
  fontSizeXxl: 22,

  fontWeightRegular: "400" as const,
  fontWeightMedium: "500" as const,
  fontWeightSemiBold: "600" as const,
  fontWeightBold: "700" as const,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
};

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
};
