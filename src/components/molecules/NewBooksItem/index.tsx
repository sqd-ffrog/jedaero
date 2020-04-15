import React from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Book } from "@sqd-ffrog/services";
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

const styles = StyleSheet.create({
  containerStyle: {
    maxWidth: 90,
    marginHorizontal: 8
  },
  imageStyle: {
    width: 90,
    height: 120
  },
  titleStyle: {
    fontWeight: "700",
    marginVertical: 4
  }
});

export default NewBookItem;
