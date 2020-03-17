import { StyleSheet } from "react-native";
import { elevationShadow } from "@sqd-ffrog/tools";
import { LightColor } from "../colors";

const styles = StyleSheet.create({
  cardStyle: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: LightColor.backgroundColor,
    ...elevationShadow(12)
  },
  imageCardInnerStyle: {
    borderRadius: 16
  }
});

export default styles;
