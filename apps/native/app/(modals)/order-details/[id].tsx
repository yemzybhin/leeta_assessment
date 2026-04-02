import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors, spacing, typography, radius } from "../../../src/theme";
import { useOrders, Order, formatTimestamp } from "@repo/ui";
import { LoadingState } from "../../../src/components/LoadingState";
import { ErrorState } from "../../../src/components/ErrorState";

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const {
    deliveryFee,
    servicecharge,
    priceperkg,
    orders,
    loading,
    error,
    refresh,
    markAsDelivered,
    updatingId,
  } = useOrders();

  const order: Order = useMemo(
    () => orders.filter((o: Order) => o.id === id)[0],
    [orders, id],
  );

  const [otp, setOtp] = useState(["", "", "", ""]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  if (!order) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Order not found</Text>
      </SafeAreaView>
    );
  }

  const formatPrice = (num: number) => `₦${num.toLocaleString()}`;

  const total = order.quantity * (priceperkg + deliveryFee + servicecharge);

  const currentStep =
    order.status === "pending"
      ? 1
      : order.status === "in_transit"
        ? 2
        : order.status === "delivered"
          ? 4
          : 1;

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  const handleComplete = async () => {
    try {
      await markAsDelivered(order.id);
      router.back();
    } catch {
      console.log("Failed to complete order");
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={25} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={[styles.rowBetween, { paddingHorizontal: 0 }]}>
            <Text style={styles.name}>{order.customerName}</Text>
            <Text style={styles.issue}>Report an issue</Text>
          </View>

          <Text style={styles.subText}>{formatTimestamp(order.createdAt)}</Text>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              marginTop: spacing.sm,
              alignItems: "center",
              paddingTop: spacing.md,
              paddingBottom: spacing.md,
            }}
          >
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: typography.fontSizeLg,
                fontWeight: typography.fontWeightBold,
              }}
            >
              ₦{total.toLocaleString()}
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: typography.fontSizeMd,
                fontWeight: typography.fontWeightRegular,
              }}
            >
              {" "}
              | Order AH56746780
            </Text>
          </View>

          <View style={styles.progressWrapper}>
            <View style={styles.progressBaseLine} />
            <View style={styles.progressRow}>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.step}>
                  <View
                    style={[
                      styles.circle,
                      i < currentStep && styles.completedCircle,
                      i === currentStep && styles.activeCircle,
                    ]}
                  >
                    {i < currentStep && (
                      <Ionicons name="checkmark" size={10} color="#fff" />
                    )}

                    {i === currentStep && (
                      <Ionicons name="remove" size={12} color="#fff" />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              marginBottom: spacing.sm,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.textMuted,
                fontSize: typography.fontSizeSm,
                fontWeight: typography.fontWeightMedium,
              }}
            >
              12:40 PM |
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                fontSize: typography.fontSizeSm,
                fontWeight: typography.fontWeightMedium,
              }}
            >
              {order.status}
            </Text>
          </View>
        </View>

        {order.status !== "delivered" && (
          <>
            <Text style={styles.sectionTitle}>Enter code from Customer</Text>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  maxLength={1}
                  keyboardType="number-pad"
                  style={styles.otpInput}
                />
              ))}
            </View>

            {order.status !== "pending" && (
              <TouchableOpacity
                style={styles.cta}
                onPress={handleComplete}
                disabled={updatingId === order.id}
              >
                <Text style={styles.ctaText}>
                  {updatingId === order.id ? "Completing..." : "Complete Order"}
                </Text>
              </TouchableOpacity>
            )}

            {order.status == "pending" && (
              <TouchableOpacity
                style={[styles.cta, { backgroundColor: colors.disabled }]}
                onPress={() => router.back()}
                disabled={updatingId === order.id}
              >
                <Text style={styles.ctaText}>
                  {updatingId === order.id
                    ? "Completing..."
                    : "Not Accepted Yet"}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { marginHorizontal: 0 }]}>
            Customer details
          </Text>

          <View style={styles.rowBetween}>
            <View
              style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
            >
              <Image
                source={{ uri: order.avatar }}
                style={{ width: 50, height: 50, borderRadius: 30 }}
              />

              <View>
                <Text style={styles.name}>{order.customerName}</Text>
                <Text style={styles.subText}>{order.phone}</Text>
              </View>
            </View>

            <View style={styles.iconRow}>
              <Ionicons name="chatbubble-outline" size={20} />
              <Ionicons name="call-outline" size={20} />
            </View>
          </View>

          <Text
            style={{
              color: colors.textPrimary,
              fontSize: typography.fontSizeLg,
              fontWeight: typography.fontWeightMedium,
              marginTop: spacing.lg,
            }}
          >
            Delivery Address
          </Text>

          <Text style={styles.address}>
            {"No 12, Adeyemi Street, Lekki Phase 1, Lagos"}
          </Text>

          <Text style={styles.distance}>{order.distance}km from you</Text>

          <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
            <Ionicons name="lock-closed" size={16} color={colors.buttonGreen} />
            <Text style={styles.pinInfo}>
              Delivery requires PIN confirmation
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Order items</Text>

        <View style={styles.rowBetween}>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <Image
              source={require("../../../assets/icons/gas.png")}
              style={{ width: 24, height: 24, marginBottom: 4, padding: 20 }}
            />

            <View>
              <Text
                style={{
                  fontSize: typography.fontSizeLg,
                  fontWeight: typography.fontWeightBold,
                }}
              >
                {order.quantity} kg Refill x 1
              </Text>
              <Text
                style={{
                  fontSize: typography.fontSizeSm,
                  fontWeight: typography.fontWeightRegular,
                  color: colors.textSecondary,
                }}
              >
                Vendor bring gas to refill cus...
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: typography.fontSizeLg,
              fontWeight: typography.fontWeightMedium,
            }}
          >
            {formatPrice(order.quantity * priceperkg)}
          </Text>
        </View>
        <View style={styles.card}>
          <InfoRow label="Order #" value={order.id} />
          <InfoRow label="Order type" value="LPG" />
          <InfoRow label="Delivery method" value="On-site refill" green />
          <InfoRow label="Price per kg" value={formatPrice(priceperkg)} />
          <InfoRow label="Estimated arrival" value={order.eta} />
          <InfoRow label="Payment method" value={order.paymentMethod} />
          <InfoRow label="Delivery fee" value={formatPrice(deliveryFee)} />
          <InfoRow label="Service charges" value={formatPrice(servicecharge)} />

          <InfoRow label="Total" value={formatPrice(total)} bold />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoRow = ({ label, value, green, bold }: any) => (
  <View style={[styles.rowBetween, { marginVertical: spacing.md }]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text
      style={[
        styles.infoValue,
        green && { color: colors.buttonGreen },
        bold && { fontWeight: typography.fontWeightBold },
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xxxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    gap: spacing.sm,
  },

  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: typography.fontSizeXxl,
    fontWeight: typography.fontWeightBold,
    color: colors.textPrimary,
  },

  headerRight: {
    width: 36,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    alignContent: "flex-start",
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    padding: spacing.xl,
    borderRadius: radius.lg,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },

  name: {
    fontWeight: typography.fontWeightMedium,
    fontSize: typography.fontSizeMd,
    color: colors.blue,
  },

  subText: {
    color: colors.textSecondary,
    fontSize: typography.fontSizeSm,
  },

  issue: {
    color: colors.primary,
  },

  progressWrapper: {
    position: "relative",
    marginVertical: spacing.md,
  },

  progressBaseLine: {
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    height: 2,
    backgroundColor: colors.border,
    marginTop: 5,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },

  step: {
    alignItems: "center",
    justifyContent: "space-between",
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  completedCircle: {
    backgroundColor: colors.buttonGreen,
  },

  activeCircle: {
    backgroundColor: colors.textBlack,
  },

  activeDash: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  deliveredText: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
  },

  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightMedium,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    textAlign: "center",
    backgroundColor: colors.white,
  },

  cta: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.sm,
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  ctaText: {
    color: colors.white,
    fontWeight: typography.fontWeightBold,
  },

  iconRow: {
    flexDirection: "row",
    gap: 12,
  },

  address: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
  },

  distance: {
    color: colors.primary,
  },

  pinInfo: {
    marginTop: spacing.xs,
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightMedium,
    color: colors.buttonGreen,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },

  infoLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSizeMd,
  },

  infoValue: {},
});
