import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { formatNumber } from '@repo/ui'
import { colors, spacing, typography, radius } from "../theme";

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

export default UpdatePricePopup;
