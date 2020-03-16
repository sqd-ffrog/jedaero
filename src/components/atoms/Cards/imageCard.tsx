import React from "react";
import { ImageBackground, ImageSourcePropType } from "react-native";
import styles from "./styles";

interface ImageCardProps {
  source: ImageSourcePropType;
  children?: React.ReactNode;
}

function ImageCard({ source, children }: ImageCardProps) {
  return (
    <ImageBackground source={source} style={styles.cardStyle}>
      {children}
    </ImageBackground>
  );
}

export default ImageCard;
