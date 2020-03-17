import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import styles from "./styles";

interface CardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function Card({ children, style }: CardProps) {
  return <View style={[styles.cardStyle, style]}>{children}</View>;
}

export default Card;
