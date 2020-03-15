import { StyleSheet } from "react-native";
import { elevationShadow } from "@sqd-ffrog/tools";
import { LightColor } from "@sqd-ffrog/components";

const styles = StyleSheet.create({
  cardStyle: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: LightColor.backgroundColor,
    ...elevationShadow(24)
  }
});

export default styles;
