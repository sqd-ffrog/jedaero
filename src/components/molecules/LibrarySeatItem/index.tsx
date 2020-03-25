import React from "react";
import { LibrarySeatProps } from "@sqd-ffrog/react-native-jnu/src/library";
import { View } from "react-native";
import H6 from "../../atoms/H6";
import styles from "./styles";

function LibrarySeatItem({
  id,
  capacity,
  available,
  sectionName
}: LibrarySeatProps) {
  const seat = `${capacity - available}/${capacity}`;
  return (
    <View key={id.toString()} style={styles.containerStyle}>
      <H6>{sectionName}</H6>
      <H6 style={styles.seatTextStyle}>{seat}</H6>
    </View>
  );
}

export default LibrarySeatItem;
