import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./styles";

interface SearchButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: string | undefined;
}

function SearchButton({ onPress, color }: SearchButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Icon size={30} name="search1" color={color} />
    </TouchableOpacity>
  );
}

export default SearchButton;
