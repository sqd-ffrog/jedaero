import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import { normalize } from '@sqd-ffrog/tools';

interface SearchButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: string | undefined;
}

function SearchButton({ onPress, color }: SearchButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Icon size={normalize(24)} name="search1" color={color} />
    </TouchableOpacity>
  );
}

export default SearchButton;
