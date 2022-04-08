
import * as React from 'react';
import { Text, StatusBar, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Donut from '../Donut'

import { getTransactionData } from '../plaid_components/RequestUtil';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const data = [{
  percentage: 36,
  color: 'tomato',
  max: 100,
  radius: 130,
}, {
  percentage: 27,
  color: 'skyblue',
  max: 100,
  radius: 115,
}, {
  percentage: 12,
  color: 'gold',
  max: 100,
  radius: 100,
}, {
  percentage: 10,
  color: '#222',
  max: 100,
  radius: 85,
}]

export default class Statisticsscreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {transactionData: null, transactionStats: null};
  }

  async componentDidMount() {

    // Check for transactionData
    if (this.state.transactionData == null) {
      this.setState({transactionData: await getTransactionData()});
    }
    
    // Process Transaction Data
    this.setState({transactionStats: this.processTransactionData(this.state.transactionData)});
  }

  processTransactionData(transaction_data) {

    // The total costs based on categories
    var category_totals = {};

    var expense_total = 0;
    // Sum up the total costs for each category
    for ( var i = 0; i < transaction_data.length; i++) {

        // Ignore transactions that don't have a category
        if(transaction_data.category != "") {

            // If the category exists, add the amount to the total
            if (transaction_data[i].category[0] in category_totals) {
                category_totals[transaction_data[i].category[0]] += Number(transaction_data[i].amount);
            } else {
                // Else, add the category to the category data
                category_totals[transaction_data[i].category[0]] = Number(transaction_data[i].amount);
            }
            
            // Also add this expense to the expense total
            expense_total += Number(transaction_data[i].amount);

        }
        
    }
    
    // The percentage of expense_total that the category contributes
    var output = [];

    for (const [key, value] of Object.entries(category_totals)) {
      output.push({
        percentage: (value / expense_total) * 100,
        color: 'tomato',
        max: 100,
        radius: 130
      })
    }

    console.log(output)

    // Sort the output in descending order based on percentage
    output.sort((a,b) => {
      if( a.percentage > b.percentage) {
        return -1;
      }

      if( a.percentage < b.percentage) {
        return 1
      }

      return 0
    })
    return output;
  }

  render() {


    if (this.state.transactionData != null && this.state.transactionStats != null) {
      var stats = this.state.transactionStats;
      return (
        <View style={{flex:1}}>
        <ScrollView 
        style={styles.container}>
          <StatusBar hidden/>
          <View style={{
            flexDirection: 'column', 
            justifyContent: 'space-evenly', 
            flexWrap: 'wrap', 
            alignItems: 'center'}}>
    
            {stats.map((p, i) => {
              return <Donut key={i} 
              percentage={p.percentage} 
              color={p.color} 
              radius={100 + 100 * (p.percentage / 100)}
              delay={200 * i} 
              max={p.max}/>
            })}
          </View>
        </ScrollView>
        </View>
      );
    } else {
      return <Text>Loading...</Text>
    }

    console.log(this.state.transactionData == null + " " + this.state.transactionStats == null);
    
    
  }
}

