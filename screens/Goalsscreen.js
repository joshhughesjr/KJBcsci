import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Modal, Alert} from 'react-native';
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
    marginTop: 10,
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
  }, 
  modalView: {
    margin: 20,
    width:"90%",
    height:"75%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
        <Text style={{textAlign: 'center', fontSize: 20}}>{props.screen_state.goals[props.index].name}</Text>
        <Text style={{textAlign: 'center', fontSize: 18}}>Save {formatCurrency(props.screen_state.goals[props.index].save_goal)} by {formatDate(props.goal.goal_date)}</Text>
        <Text style={{textAlign: 'center', fontSize: 18}}>Saved: {formatCurrency(props.screen_state.goals[props.index].amount_saved)}</Text>
      </View>
      
      <TouchableOpacity onPress ={() => props.screen_state.callback_functions.button_callback(props.index)} style={styles.editButton}><Icon name={"gear"} color={'#6ebf4a'} size={35} /></TouchableOpacity>
    </View>
  )
}

function DetailModal(props) {
  return (

    
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.screen_state.modal_visible}
        onRequestClose={() => {
          //props.closeModalCallback(!props.visible)
        }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{JSON.stringify(props.screen_state.modal_data)}</Text>
          <TouchableOpacity onPress={ () => {props.screen_state.callback_functions.modal_callback()}} style={styles.buttonContainer}><Text>Submit</Text></TouchableOpacity>

        </View>  
      </View>
      </Modal>
    
  )
}

function GoalScreen(props) {

    return (

      
      <View style={styles.center}>

        <DetailModal style={styles.modalView} screen_state={props.screen_state}></DetailModal>
        <TouchableOpacity onPress={() => props.screen_state.callback_functions.button_callback(-1)} style={styles.buttonContainer}><Text>Add Goal</Text></TouchableOpacity>
        <FlatList 
            style={styles.flatList} 
            data={props.goals} 
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({item, index}) => <ListItem goal={item} index = {index} screen_state={props.screen_state}/>}
            
        />
      </View>
  );
  
}



export default class Goalsscreen extends React.Component {

  constructor(props) {
    super(props)

    this.buttonCallback = this.buttonCallback.bind(this);
    this.modalCallback = this.modalCallback.bind(this);

    this.state =
    {
        modal_visible: false,
        modal_data: null,
        callback_functions: {
          button_callback: this.buttonCallback,
          modal_callback: this.modalCallback
        },
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
  
  PlanScreen(props) {
    return (
      <View style={styles.center}>
        <Text>Plans will be here</Text>
      </View>
    );
  }

  // Callback for either the Add Goal button or the gear icon buttons for editing existing goals
  // This callback is passed from the Goalsscreen class -> GoalScreen function Component -> ListItem function components
  buttonCallback(index = -1) {
    console.log(index)
    
    // State is immutable, so editing means replacing it with a whole other array
    var modified = this.state.goals;
    this.setState({modal_visible: true});

    if(index == -1) {

      this.setState({modal_data: null})

      // No index specified, create new goal
    
    } else {
      // Index specified, modify that index's value in goals
        
        this.setState({modal_data: this.state.goals[index]})
        // Test modification for now
        /*
        modified[index] = {
        "name": "Disney Trip",
        "goal_date": "2022-08-27",
        "save_goal": 420,
        "amount_saved": 69
      }
      */
    }
    
    this.setState({goals: modified})
  }

  // Callback for the submit and cancel buttons in the modal
  // If there is valid data passed to the function, then the function updates the goals data
  // Else, it just closes the modal
  modalCallback(index = -1, newData = {}) {
    this.setState({modal_visible: false})
  }

  render() {

    const Tab = createMaterialTopTabNavigator();
    
    return (
      <>
          <Tab.Navigator>
            <Tab.Screen name="Goals">{() => {return <GoalScreen goals = {this.state.goals} screen_state={this.state}></GoalScreen>} }</Tab.Screen>
            <Tab.Screen name="Plans" component={this.PlanScreen} />
          </Tab.Navigator>
      </>
     

    );
  }
}
