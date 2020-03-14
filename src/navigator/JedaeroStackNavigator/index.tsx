import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "@sqd-ffrog/view";
import Header from '../../components/organisms/Header';

const Stack = createStackNavigator();

function JedaeroStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{header: Header}} name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default JedaeroStackNavigator;
