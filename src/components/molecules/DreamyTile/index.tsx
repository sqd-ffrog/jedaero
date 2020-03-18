import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { Card, H8 } from "@sqd-ffrog/components";
import styles from "./styles";

interface DreamyTileProps {
  name: string;
  title: string;
}

function DreamyTile({ name, title }: DreamyTileProps) {
  return (
    <Card style={styles.cardStyle}>
      <Icon name={name} size={45} />
      <H8 style={styles.titleStyle}>{title}</H8>
    </Card>
  );
}

export default DreamyTile;
