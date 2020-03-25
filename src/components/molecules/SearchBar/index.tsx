import React, { useState, useRef } from "react";
import { Card } from "../../atoms/Cards";
import styles from "./styles";
import { SearchButton, CloseButton } from "../../atoms/Buttons";
import { LightColor } from "../../atoms/colors";
import Input from "../../atoms/TextInput";
import { TextInput } from "react-native";

interface SearchBarProps {
  onPress: (arg0: string) => void;
  tintColor: string;
}

function SearchBar({ onPress, tintColor }: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState<string>("");

  const onChange = (text: string) => {
    setValue(text);
  };

  const onSubmit = () => onPress(value);

  const onPressCloseButton = () => {
    inputRef?.current?.clear();
    setValue("");
  };

  return (
    <Card style={styles.cardStyle}>
      <Input
        ref={inputRef}
        editable
        onChangeText={onChange}
        style={styles.inputStyle}
        placeholder="도서를 검색하세요"
        onSubmitEditing={onSubmit}
        returnKeyLabel="search"
      />
      {!!value && (
        <CloseButton
          color={LightColor.disabledColor}
          style={styles.closeStyle}
          onPress={onPressCloseButton}
        />
      )}
      <SearchButton color={tintColor} onPress={onSubmit} />
    </Card>
  );
}

export default SearchBar;
