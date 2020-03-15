import React from "react";
import { View } from "react-native";
import styles from "./styles";

interface CardProps {
  children?: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <View style={styles.cardStyle}>{children}</View>;
}

export default Card;
