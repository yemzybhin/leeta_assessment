import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "../theme";

interface CustomTabIconProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  focused: boolean;
}

export const CustomTabIcon: FC<CustomTabIconProps> = ({
  iconName,
  label,
  focused,
}) => {
  return (
    <View
      style={[
        styles.iconWrapper,
        focused && {
          backgroundColor: colors.primaryLight,
          paddingHorizontal: 12,
        },
      ]}
    >
      <Ionicons name={iconName} size={20} color={colors.textPrimary} />
      {focused && (
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    height: 40,
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    paddingVertical: 6,
  },
  label: {
    marginLeft: 6,
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightSemiBold,
  },
});

export default CustomTabIcon;
