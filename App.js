import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Screen within a screen
function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function GoalsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Goals Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function StatisticsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Statistics Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function CalenderScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calender Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function AccountScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome!" component={GoalsScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const GoalsStack = createNativeStackNavigator();

function GoalsStackScreen() {
  return (
    <GoalsStack.Navigator>
      <GoalsStack.Screen name="Daily Spending" component={GoalsScreen} />
      <GoalsStack.Screen name="Details" component={DetailsScreen} />
    </GoalsStack.Navigator>
  );
}

const StatisticsStack = createNativeStackNavigator();

function StatisticsStackScreen() {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name=" " component={StatisticsScreen} />
      <StatisticsStack.Screen name="Details" component={DetailsScreen} />
    </StatisticsStack.Navigator>
  );
}

const CalenderStack = createNativeStackNavigator();

function CalenderStackScreen() {
  return (
    <CalenderStack.Navigator>
      <CalenderStack.Screen name="Calender" component={CalenderScreen} />
      <CalenderStack.Screen name="Details" component={DetailsScreen} />
    </CalenderStack.Navigator>
  );
}

const AccountStack = createNativeStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} />
      <AccountStack.Screen name="Details" component={DetailsScreen} />
    </AccountStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Goals" component={GoalsStackScreen} />
        <Tab.Screen name="Statistics" component={StatisticsStackScreen} />
        <Tab.Screen name="Calender" component={CalenderStackScreen} />
        <Tab.Screen name="Account" component={AccountStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}