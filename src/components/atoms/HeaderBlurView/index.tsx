import React from "react";
import { StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

function HeaderBlurView() {
  return <BlurView blurType="light" style={StyleSheet.absoluteFill} />;
}

export default HeaderBlurView;
