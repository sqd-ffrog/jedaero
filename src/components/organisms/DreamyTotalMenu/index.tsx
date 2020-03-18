import React, { Fragment } from "react";
import { H2, DreamyTile } from "@sqd-ffrog/components";
import styles from "./styles";
import { View } from 'react-native';

interface MenuItemProps {
  name: string;
  title: string;
}

const data: MenuItemProps[] = [
  {
    name: "home",
    title: "강의 게시판"
  },
  {
    name: "home",
    title: "강의 게시판"
  },
  {
    name: "home",
    title: "강의 게시판"
  },
  {
    name: "home",
    title: "강의 게시판"
  },
  {
    name: "home",
    title: "강의 게시판"
  }
];

function DreamyTotalMenu() {
  return (
    <Fragment>
      <H2 style={styles.titleStyle}>전체 메뉴</H2>
      <View style={styles.tileContainerStyle}>{data.map(DreamyTile)}</View>
    </Fragment>
  );
}

export default DreamyTotalMenu;
