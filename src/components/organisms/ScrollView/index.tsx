import React from "react";
import { ScrollView, ViewProps, ScrollViewProps } from "react-native";
import { HeaderHeightContext } from "@react-navigation/stack";
import { Title } from "@sqd-ffrog/components";

interface JedaeroScrollViewProps {
  title: string;
  children?: React.ReactNode;
}

function JedaeroScrollView(
  props: ViewProps & ScrollViewProps & JedaeroScrollViewProps
) {
  return (
    <HeaderHeightContext.Consumer>
      {headerHeight => (
        <ScrollView
          {...props}
          contentContainerStyle={[
            props.contentContainerStyle,
            { marginTop: headerHeight, paddingBottom: 56 }
          ]}
        >
          <Title>{props.title}</Title>
          {props.children}
        </ScrollView>
      )}
    </HeaderHeightContext.Consumer>
  );
}

export default JedaeroScrollView;
