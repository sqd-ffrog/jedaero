import React from "react";
import { HeaderBlurView, MainRightHeaderTitle } from "@sqd-ffrog/components";

const screenOptions = {
  headerTitle: "",
  headerTransparent: true,
  headerBackground: HeaderBlurView,
  headerRight: () => <MainRightHeaderTitle />,
  cardStyle: {
    backgroundColor: "#ff0000"
  }
};

export default screenOptions;
