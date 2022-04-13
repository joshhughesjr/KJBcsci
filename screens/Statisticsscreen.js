
import * as React from 'react';
import { Text, StatusBar, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Donut from '../Donut'

import { getTransactionData } from '../plaid_components/RequestUtil';
import Icon from 'react-native-vector-icons/FontAwesome';

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

// Mock data
const data = [{
  name: "Item 1",
  percentage: 36,
  color: 'tomato',
  max: 100,
  radius: 130,
}, {
  name: "Item 2",
  percentage: 27,
  color: 'skyblue',
  max: 100,
  radius: 115,
}, {
  name: "Item 3",
  percentage: 12,
  color: 'gold',
  max: 100,
  radius: 100,
}, {
  name: "Item 4",
  percentage: 10,
  color: '#222',
  max: 100,
  radius: 85,
}, {
  name: "Item 5",
  percentage: 36,
  color: 'tomato',
  max: 100,
  radius: 130,
}, {
  name: "Item 6",
  percentage: 27,
  color: 'skyblue',
  max: 100,
  radius: 115,
}, {
  name: "Item 7",
  percentage: 12,
  color: 'gold',
  max: 100,
  radius: 100,
}, {
  name: "Item 8",
  percentage: 10,
  color: '#222',
  max: 100,
  radius: 85,
}, ]

export default class Statisticsscreen extends React.Component {

  constructor(props) {
    super(props);
    // transactionData is the raw transaction data retrieved from Plaid

    // transactionStats is the aggregate of all transaction costs based on cateogry
    // It is a map from category name -> transaction sum for that category

    // The "Other" category is a grouping of categories that contribute a very small amount to the overall transactions.
    // Other is not from transactionData, it is calculated when transactionStats is being calculated
    // otherCategories contains the set of categories that are considered "Other"
    this.state = {transactionData: null, transactionStats: null, otherCategories: null};
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

    // The total expenses across all categories
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
    
    // Get a list of the category totals
    // [0] -> Name of category
    // [1] -> Category total
    var category_totals_list = Object.entries(category_totals);

    // Sort the category totals in descending order based on percentage
    category_totals_list.sort((a,b) => {
      if( a[1] > b[1]) {
        return -1;
      }

      if( a[1] < b[1]) {
        return 1
      }

      return 0
    });

    var cutoff = 3;
    // If there are more than n categories, then everything other than the top n will be grouped into the "Other" category
    if (category_totals_list.length > cutoff) {

      // Set of categories that are grouped into "Other"
      // This is needed to retrieve all transactions in the "Other" category later
      var otherCategories = new Set();

      // The total expenses for all categories in "Other"
      var otherTotal = 0;

      // Go through the list in reverse order until the cutoff point is reached
      for(var i = category_totals_list.length - 1; i >= cutoff; i--) {
        // Add that category to the set of categories in Other
        otherCategories.add(category_totals_list[i][0]);

        // Add that category's transaction total to otherTotal
        otherTotal += category_totals_list[i][1]
        
        // Remove that category from the list
        category_totals_list.pop();
      }

      // Add the Other Category
      category_totals_list.push(["Other", otherTotal]);

      this.setState({otherCategories: otherCategories});

    }

    

    // The percentage of expense_total that the category contributes
    var output = [];

    for (var i = 0; i < category_totals_list.length; i++) {
      output.push({
        name: category_totals_list[i][0],
        percentage: (category_totals_list[i][1] / expense_total) * 100,
        color: '#6ebf4a',
        max: 100,
        radius: 120
      })
    }


    

    return output;
  }

  // Opens a separate window where individual transactions are listed based on a category
  showCategoryDetails(category_name) {
    console.log("Details for " + category_name)


    var transactions = []

    // Go through all of the transactions
    for(var i = 0; i < this.state.transactionData.length; i++) {
      // If the transaction's category matches, add it to the list of transactions

      if(this.state.transactionData[i].category[0] == category_name) {
        transactions.push(this.state.transactionData[i]);
      }
    }

    for(var i = 0; i < transactions.length; i++) {
      console.log(transactions[i]);
    }

  }

  render() {


    if (this.state.transactionStats != null) {
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
            alignItems: 'center',
            paddingBottom: 40}}>
    
            {stats.map((p, i) => {
              return (
                <Pressable style={{
                  width:"100%",
                  paddingHorizontal:20,
                  marginVertical: 15,
                  }} key={i} onPress={() => this.showCategoryDetails(p.name)}>
                <View style={{
                  flexDirection: "row", 
                  alignItems:"center"
                  }}>
                  
                  <Donut 
                  percentage={p.percentage} 
                  color={p.color} 
                  radius={ 75 }
                  delay={200 * i} 
                  max={p.max}/>

                  <Text style={{textAlign:"center", fontSize:20, marginLeft:"10%"}}>{p.name}</Text>
                  <Icon style={{
                    position:"absolute",
                    right: 10,
                    }} name={"angle-right"} color={'lightgrey'} size={40}/>
                </View>
                </Pressable>
              )
            })
            }
          </View>
        </ScrollView>
        </View>
      );
    } else {
      return <Text>Loading...</Text>
    }    
    
  }
}

