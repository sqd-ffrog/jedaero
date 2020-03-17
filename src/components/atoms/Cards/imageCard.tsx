import React from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import styles from "./styles";

import FastImage, { Source } from "react-native-fast-image";

interface ImageCardProps {
  source: Source;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

function ImageCard({
  source,
  children,
  style,
  onLoadStart,
  onLoadEnd
}: ImageCardProps) {
  return (
    <View style={[styles.cardStyle, style]}>
      <FastImage
        style={[StyleSheet.absoluteFill, styles.imageCardInnerStyle]}
        source={source}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
      />
      {children}
    </View>
  );
}

export default ImageCard;
