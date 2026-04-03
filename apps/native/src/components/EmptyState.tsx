import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme";
import { EmptyStateProps } from '@repo/ui'

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No orders found",
}) => (
  <View style={styles.container} testID="empty-state">
    <Text style={styles.icon}>Ewo!</Text>
    <Text style={styles.title}>No Orders Yet</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xxxl * 2,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSizeXl,
    fontWeight: typography.fontWeightSemiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: typography.fontSizeMd,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});
