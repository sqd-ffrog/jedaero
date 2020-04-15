import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import H2 from "../../atoms/H2";
import { BookResponse, Book, getNewBooksApi } from "@sqd-ffrog/services";
import { FlatList } from "react-native";
import NewBookItem from "../../molecules/NewBooksItem";
import NewBookEmpty from "../../molecules/NewBookEmpty";

function LibraryNewBook() {
  const [data, setData] = useState<BookResponse<Book>>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.debug("LibraryNewBook loading : ", isLoading);
    const getData = function() {
      (async function() {
        // 기본 20개 콜하는 걸로 놓고 본다.
        if (isLoading) {
          await setData(await getNewBooksApi());
          await setLoading(true);
        }
      })();
    };
    getData();
    return getData;
  }, [isLoading]);

  useEffect(() => {
    console.debug(data);
  }, [data]);

  return (
    <Fragment>
      <H2>신간도서</H2>
      <FlatList
        data={data?.data}
        renderItem={NewBookItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={NewBookEmpty}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginHorizontal: 16,
    marginBottom: 24
  }
});

export default LibraryNewBook;
