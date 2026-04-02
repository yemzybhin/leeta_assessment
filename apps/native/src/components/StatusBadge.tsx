import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { OrderStatus, getStatusMeta } from "@repo/ui";
import { colors, typography, spacing, radius } from "../theme";

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  amber: { bg: colors.statusPendingBg, text: colors.statusPending },
  blue: { bg: colors.statusInTransitBg, text: colors.statusInTransit },
  green: { bg: colors.statusDeliveredBg, text: colors.statusDelivered },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { label, colorKey } = getStatusMeta(status);
  const { bg, text } = statusStyles[colorKey];

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <View style={[styles.dot, { backgroundColor: text }]} />
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignSelf: "flex-start",
    gap: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightMedium,
  },
});
