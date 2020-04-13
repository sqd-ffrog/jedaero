import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import H4 from "../../atoms/H4";
import FastImage from "react-native-fast-image";
import { Book } from "@sqd-ffrog/services";
import H6 from "../../atoms/H6";

interface BookItemProps {
  item: Book;
}

function BookItem({
  item: { title, thumbnailUri, author, isbn, publisher }
}: BookItemProps) {
  return (
    <TouchableOpacity key={isbn} style={styles.containerStyle}>
      <FastImage source={{ uri: thumbnailUri }} style={styles.imageStyle} />
      <View style={styles.innerContainerStyle}>
        <H4 style={styles.titleStyle} numberOfLines={1}>
          {title + "sfsfsfdfasdfafasfsfsafsaf"}
        </H4>
        <H6>{author}</H6>
        <H6>{publisher}</H6>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 8,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden"
  },
  innerContainerStyle: {
    flex: 1
  },
  imageStyle: {
    width: 60,
    height: 80
  },
  titleStyle: {
    fontWeight: "700"
  }
});

export default BookItem;
