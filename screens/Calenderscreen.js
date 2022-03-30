import React, {Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import AppRegistry from 'react-native';
import moment from 'moment';
import {Agenda, Calendar, CalendarList} from 'react-native-calendars';
import Moment from 'moment';
const width = Dimensions.get('window').width;
let fetchedDates = ["2022-03-15", "2022-03-16", "2022-03-17", "2022-03-18"];
let markedDatesArray = [];

/*for (let i = 0; i < fetchedDates.length; i++) {
  markedDatesArray.push({
    date: moment(`${fetchedDates[i]}`, "YYYY-MM-DD"),
    dots: [
      {
        color: '#000000',
      },
    ],
  });
}
*/

export default class CalenderScreen extends Component {
  state = {
    items: undefined
  };
  render() {
  return (
        <Agenda 
        selected={moment().format("YYYY-MM-DD")}
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
        theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#6ebf4a',
        textSectionTitleColor: 'white',
        textSectionTitleDisabledColor: 'black',
        selectedDayBackgroundColor: 'yellow',
        selectedDayTextColor: 'grey',
        todayTextColor: 'black',
        dayTextColor: 'black',
        textDisabledColor: 'grey',
        dotColor: 'yellow',
        selectedDotColor: '#ffffff',
        arrowColor: 'black',
        disabledArrowColor: 'grey',
        monthTextColor: '#6ebf4a',
        indicatorColor: '#6ebf4a'
        }}
        />
  );
};

loadItems = (day) => {
    const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
      
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }


  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});