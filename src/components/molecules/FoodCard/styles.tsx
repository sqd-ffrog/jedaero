import { StyleSheet } from "react-native";
import { LightColor } from "@sqd-ffrog/components";

const styles = StyleSheet.create({
  style: {
    minHeight: 160,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  loadingTitleStyle: {
    color: LightColor.textColor,
    fontWeight: "700"
  },
  loadedtitleStyle: {
    color: LightColor.backgroundColor,
    fontWeight: "700"
  }
});

export default styles;