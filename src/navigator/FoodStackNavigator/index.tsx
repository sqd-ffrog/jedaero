import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { rootScreenOptions } from "@sqd-ffrog/jedaero-navigator";
import { Food } from "@sqd-ffrog/view";
import { MainRightHeaderTitle } from "@sqd-ffrog/components";

const Stack = createStackNavigator();

const homeOptions = {
  headerRight: () => <MainRightHeaderTitle />
};

function FoodStackNavigator() {
  return (
    <Stack.Navigator screenOptions={rootScreenOptions}>
      <Stack.Screen name="Food" component={Food} options={homeOptions} />
    </Stack.Navigator>
  );
}

export default FoodStackNavigator;
