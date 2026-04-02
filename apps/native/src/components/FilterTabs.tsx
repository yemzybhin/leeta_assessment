import React from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { OrderStatus } from "@repo/ui";
import { colors, spacing, typography, radius } from "../theme";

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
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
    testID="filter-tabs"
  >
    {TABS.map((tab) => {
      const isActive = tab.key === active;
      return (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, isActive && styles.tabActive]}
          onPress={() => onChange(tab.key)}
          testID={`filter-tab-${tab.key}`}
          accessibilityLabel={`Filter by ${tab.label}`}
          accessibilityState={{ selected: isActive }}
        >
          <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    marginBottom: spacing.sm,
    flex: 1,
    backgroundColor: colors.backgroundFade,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  tabActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  tabLabel: {
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightMedium,
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.textBlack,
  },
  badge: {
    backgroundColor: colors.disabled,
    borderRadius: radius.md,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeActive: {
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: typography.fontSizeXs,
    fontWeight: typography.fontWeightSemiBold,
    color: colors.textSecondary,
  },
  badgeTextActive: {
    color: colors.white,
  },
});
