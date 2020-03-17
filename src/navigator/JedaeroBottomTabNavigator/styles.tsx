import { StyleSheet } from "react-native";
import elevationShadowStyle from "@sqd-ffrog/tools/lib/elevationShadow";

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingBottom: 8,
    paddingTop: 4,
    ...elevationShadowStyle(16)
  }
});

export default styles;
