import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { H6, LightColor } from "@sqd-ffrog/components";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { normalize } from "@sqd-ffrog/tools";

interface DreamyTileProps {
  name: string;
  title: string;
}

function DreamyTile({ name, title }: DreamyTileProps) {
  return (
    <TouchableOpacity key={name} style={styles.containerStyle}>
      <Icon
        name={name}
        size={normalize(30)}
        style={styles.iconStyle}
        color={LightColor.mainColor}
      />
      <H6 style={styles.titleStyle}>{title}</H6>
    </TouchableOpacity>
  );
}

export default DreamyTile;
