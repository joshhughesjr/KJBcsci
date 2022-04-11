import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import moment from 'moment';
import {Agenda, Calendar, CalendarList} from 'react-native-calendars';

const getMonthData = () => {
  //let loadingData = true;
  let dataToReturn = {
      '2022-04-08': [{name: 'item 1 - any js object'}],
      '2022-07-03': [{name: 'item 2 - any js object'}],
      '2022-04-06': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
    };
  return dataToReturn;
};

const CalendarScreen = () => {   
  const monthData = getMonthData();

  const renderItem = (item) => {
      return (
        <View style={styles.itemContainer}>
        
          <Text>{item.name}</Text>
          
        </View>
      );
  };

  return (
    <SafeAreaView style={styles.safe}>
          <Agenda
              items={monthData}
              renderItem={(item) => { return (renderItem(item)) }}
              selected={moment().format("YYYY-MM-DD")}
              showClosingKnob={true}
              theme={{
              calendarBackground: '#6ebf4a',
              textSectionTitleColor: 'white',
              textSectionTitleDisabledColor: 'black',
              selectedDayBackgroundColor: 'yellow',
              selectedDayTextColor: 'grey',
              todayTextColor: 'black',
              dayTextColor: 'black',
              textDisabledColor: 'grey',
              dotColor: 'white',
              selectedDotColor: '#ffffff',
              arrowColor: 'black',
              disabledArrowColor: 'grey',
              monthTextColor: '#6ebf4a',
              indicatorColor: '#6ebf4a',
              agendaDayTextColor: "black", // day name
              agendaDayNumColor: "black", // day number
              agendaTodayColor: "black", // today in list
              monthTextColor: "black", // name in calendar
              textDefaultColor: "black",
              textSectionTitleColor: "black",
              }}
              //renderEmptyData={renderEmptyItem}
              //renderEmptyDate={renderEmptyDate}
              //theme={calendarTheme}
          />       
          </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
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
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});

export default CalendarScreen;