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

  var days_left = parseInt( (new Date(goal.goal_date) - new Date()) / (1000 * 60 * 60 * 24) ) + 1; // Convert milliseconds -> seconds -> minutes -> hours -> days
  var save_rate = (goal.save_goal - goal.amount_saved) / days_left;
  save_rate = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2}).format(save_rate)
  return save_rate;
  ;
}

function ListItem(props) {
  return(<Text></Text>)
}

function GoalScreen(props) {
  console.log(computeSaveRate(props.goals[0])); 

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
          "name": "Mawlamyine",
          "goal_date": "2022-08-27",
          "save_goal": 369,
          "amount_saved": 67
        }, {
          "name": "Shlissel’burg",
          "goal_date": "2022-10-24",
          "save_goal": 157,
          "amount_saved": 10
        }, {
          "name": "San Diego",
          "goal_date": "2022-05-09",
          "save_goal": 174,
          "amount_saved": 63
        }, {
          "name": "Markova",
          "goal_date": "2022-07-30",
          "save_goal": 320,
          "amount_saved": 62
        }, {
          "name": "Mondragon",
          "goal_date": "2022-08-27",
          "save_goal": 427,
          "amount_saved": 66
        }, {
          "name": "Crasto",
          "goal_date": "2022-06-22",
          "save_goal": 457,
          "amount_saved": 29
        }, {
          "name": "Al Jaghbūb",
          "goal_date": "2022-06-16",
          "save_goal": 431,
          "amount_saved": 76
        }, {
          "name": "Qal‘at al Andalus",
          "goal_date": "2022-07-19",
          "save_goal": 393,
          "amount_saved": 89
        }, {
          "name": "Pavlovskaya",
          "goal_date": "2022-09-01",
          "save_goal": 410,
          "amount_saved": 6
        }, {
          "name": "Jardinópolis",
          "goal_date": "2022-09-06",
          "save_goal": 330,
          "amount_saved": 13
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
