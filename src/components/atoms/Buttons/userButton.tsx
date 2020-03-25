import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import { normalize } from '@sqd-ffrog/tools';

interface UserButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: string | undefined;
}

function UserButton({ onPress, color }: UserButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Icon size={normalize(24)} name="user" color={color} />
    </TouchableOpacity>
  );
}

export default UserButton;
