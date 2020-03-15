import React from "react";
import { H1 } from "@sqd-ffrog/components";
import styles from "./styles";

interface TitleProps {
  children: string;
}

function Title({ children }: TitleProps) {
  return <H1 style={styles.titleStyle}>{children}</H1>;
}

export default Title;
