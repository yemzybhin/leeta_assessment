import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, typography } from "../theme";

interface OrdersHeaderProps {
  loading: boolean;
  total: number;

  title: string;
  lable: string;
  hasProps: Boolean;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  loading,
  total,

  title,
  lable,
  hasProps,
}) => {
  const [enabled, setEnabled] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    const toValue = enabled ? 0 : 20;

    Animated.timing(translateX, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setEnabled(!enabled);
  };

  return (
    <View style={styles.container}>
      {/* LEFT */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{loading ? "Loading…" : lable}</Text>
      </View>

      {hasProps && (
        <View style={styles.actions}>
          {/* Custom Pill Switch */}
          <Pressable onPress={toggleSwitch}>
            <View
              style={[
                styles.track,
                {
                  backgroundColor: enabled ? colors.buttonGreen : colors.border,
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.thumb,
                  {
                    transform: [{ translateX }],
                  },
                ]}
              />
            </View>
          </Pressable>

          <Pressable
            onPress={() => setHasNotification(!hasNotification)}
            style={styles.bellWrapper}
          >
            <Ionicons
              name={hasNotification ? "notifications" : "notifications-outline"}
              size={25}
              color={colors.textPrimary}
            />
            {hasNotification && <View style={styles.badge} />}
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    paddingTop: spacing.md,
  },
  titleRow: {
    flexShrink: 1,
  },
  title: {
    fontSize: typography.fontSizeXxl,
    fontWeight: typography.fontWeightBold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSizeSm,
    color: colors.textMuted,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  track: {
    width: 42,
    height: 22,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.white,
  },

  bellWrapper: {
    padding: 6,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
});
