import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

interface BackButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: string;
}

function BackButton({ onPress, color }: BackButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon size={30} name="left" color={color} />
    </TouchableOpacity>
  );
}

export { BackButtonProps };
export default BackButton;
