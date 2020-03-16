import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  HomeStackNavigator,
  FoodStackNavigator,
  DreamyStackNavigator,
  LibraryStackNavigator,
  AcademyScheduleStackNavigator
} from "@sqd-ffrog/jedaero-navigator";

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
    >
      <BottomTab.Screen name="_Home" component={HomeStackNavigator} />
      <BottomTab.Screen name="_Food" component={FoodStackNavigator} />
      <BottomTab.Screen name="_Dreamy" component={DreamyStackNavigator} />
      <BottomTab.Screen name="_Library" component={LibraryStackNavigator} />
      <BottomTab.Screen
        name="_AcademySchedule"
        component={AcademyScheduleStackNavigator}
      />
    </BottomTab.Navigator>
  );
}

export default JedaeroBottomTabNavigator;
