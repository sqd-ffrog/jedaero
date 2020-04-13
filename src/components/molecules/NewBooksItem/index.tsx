import React from "react";
import FastImage from "react-native-fast-image";
import { Book } from "@sqd-ffrog/services";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import H6 from "../../atoms/H6";

interface NewBookItemProps {
  item: Book;
  index: number;
}

function NewBookItem({
  item: { thumbnailUri, title, author }
}: NewBookItemProps) {
  return (
    <TouchableOpacity style={styles.containerStyle}>
      <FastImage source={{ uri: thumbnailUri }} style={styles.imageStyle} />
      <H6 style={styles.titleStyle} numberOfLines={2}>
        {title}
      </H6>
      <H6>{author}</H6>
    </TouchableOpacity>
  );
}

export default NewBookItem;
