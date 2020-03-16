import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Home, Food } from "@sqd-ffrog/view";

const BottomTab = createMaterialBottomTabNavigator();

const screenOptions = {};

function JedaeroBottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={screenOptions}
      sceneAnimationEnabled={false} // 안드로이드에서 그림자가 깜빡이는 이슈가 있음.
      backBehavior="none"
      shifting={true}
      labeled={true}
      style={{ backgroundColor: 'tomato' }}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Food" component={Food} />
      <BottomTab.Screen name="Dreamy" component={Home} />
      <BottomTab.Screen name="Library" component={Home} />
      <BottomTab.Screen name="AcademySchedule" component={Home} />
    </BottomTab.Navigator>
  );
}

export default JedaeroBottomTabNavigator;
