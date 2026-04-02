import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";
import { colors, spacing, typography, radius } from "../theme";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  visible,
}) => {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity]);

  const bgColor = type === "success" ? colors.statusDelivered : colors.error;

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: bgColor, opacity, transform: [{ translateY }] },
      ]}
      pointerEvents="none"
    >
      <Text style={styles.icon}>{type === "success" ? "✓" : "✕"}</Text>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

interface ToastState {
  message: string;
  type: "success" | "error";
  visible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = React.useState<ToastState>({
    message: "",
    type: "success",
    visible: false,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, type, visible: true });
    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return { toast, showToast };
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: spacing.xxxl,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    color: colors.white,
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightBold,
  },
  message: {
    color: colors.white,
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightMedium,
    flex: 1,
  },
});
