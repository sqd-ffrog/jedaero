import React from "react";
import { Text } from "react-native";
import styles from "./styles";

interface Props {
  children: string;
}

function H1({ children = "" }: Props) {
  return <Text style={styles.textStyle}>{children}</Text>;
}

export default H1;
