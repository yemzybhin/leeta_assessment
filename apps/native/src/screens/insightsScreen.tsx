import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useOrders } from "@repo/ui";
import { colors, spacing, radius } from "../theme";
import { OrdersHeader } from "../components/headerActions";
import { StatPill } from "../components/statsPill";

const InsightScreen: React.FC = () => {
  const { allOrders, loading, refresh } = useOrders();

  const counts = useMemo(
    () => ({
      all: allOrders.length,
    }),
    [allOrders],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={refresh}
          disabled={loading}
          style={styles.refreshBtn}
        >
          <Ionicons
            name="refresh-outline"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <OrdersHeader
        loading={loading}
        total={counts.all}
        title="Insights"
        lable={"Track your orders and performance trends\nin real time"}
        hasProps={false}
      />

      <View style={styles.statsStrip}>
        <StatPill
          image={require("../../assets/icons/order.png")}
          value={counts.all}
          label="Today's Orders"
          flex={1}
        />

        <StatPill
          image={require("../../assets/icons/card.png")}
          value={"₦3,590,938"}
          label="Today's Earnings"
          flex={2}
          onPress={() => console.log("Earnings tapped")}
        />
      </View>

      <View style={styles.statsStrip}>
        <StatPill
          image={require("../../assets/icons/people.png")}
          value={counts.all}
          label="Today's Orders"
          flex={1.4}
        />

        <StatPill
          image={require("../../assets/icons/star.png")}
          value={"4.0"}
          label="Ratings"
          flex={2}
          onPress={() => console.log("Earnings tapped")}
        />
      </View>

      <View style={styles.statsStrip}>
        <StatPill
          image={require("../../assets/icons/card.png")}
          value={"₦3,590,938"}
          label="Today's Earnings"
          flex={2}
          onPress={() => console.log("Earnings tapped")}
        />
        <StatPill
          image={require("../../assets/icons/truck.png")}
          value={counts.all}
          label="Avg. Delivery Time"
          flex={1.5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: spacing.lg,
  },

  refreshBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  statsStrip: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});

export default InsightScreen;
