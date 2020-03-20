import React, { forwardRef } from "react";
import { TextInput, TextInputProps, StyleProp, TextStyle } from "react-native";
import styles from "./styles";

interface InputProps {
  style?: StyleProp<TextStyle>;
}

const Input = forwardRef((props: TextInputProps & InputProps, ref: React.Ref<TextInput>) => (
  <TextInput {...props} style={[styles.inputStyle, props.style]} ref={ref} />
));

export default Input;
