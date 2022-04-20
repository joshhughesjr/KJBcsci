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

export class GoalsScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state =(
    {
        goals:
        [{
          goal_date: new Date(),
          save_goal: 2000,
          amount_saved: 200
        }]
    }
    )
  }

  GoalScreen() {
    return (
        <View style={styles.center}>
        <TouchableOpacity style={styles.buttonContainer}><Text>Add Goal</Text></TouchableOpacity>
        </View>
    );
  }

  PlanScreen() {
    return (
      <View style={styles.center}>
        <Text>Plans will be here</Text>
      </View>
    );
  }

  render() {

    const Tab = createMaterialTopTabNavigator();

    return (
   
      <Tab.Navigator>
        <Tab.Screen name="Goals" component={this.GoalScreen} />
        <Tab.Screen name="Plans" component={this.PlanScreen} />
      </Tab.Navigator>

    );
  }
}
