import React, { useState } from "react";
import { TouchableHighlight, GestureResponderEvent } from "react-native";
import { ImageCard, H4, LightColor } from "@sqd-ffrog/components";
import { Source } from "react-native-fast-image";
import styles from "./styles";

interface FoodCardProps {
  source: Source;
  onPress?: (event: GestureResponderEvent) => void;
  children: string;
}

function FoodCard({ source, onPress, children }: FoodCardProps) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const onLoadStart = () => {
    setLoading(true);
  };

  const onLoadEnd = () => {
    setLoading(false);
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.7}
      underlayColor={LightColor.backgroundColor}
    >
      <ImageCard
        source={source}
        style={styles.style}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
      >
        <H4
          style={isLoading ? styles.loadingTitleStyle : styles.loadedtitleStyle}
        >
          {children}
        </H4>
      </ImageCard>
    </TouchableHighlight>
  );
}

export default FoodCard;
