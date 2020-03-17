import React from "react";
import { Text, View } from "react-native";
import { Card, H4, H6 } from "@sqd-ffrog/components";
import styles from "./styles";
import FastImage from "react-native-fast-image";

interface FoodTotalMenuItemProps {
  imageUri: string;
  title: string;
  subtitle?: string;
}

function FoodTotalMenuItem({
  imageUri,
  title,
  subtitle
}: FoodTotalMenuItemProps) {
  return (
    <Card key={title} style={styles.cardStyle}>
      <FastImage source={{ uri: imageUri }} style={styles.cardImageStyle} />
      <View>
        <H4>{title}</H4>
        {subtitle && <H6 style={styles.subtitleStyle}>{subtitle}</H6>}
      </View>
    </Card>
  );
}

export default FoodTotalMenuItem;
