import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const styles = StyleSheet.create({
  center: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#6ebf4a",
  },
});

var goals = [
  {
    goal_date: new Date(),
    save_goal: 2000,
    amount_saved: 200
  }
]

function GoalsScreen() {
  return (
      <View style={styles.center}>
      <TouchableOpacity style={styles.buttonContainer}><Text>Add Goal</Text></TouchableOpacity>
      </View>
  );
}

function PlansScreen() {
  return (
    <View style={styles.center}>
      <Text>Plans will be here</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
   
      <Tab.Navigator>
        <Tab.Screen name="Goals" component={GoalsScreen} />
        <Tab.Screen name="Plans" component={PlansScreen} />
      </Tab.Navigator>

  );
}
