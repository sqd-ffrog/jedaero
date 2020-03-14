import React from "react";
import { StackHeaderProps } from "@react-navigation/stack";
import { BlurView } from "@react-native-community/blur";
import styles from "./styles";
import { Text } from "react-native";

function Header({ scene, previous, navigation }: StackHeaderProps) {
  return (
    <BlurView blurType="light" blurAmount={10} style={styles.headerStyle}>
      <Text>hi</Text>
    </BlurView>
  );
}

export default Header;
