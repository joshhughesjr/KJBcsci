import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function GoalsScreen() {
  return (
    
      <TouchableOpacity style={styles.buttonContainer}
              >
                <Text>Add Goal</Text>
              </TouchableOpacity>
  );
}

function PlansScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Plans will be here</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();


const styles = StyleSheet.create({

  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#6ebf4a",
  },
});

export default function App() {
  return (
   
      <Tab.Navigator>
        <Tab.Screen name="Goals" component={GoalsScreen} />
        <Tab.Screen name="Plans" component={PlansScreen} />
      </Tab.Navigator>

  );
}
