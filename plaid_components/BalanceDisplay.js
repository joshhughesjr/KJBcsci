import React from 'react';

import {Text, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });

export default class BalanceDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {accessToken: new String(), balanceData: new String()};
    }

    // Formats the data to only relevant data
    formatData(balance) {
        if(balance) {
            return balance.Balance.accounts.map(acct => ({name: acct.name, type: acct.type, balance: acct.balances.current}));
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
                console.log(token);

                var data = await this.getBalance(token);
                var formatted = this.formatData(data);
                this.setState({balanceData: JSON.stringify(formatted)})

            }

        } catch(e) {
            console.log(e);
        }

    }

    async getBalance(accessToken) {
        const response = await fetch("https://birdboombox.com/api/getBalance", {
            method: "POST",
            body: JSON.stringify({ access_token: accessToken }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        
        return data;
    }


    render() {

        // Three main states
        if(this.state.accessToken == ""){
            // No access token state

            return <Text>No Bank Login Found</Text>;

        } else if (this.state.balanceData != "") {
            var data = JSON.parse(this.state.balanceData)

            if (data.length == 0) {
                return <Text>No Data Found</Text>
            }

            // Displaying Data State
            return (
                <FlatList data={data} renderItem={({item}) => <Text style={styles.item}>{item.name + ": " + item.balance}</Text>} keyExtractor={(item, index) => index.toString()}/>
            )

        } else {
            
            // Loading State
            return <Text>Loading...</Text>

        }
    }
}