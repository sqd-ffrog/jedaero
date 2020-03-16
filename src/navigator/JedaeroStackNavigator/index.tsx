import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { JedaeroBottomTabNavigator } from "@sqd-ffrog/jedaero-navigator";
import { rootScreenOptions } from "@sqd-ffrog/jedaero-navigator";

const Stack = createStackNavigator();

function JedaeroStackNavigator() {
  return (
    <Stack.Navigator screenOptions={rootScreenOptions}>
      <Stack.Screen name="Main" component={JedaeroBottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default JedaeroStackNavigator;
