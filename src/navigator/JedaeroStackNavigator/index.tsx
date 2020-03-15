import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "@sqd-ffrog/view";
import { HeaderBlurView } from "@sqd-ffrog/components";

const Stack = createStackNavigator();

const screenOptions = {
  headerTransparent: true,
  headerStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.6)"
  },
  headerBackground: HeaderBlurView
};

function JedaeroStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default JedaeroStackNavigator;
