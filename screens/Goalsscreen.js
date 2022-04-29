import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'

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
    minWidth: 100,
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
  }, 
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input_container: {
    flexDirection:"row",
    alignItems:"center"
  },
  input_label: {
    fontSize: 20
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
          <View style={{flexDirection:"column"}}>

            <View style={styles.input_container}>
              <Text style={styles.input_label}>Name:</Text><TextInput value={props.screen_state.input_name} onChangeText={ (text) => props.screen_state.callback_functions.input_callback(text, "name")} style = {[styles.input, {flex:1}]}></TextInput>
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_label}>Saving Goal: $</Text><TextInput value={props.screen_state.input_save_goal} onChangeText={ (text) => props.screen_state.callback_functions.input_callback(text, "goal")} keyboardType="numeric" style = {[styles.input, {flex:1}]}></TextInput>
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_label}>Currently Saved: $</Text><TextInput value={props.screen_state.input_amount_saved} onChangeText={ (text) => props.screen_state.callback_functions.input_callback(text, "saved")} keyboardType="numeric" style = {[styles.input, {flex:1}]}></TextInput>
            </View>

            <Text style={[styles.input_label, {textAlign:"center"}]}>Goal Date:</Text>
            <View style={styles.input_container}>
              <DatePicker mode="date" date={props.screen_state.input_goal_date} onDateChange={ (date) => props.screen_state.callback_functions.input_callback(date, "date")}minimumDate={new Date()} style = {[styles.input, {flex:1}]}></DatePicker>
            </View>


          <View style={styles.input_container}>
          <TouchableOpacity onPress={ () => {props.screen_state.callback_functions.modal_callback()}} style={[styles.buttonContainer, {marginRight: 10}]}><Text>Cancel</Text></TouchableOpacity>
          <TouchableOpacity onPress={ () => {props.screen_state.callback_functions.modal_callback(props.screen_state.edit_index, true)}} style={[styles.buttonContainer, {marginRight: 10, marginLeft: 10}]}><Text>Delete</Text></TouchableOpacity>
          <TouchableOpacity onPress={ () => {props.screen_state.callback_functions.modal_callback(props.screen_state.edit_index)}} style={[styles.buttonContainer, {marginLeft: 10}]}><Text>Submit</Text></TouchableOpacity>
          
          </View>
          </View>
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
    this.inputCallback = this.inputCallback.bind(this);

    this.state =
    {
        modal_visible: false,
        modal_data: null,
        callback_functions: {
          button_callback: this.buttonCallback,
          modal_callback: this.modalCallback,
          input_callback: this.inputCallback
        },
        input_name: "",
        input_save_goal:"",
        input_amount_saved: "",
        input_goal_date: new Date(),
        edit_index: 0,
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
          "name": "Space Vacation",
          "goal_date": "2041-01-01",
          "save_goal": 1000000,
          "amount_saved": 5
        }]
    }
    /*
    , {
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
        }
    */
  }
  
  PlanScreen(props) {
    return (
      <View style={styles.center}>
        <Text>Plans will be here</Text>
      </View>
    );
  }

  // Callback for either the Add Goal button or the gear icon buttons for editing existing goals
  buttonCallback(index = -1) {
    
    
    this.setState({modal_visible: true});
    this.setState({edit_index: index});

    if(index == -1) {

      this.setState({modal_data: null})

      this.setState({
        input_name: "",
        input_save_goal:"",
        input_amount_saved: "",
        input_goal_date: new Date(),
    })

      // No index specified, create new goal
    
    } else {
      // Index specified, modify that index's value in goals

        this.setState({modal_data: this.state.goals[index]})
        this.setState({
            input_name: this.state.goals[index].name,
            input_save_goal: this.state.goals[index].save_goal.toString(),
            input_amount_saved: this.state.goals[index].amount_saved.toString(),
            input_goal_date: new Date(this.state.goals[index].goal_date),
        })
    }
  
  }

  // Callback for the submit, cancel, and delete buttons for the modal
  // If there is valid data passed to the function, then the function updates the goals data
  // Else, it just closes the modal
  modalCallback(index = -2, remove = false) {
    
    var modified = this.state.goals;
    this.setState({modal_visible: false})

    
    if (index == -2) {
      // If there is no data, then don't do anything and cancel inputting
      return

    } else if (index == -1) {
      // Index -1 means create a new goal
      modified.push({
          name: this.state.input_name,
          goal_date: this.state.input_goal_date,
          save_goal: this.state.input_save_goal,
          amount_saved: this.state.input_amount_saved
      })
    } else {

      if (!remove ) {

        modified[index] = {
          name: this.state.input_name,
          goal_date: this.state.input_goal_date,
          save_goal: this.state.input_save_goal,
          amount_saved: this.state.input_amount_saved
        }

        
      } else {
        modified.splice(index, 1)
      }
        
    }

    // State is immutable, so modifying the array means giving it a whole new one
    this.setState({goals: modified})
  }

  // Callback for the various input fields on the modal
  // This is called whenever any of the input fields' values are changed
  // The identifier determines what value is changed
  inputCallback(value, identifier) {
    switch(identifier) {
      case "name":
        this.setState({input_name: value});
        break
      case "goal":
        this.setState({input_save_goal: value});
        break
      case "saved":
        this.setState({input_amount_saved: value});
        break
      case "date":
        this.setState({input_goal_date: value});
        break
      default:
        break
    }
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
