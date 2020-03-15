import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface SettingsButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

function SettingsButton({ onPress }: SettingsButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon size={30} name="settings-outline" />
    </TouchableOpacity>
  );
}

export default SettingsButton;
