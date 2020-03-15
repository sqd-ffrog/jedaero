import React from "react";
import { ScrollView } from "react-native";
import { HeaderHeightContext } from "@react-navigation/stack";

function JedaeroScrollView(props: any) {
  return (
    <HeaderHeightContext.Consumer>
      {headerHeight => (
        <ScrollView
          {...props}
          contentContainerStyle={[
            props.contentContainerStyle,
            { marginTop: headerHeight }
          ]}
        />
      )}
    </HeaderHeightContext.Consumer>
  );
}

export default JedaeroScrollView;
