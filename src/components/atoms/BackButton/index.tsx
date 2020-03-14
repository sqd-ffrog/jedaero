import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface BackButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

function BackButton({ onPress }: BackButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon size={30} name="chevron-back-outline" />
    </TouchableOpacity>
  );
}

export { BackButtonProps };
export default BackButton;
