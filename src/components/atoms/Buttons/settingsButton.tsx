import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./styles";

interface SettingsButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: string | undefined;
}

function SettingsButton({ onPress, color }: SettingsButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Icon size={30} name="setting" color={color} />
    </TouchableOpacity>
  );
}

export default SettingsButton;
