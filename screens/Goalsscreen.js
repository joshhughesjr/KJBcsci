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

// Takes a goal and computes the amount required to save per day to meet that goal by the goal_date
function computeSaveRate(goal) {
  var days_left = goal.goal_date - new Date();

  return days_left;
}

function GoalScreen(props) {
  console.log(computeSaveRate(props.goals[0]))
  
    return (
      <View style={styles.center}>
      <TouchableOpacity style={styles.buttonContainer}><Text>Add Goal</Text></TouchableOpacity>
      </View>
  );
  
}

function PlanScreen(props) {
  return (
    <View style={styles.center}>
      <Text>Plans will be here</Text>
    </View>
  );
}

export default class Goalsscreen extends React.Component {

  constructor(props) {
    super(props)

    this.state =
    {
        goals:[{
          goal_date: new Date("2022-04-30"),
          save_goal: 2000,
          amount_saved: 200
        }]
    }

  }

  render() {

    const Tab = createMaterialTopTabNavigator();

    return (
      <>
          <Tab.Navigator>
            <Tab.Screen name="Goals">{() => {return <GoalScreen goals = {this.state.goals}></GoalScreen>} }</Tab.Screen>
            <Tab.Screen name="Plans" component={PlanScreen} />
          </Tab.Navigator>
      </>
     

    );
  }
}
