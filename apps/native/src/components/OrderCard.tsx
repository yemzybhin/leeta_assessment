import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { Order, timeAgo, OrderCardProps } from "@repo/ui";
import { colors, spacing, typography, radius } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onMarkDelivered,
  onMarkRejected,
  gasPrice,
  isUpdating,
}) => {
  const router = useRouter();

  const canAct = order.status !== "delivered";
  const canAccept = order.status === "pending";

  const handleNavigate = () => {
    router.push(`/order-details/${order.id}`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleNavigate}
      style={styles.card}
    >
      <View style={styles.topRow}>
        {/* Product Image */}
        <View style={styles.productBox}>
          <Image
            source={require("../../assets/icons/gas.png")}
            style={styles.productImage}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Image source={{ uri: order.avatar }} style={styles.avatar} />
            <Text style={styles.name} numberOfLines={1}>
              {order.customerName.split(" ")[0]}
            </Text>
            <Text style={styles.type}>- Refill</Text>
          </View>

          <Text style={styles.time}>Requested {timeAgo(order.createdAt)}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>{order.quantity} kg</Text>

            <Text style={{ color: colors.backgroundFade }}>|</Text>

            <View style={styles.metaItem}>
              <Ionicons
                name="cash-outline"
                size={14}
                color={colors.textSecondary}
              />
              <Text style={styles.meta}>
                ₦{formatToPrice(order.quantity, gasPrice)}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons
                name="navigate-outline"
                size={14}
                color={colors.textSecondary}
              />
              <Text style={styles.meta}>{order.distance} km</Text>
            </View>
          </View>
        </View>

        <View style={styles.tag}>
          <Text style={styles.tagText}>Pick up & refill</Text>
        </View>
      </View>


      {canAct ? (
        <View style={styles.actions}>
          {canAccept && (
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={(e) => {
                e.stopPropagation();
                onMarkDelivered(order.id);
              }}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.acceptText}>Accept</Text>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={(e) => {
              e.stopPropagation();
              onMarkRejected(order.id);
            }}
            disabled={isUpdating}
          >
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.delivered}>Delivered</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    alignItems: "flex-start",
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  topRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
  },

  productBox: {
    width: 55,
    height: 55,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  productImage: {
    width: 28,
    height: 28,
  },

  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightBold,
    color: colors.textPrimary,
  },

  type: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    marginLeft: 4,
  },

  time: {
    fontSize: typography.fontSizeXs,
    color: colors.textMuted,
    marginTop: 2,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.sm,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  meta: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeightMedium,
  },

  tag: {
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },

  tagText: {
    fontSize: typography.fontSizeXs,
    color: colors.primary,
  },

  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },

  acceptBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },

  acceptText: {
    color: colors.white,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeMd,
  },

  rejectBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },

  rejectText: {
    color: colors.primary,
    fontWeight: typography.fontWeightMedium,
  },

  delivered: {
    marginTop: spacing.md,
    textAlign: "center",
    color: colors.statusDelivered,
    fontWeight: typography.fontWeightBold,
  },
});

const formatToPrice = (num: number, price: number) =>
  (num * price).toLocaleString();
