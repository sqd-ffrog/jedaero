import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { LightColor } from "../../atoms/colors";
import styles from "./styles";
import H4 from "../../atoms/H4";

interface SearchTopTabProps {
  tabs: string[];
  callback?: (args0: string) => void;
}

interface ListRenderItemProps {
  item: string;
  index: number;
}
function SearchTopTab({ tabs, callback }: SearchTopTabProps) {
  const [selectedItem, setSelectedItem] = useState(tabs[0]);

  useEffect(() => {
    {
      !!callback && callback(selectedItem);
    }
  }, [selectedItem]);

  const renderItem = ({ item }: ListRenderItemProps) => (
    <TouchableOpacity
      style={{
        borderBottomWidth: item === selectedItem ? 3 : 0,
        borderBottomColor: LightColor.textColor
      }}
      onPress={() => setSelectedItem(item)}
    >
      <H4 style={styles.tabTextStyle}>{item}</H4>
    </TouchableOpacity>
  );

  return (
    <FlatList<string>
      data={tabs}
      renderItem={renderItem}
      keyExtractor={item => item}
      horizontal
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

export default SearchTopTab;
