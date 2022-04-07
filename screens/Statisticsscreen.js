
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
      this.state = {transactionData: await getTransactionData()};

      console.log(this.processTransactionData(this.state.transactionData))
    }
  }

  processTransactionData(transaction_data) {
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

            expense_total += Number(transaction_data[i].amount);

        }
        
    }
    

    return category_totals;
  }

  render() {
    return (
      <ScrollView 
      style={styles.container}>
        <StatusBar hidden/>
        <View style={{
          flexDirection: 'column', 
          justifyContent: 'space-evenly', 
          flexWrap: 'wrap', 
          alignItems: 'center'}}>
  
          {data.map((p, i) => {
            return <Donut key={i} 
            percentage={p.percentage} 
            color={p.color} 
            radius={p.radius}
            delay={500 + 100} 
            max={p.max}/>
          })}
        </View>
      </ScrollView>
    );
  }
}

