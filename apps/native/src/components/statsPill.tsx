import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import { colors, spacing, typography, radius } from "../theme";

interface StatPillProps {
  value: number | string;
  label: string;

  icon?: React.ReactNode;
  image?: ImageSourcePropType;

  flex?: number;
  style?: ViewStyle;

  onPress?: () => void;
  formatNumber?: boolean;
}

export const StatPill: React.FC<StatPillProps> = ({
  value,
  label,
  icon,
  image,
  flex,
  style,
  onPress,
  formatNumber = true,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  const displayValue =
    typeof value === "number" && formatNumber ? value.toLocaleString() : value;

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, style, { flex }]}
    >
      {(icon || image) && (
        <View style={styles.iconWrapper}>
          {icon ? icon : <Image source={image!} style={styles.iconImage} />}
        </View>
      )}

      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{displayValue}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  label: {
    fontSize: typography.fontSizeXs,
    color: colors.textSecondary,
  },
  value: {
    fontSize: typography.fontSizeXl,
    fontWeight: typography.fontWeightBold,
    color: colors.textPrimary,
  },
});
