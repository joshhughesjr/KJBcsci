import React from 'react';

import {Text, View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

import TransactionItem from './TransactionItem';
import {getTransactionData} from './RequestUtil'

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

export default class TransactionDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {accessToken: new String(), transactionData: new String(), account_map: null};
    }

    // Formats the data to only relevant data
    formatData(data) {
        if(data) {
            //return data;
            return data.map(transaction => ({acct_id: transaction.account_id, vendor_name: transaction.name, category: transaction.category, amount: transaction.amount, date: transaction.date}))
            //return data.map(acct => ({name: acct.name, type: acct.type, balance: acct.balances.current}));
        } else {
            return null;
        }
    }
    
    async componentDidMount() {

        // Get access_token from local storage
        try {

            const token = await AsyncStorage.getItem('@access_token')

            if(token !== null) {

                this.setState({accessToken: token});

                var data = await getTransactionData();
                console.log(data)
                this.setState({transactionData: JSON.stringify(data)})
            
            }
            
            /*
            // If the access token exists, then process it
            const token = await AsyncStorage.getItem('@access_token')

            if(token !== null) {

                this.setState({accessToken: token});

                var data = await this.getTransactions(token);
                var formatted = this.formatData(data);
                this.setState({transactionData: JSON.stringify(formatted)})

            }
            */

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

    async getTransactions(accessToken) {
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

        } else if (this.state.transactionData != "" && this.state.account_map != null) {
            var data = JSON.parse(this.state.transactionData)
            console.log(data)

            var account_map = JSON.parse(this.state.account_map);

            if (data.length == 0) {
                return <Text>No Data Found</Text>
            }

            // Displaying Data State
            return (
                <FlatList style={styles.container} data={data} renderItem={({item}) => <TransactionItem account_id={account_map[item.acct_id]} date={item.date} vendor_name={item.vendor_name} category={item.category[0]} amount={item.amount}/>} keyExtractor={(item, index) => index.toString()}/>
            )
                // <Text style={styles.item}>{account_map[item.acct_id] + " - " + item.vendor_name + " " + item.category[0] + ": " + item.amount}</Text>
        } else {
            
            // Loading State
            return (<ActivityIndicator size="large" color="#6ebf4a"/>)

        }
    }
}