import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, SafeAreaView } from "react-native";
import { colors, spacing, radius } from "../theme";

const SkeletonBlock: React.FC<{ width: number | string; height: number }> = ({
  width,
  height,
}) => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.skeleton, { width: width as number, height, opacity }]}
    />
  );
};

const CardSkeleton: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <SkeletonBlock width={140} height={16} />
      <SkeletonBlock width={72} height={24} />
    </View>
    <SkeletonBlock width="80%" height={12} />
    <View style={{ marginTop: spacing.sm }}>
      <SkeletonBlock width="60%" height={12} />
    </View>
    <View style={{ marginTop: spacing.md }}>
      <SkeletonBlock width="100%" height={44} />
    </View>
  </View>
);

export const LoadingState: React.FC = () => (
  <SafeAreaView testID="loading-state">
    {[1, 2, 3].map((i) => (
      <CardSkeleton key={i} />
    ))}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  skeleton: {
    backgroundColor: colors.border,
    borderRadius: radius.sm,
  },
});
