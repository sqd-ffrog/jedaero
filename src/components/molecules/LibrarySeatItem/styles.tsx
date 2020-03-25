import { StyleSheet } from "react-native";
import { LightColor } from "../../atoms/colors";

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  seatTextStyle: {
    fontWeight: "700",
    color: LightColor.mainColor,
    textAlign: "center"
  }
});

export default styles;
