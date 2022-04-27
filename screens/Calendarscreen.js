import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import {Agenda} from 'react-native-calendars';
import {getTransactionData} from '../plaid_components/RequestUtil'

export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData: null
    };
  }
  

  render() {
    return (
      <Agenda
        //renderEmptyData={() => null}
        items={this.state.transactionData}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={moment().subtract(1,'month').format('YYYY-MM-DD')}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderEmptyDateS={(this.renderItem.bind(this))}
        showClosingKnob={true}
        pastScrollRange={50}
        futureScrollRange={50}
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
      />
    );
  }
  
   async loadItems() {
    
      const trans = await getTransactionData();
      this.setState({transactionData: trans});
    
    // Process Transaction Data
    const newItems = {};
    Object.keys(this.state.transactionData).forEach(key => {
      const t = this.state.transactionData[key]
      newItems[t.date] = [{
        'name': t.vendor_name + " $" + t.amount
      }]});
    this.setState({
        transactionData: newItems
    });
  }


  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  renderEmptyDate() {
    return (
      <View style={styles.item}><Text>This is empty date!</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
/*if (this.state.transactionData == null) {
  const trans = await getTransactionData();
  this.setState({transactionData: trans});
  
}

// Process Transaction Data
const newItems = {};
Object.keys(this.state.transactionData).forEach(key => {
  const t = this.state.transactionData[key]
  newItems[t.date] = [{
    'name': t.vendor_name + " $" + t.amount
  }]});
this.setState({
    transactionData: newItems
});*/