import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Homescreen";
import Goalsscreen from "../screens/Goalsscreen";
import StatisticsScreen from "../screens/Statisticsscreen";
import CalenderScreen from "../screens/Calenderscreen";
import AccountScreen from "../screens/Accountscreen";
import DetailsScreen from "../screens/Detailsscreen";
import AddAccountScreen from "../screens/AddAccountscreen";
import HistoryScreen from "../screens/Historyscreen";
import ViewAccountScreen from "../screens/ViewAccountscreen";
import PreferencesScreen from "../screens/Preferencesscreen";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#6ebf4a",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Welcome!" component={Home} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

const GoalsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Daily Spending" component={Goalsscreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

const StatisticsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="This Month's Statistics" component={StatisticsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

const CalenderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Calendar" component={CalenderScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Your Name" component={AccountScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Add Account" component={AddAccountScreen} />
      <Stack.Screen name="View Account" component={ViewAccountScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, GoalsStackNavigator, StatisticsStackNavigator, CalenderStackNavigator, AccountStackNavigator};