import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "@sqd-ffrog/view";
import { rootScreenOptions } from "@sqd-ffrog/jedaero-navigator";

const Stack = createStackNavigator();

function JedaeroStackNavigator() {
  return (
    <Stack.Navigator screenOptions={rootScreenOptions}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default JedaeroStackNavigator;
