import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonContainer: {
    marginTop:30,
    height:45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    borderRadius:30,
    backgroundColor: "#6ebf4a",
  },
  flatList: {
    paddingTop: Constants.statusBarHeight,
    marginTop: 15,
    width: "90%",
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 15,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#DDDDDD',
    paddingLeft: 10,
    borderRadius: 15,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 10,
    shadowColor: "#000",

    shadowRadius: 30,
    elevation: 2
    

  },
  editButton: {
    flex: 1,
  }
});

function formatCurrency(amount) {

  return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2}).format(amount)

}

function formatDate(date) {

  if (typeof date == "string") {
    return new Intl.DateTimeFormat('en-US').format(new Date(date))
  } else {
    return new Intl.DateTimeFormat('en-US').format(date)
  }

}

// Takes a goal and computes the amount required to save per day to meet that goal by the goal_date
function computeSaveRate(goal) {

  var days_left = parseInt( (new Date(goal.goal_date) - new Date()) / (1000 * 60 * 60 * 24) ) + 1; // Convert milliseconds -> seconds -> minutes -> hours -> days
  var save_rate = (goal.save_goal - goal.amount_saved) / days_left;
  save_rate = formatCurrency(save_rate)
  return save_rate;

}

function ListItem(props) {
  return(
    <View style={styles.listItemContainer}>
      <View style= {{flex:9, padding: 5}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>{props.goal.name}</Text>
        <Text style={{textAlign: 'center', fontSize: 18}}>Save {formatCurrency(props.goal.save_goal)} by {formatDate(props.goal.goal_date)}</Text>
        <Text style={{textAlign: 'center', fontSize: 18}}>Saved: {formatCurrency(props.goal.amount_saved)}</Text>
      </View>
      
      <TouchableOpacity style={styles.editButton}><Icon name={"gear"} color={'#6ebf4a'} size={35} /></TouchableOpacity>
    </View>
  )
}

function GoalScreen(props) {
  //console.log(computeSaveRate(props.goals[0])); 

    return (
      <View style={styles.center}>
        <TouchableOpacity style={styles.buttonContainer}><Text>Add Goal</Text></TouchableOpacity>
        <FlatList style={styles.flatList} data={props.goals} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => <ListItem goal = {item}/>}/>
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
          "name": "Disney Trip",
          "goal_date": "2022-08-27",
          "save_goal": 369,
          "amount_saved": 67
        }, {
          "name": "Vacation to Shlissel’burg",
          "goal_date": "2022-10-24",
          "save_goal": 157,
          "amount_saved": 10
        }, {
          "name": "Vacation to Diego",
          "goal_date": "2022-05-09",
          "save_goal": 174,
          "amount_saved": 63
        }, {
          "name": "Vacation to Markova",
          "goal_date": "2022-07-30",
          "save_goal": 320,
          "amount_saved": 62
        }, {
          "name": "Vacation to Mondragon",
          "goal_date": "2022-08-27",
          "save_goal": 427,
          "amount_saved": 66
        }, {
          "name": "Vacation to Crasto",
          "goal_date": "2022-06-22",
          "save_goal": 457,
          "amount_saved": 29
        }, {
          "name": "Vacation to Al Jaghbūb",
          "goal_date": "2022-06-16",
          "save_goal": 431,
          "amount_saved": 76
        }, {
          "name": "Vacation to Qal‘at al Andalus",
          "goal_date": "2022-07-19",
          "save_goal": 393,
          "amount_saved": 89
        }, {
          "name": "Vacation to Pavlovskaya",
          "goal_date": "2022-09-01",
          "save_goal": 410,
          "amount_saved": 6
        }, {
          "name": "Vacation to Jardinópolis",
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
