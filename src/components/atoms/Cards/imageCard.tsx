import React, { Fragment } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  GestureResponderEvent
} from "react-native";
import styles from "./styles";

import FastImage, { Source } from "react-native-fast-image";
import { TouchableHighlight } from "react-native-gesture-handler";
import { LightColor } from "@sqd-ffrog/components";

interface ImageCardProps {
  source: Source;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onPress?: (event: GestureResponderEvent) => void;
}

function ImageCard({
  source,
  children,
  style,
  onLoadStart,
  onLoadEnd,
  onPress
}: ImageCardProps) {
  const _children = () => (
    <Fragment>
      <FastImage
        style={[StyleSheet.absoluteFill, styles.imageCardInnerStyle]}
        source={source}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
      />
      {children}
    </Fragment>
  );
  return onPress ? (
    <TouchableHighlight
      style={[styles.cardStyle, style]}
      activeOpacity={0.7}
      underlayColor={LightColor.backgroundColor}
      onPress={onPress}
    >
      {_children()}
    </TouchableHighlight>
  ) : (
    <View style={[styles.cardStyle, style]}>{_children()}</View>
  );
}

export default ImageCard;
