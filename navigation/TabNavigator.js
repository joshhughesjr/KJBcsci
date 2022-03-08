import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNavigator, GoalsStackNavigator, StatisticsStackNavigator, CalenderStackNavigator, AccountStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Goals" component={GoalsStackNavigator} />
      <Tab.Screen name="Statistics" component={StatisticsStackNavigator} />
      <Tab.Screen name="Calendar" component={CalenderStackNavigator} />
      <Tab.Screen name="Account" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;