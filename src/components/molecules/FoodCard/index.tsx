import React, { useState } from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { ImageCard, H4 } from "@sqd-ffrog/components";
import styles from "./styles";
import { Source } from "react-native-fast-image";

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
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  );
}

export default FoodCard;
