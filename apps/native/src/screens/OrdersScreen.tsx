import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useOrders, Order, OrderStatus } from "@repo/ui";
import { OrderCard } from "../components/OrderCard";
import { LoadingState } from "../components/LoadingState";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { FilterTabs } from "../components/FilterTabs";
import { Toast, useToast } from "../components/Toast";
import { colors, spacing, typography, radius } from "../theme";
import { OrdersHeader } from "../components/headerActions";
import { StatPill } from "../components/statsPill";

type FilterOption = OrderStatus | "all";

const UpdatePricePopup: React.FC<{
  visible: boolean;
  onClose: () => void;
  currentPrice: number;
  onUpdate: (newPrice: number) => void;
}> = ({ visible, onClose, currentPrice, onUpdate }) => {
  const [price, setPrice] = useState(currentPrice.toString());

  useEffect(() => setPrice(currentPrice.toString()), [currentPrice]);

  const handleUpdate = () => {
    const numPrice = parseInt(price.replace(/,/g, ""), 10);
    if (!isNaN(numPrice)) {
      onUpdate(numPrice);
      onClose();
    }
  };

  const formatNumber = (num: string) =>
    num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={popupStyles.overlay}>
        <View style={popupStyles.container}>
          <Text style={popupStyles.title}>Update Gas Price</Text>

          <TextInput
            value={price}
            onChangeText={(text) =>
              setPrice(formatNumber(text.replace(/,/g, "")))
            }
            keyboardType="number-pad"
            style={popupStyles.input}
          />

          <TouchableOpacity
            style={popupStyles.updateBtn}
            onPress={handleUpdate}
          >
            <Text style={popupStyles.updateBtnText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={popupStyles.cancelBtn} onPress={onClose}>
            <Text style={popupStyles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const OrdersScreen: React.FC = () => {
  const {
    priceperkg,
    setPricePerKg,
    orders,
    allOrders,
    loading,
    error,
    updatingId,
    refresh,
    markToTransit,
    markAsRejected,
    filterStatus,
    setFilterStatus,
  } = useOrders();

  const { toast, showToast } = useToast();
  const [showPopup, setShowPopup] = useState(false);

  const formatToPrice = (num: number) => num.toLocaleString();

  const counts = useMemo(
    () => ({
      all: allOrders.length,
      pending: orders.filter((o: Order) => o.status === "pending").length,
      in_transit: orders.filter((o: Order) => o.status === "in_transit").length,
      delivered: orders.filter((o: Order) => o.status === "delivered").length,
    }),
    [orders, allOrders.length],
  );

  const handleMarkDelivered = async (id: string) => {
    try {
      await markToTransit(id);
      showToast("Order marked to transit!", "success");
    } catch {
      showToast("Failed to update order. Please retry.", "error");
    }
  };

  const handleMarkRejected = async (id: string) => {
    try {
      await markAsRejected(id);
      showToast("Order marked as rejected!", "success");
    } catch {
      showToast("Failed to update order. Please retry.", "error");
    }
  };

  const renderItem = ({ item }: { item: Order }) => (
    <OrderCard
      order={item}
      gasPrice={priceperkg}
      onMarkDelivered={handleMarkDelivered}
      onMarkRejected={handleMarkRejected}
      isUpdating={updatingId === item.id}
    />
  );

  const Header = () => (
    <>
      <View style={styles.statsStrip}>
        <StatPill
          image={require("../../assets/icons/order.png")}
          value={counts.all}
          label="Today's Orders"
          flex={1}
          onPress={() => setFilterStatus("all")}
        />

        <StatPill
          image={require("../../assets/icons/card.png")}
          value={"₦3,590,938"}
          label="Today's Earnings"
          flex={2}
        />
      </View>

      <View style={styles.priceCard}>
        <View>
          <Text style={styles.priceLabel}>Gas Price LPG</Text>
          <Text style={styles.priceValue}>₦{formatToPrice(priceperkg)}</Text>
        </View>

        <Text style={styles.updateBtn} onPress={() => setShowPopup(true)}>
          Update price
        </Text>
      </View>

      <View style={styles.stickyHeader}>
        <FilterTabs
          active={filterStatus as FilterOption}
          onChange={setFilterStatus}
          counts={counts}
        />
      </View>

      {filterStatus === "pending" && (
        <Text style={styles.pendingText}>
          Pending Orders ({counts.pending})
        </Text>
      )}
    </>
  );

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} onRetry={refresh} />;

    return (
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <EmptyState
            message={
              filterStatus === "all"
                ? "No orders assigned yet."
                : `No ${filterStatus.replace("_", " ")} orders right now.`
            }
          />
        }
        contentContainerStyle={[
          styles.listContent,
          orders.length === 0 && styles.listContentEmpty,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            progressBackgroundColor={colors.textBlack}
            tintColor={colors.textBlack}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    );
  };

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
        title="Orders"
        lable="GasHub Enterprose"
        hasProps
      />

      <View style={styles.body}>{renderContent()}</View>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />

      <UpdatePricePopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        currentPrice={priceperkg}
        onUpdate={(newPrice) => setPricePerKg(newPrice)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
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
  body: { flex: 1 },
  listContent: { paddingBottom: spacing.xxxl },
  listContentEmpty: { flexGrow: 1 },
  stickyHeader: {
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
  },

  statsStrip: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  priceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
  },

  priceLabel: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.textPrimary,
  },

  updateBtn: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    fontSize: typography.fontSizeSm,
    color: colors.primary,
    fontWeight: typography.fontWeightMedium,
  },

  pendingText: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    color: colors.textBlack,
    fontSize: typography.fontSizeXl,
    fontWeight: typography.fontWeightBold,
  },
});

const popupStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  title: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: typography.fontSizeLg,
    marginBottom: spacing.md,
  },
  updateBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  updateBtnText: {
    color: colors.white,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeMd,
  },
  cancelBtn: {
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    alignItems: "center",
  },
  cancelBtnText: {
    color: colors.textSecondary,
    fontSize: typography.fontSizeMd,
  },
});

export default OrdersScreen;
