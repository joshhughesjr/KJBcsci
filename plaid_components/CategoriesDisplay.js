import React from 'react';

import {Text, View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
  });

export default class CategoriesDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {accessToken: new String(), transactionData: new String(), category_data: null};
    }

    // Formats the data to only relevant data
    formatData(data) {
        if(data) {

            return data.map(transaction => ({acct_id: transaction.account_id, vendor_name: transaction.name, category: transaction.category, amount: transaction.amount, date: transaction.date}))
            //return data.map(acct => ({name: acct.name, type: acct.type, balance: acct.balances.current}));
        } else {
            return null;
        }
    }
    
    async componentDidMount() {

        // Get access_token from local storage
        try {

            // If the access token exists, then process it
            const token = await AsyncStorage.getItem('@access_token')

            if(token !== null) {

                this.setState({accessToken: token});

                var transaction_data = await this.getCategoryData(token);
                var formatted_transaction_data = this.formatData(transaction_data);
                //this.setState({transaction_data: JSON.stringify(formatted_transaction_data)});

                var category_data = {};

                // Sum up the total costs for each category
                for ( var i = 0; i < transaction_data.length; i++) {

                    // Ignore transactions that don't have a category
                    if(transaction_data.category != "") {

                        // If the category exists, add the amount to the total
                        if (transaction_data[i].category[0] in category_data) {
                            category_data[transaction_data[i].category[0]] += Number(transaction_data[i].amount);
                        } else {
                            // Else, add the category to the category data
                            category_data[transaction_data[i].category[0]] = Number(transaction_data[i].amount)
                        }

                    }
                    
                }

                this.setState({category_data: category_data});
            }

        } catch(e) {
            console.log(e);
        }

        // Get accounts from local storage
        try {
            const accounts = await AsyncStorage.getItem('@accounts')

            if(accounts != null) {
                this.setState({account_map: accounts});
            }
        } catch(e) {
            console.log(e);
        }

    }

    async getCategoryData(accessToken) {
        var startDate = new Date();
        //endDate.setDate(endDate.getDate() - 10);
        startDate.setMonth(startDate.getMonth() - 1);

        var formattedStart = this.getFormattedDate(startDate);
        var formattedEnd = this.getFormattedDate(new Date())
        

        const response = await fetch("https://birdboombox.com/api/getTransactions", {
            method: "POST",
            body: JSON.stringify({ 
                access_token: accessToken, 
                start_date: formattedStart,
                end_date: formattedEnd
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });


        const data = await response.json();
        return data;
    }

    // Gets the current date in YYYY-MM-DD format
    getFormattedDate(date) {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString();
        let day = d.getDate().toString();
        let year = d.getFullYear();
        if (month.length < 2) {
          month = '0' + month;
        }
        if (day.length < 2) {
          day = '0' + day;
        }
        return [year, month, day].join('-');
      }


    render() {
        if(this.state.accessToken == ""){
            // No access token state

            return <Text>No Bank Login Found</Text>;

        } else if (this.state.category_data != null) {
            var data = this.state.category_data;

            if (data.length == 0) {
                return <Text>No Data Found</Text>
            }

            // Convert key/value pair to iteratable list
            var list = Object.entries(data)

            // Displaying Data State
            return (
                <FlatList style={styles.container} data={list} renderItem={({item}) => <Text style={styles.item}>{item[0] + ": " + item[1]}</Text>} keyExtractor={(item, index) => index.toString()}/>
            )

        } else {
            
            // Loading State
            return (<ActivityIndicator size="large" color="#6ebf4a"/>)

        }
    }
}