import React from 'react';

import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

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

function formatCurrency(amount) {

return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2}).format(amount)

}

export default class BalanceDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {accessToken: new String(), balanceData: new String()};
    }

    // Formats the data to only relevant data
    formatData(balance) {
        if(balance) {
            console.log(balance)
            return balance.Balance.accounts.map(acct => ({name: acct.name, type: acct.type, available: acct.balances.available}));
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
                
                <View style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                    <Text style={{textAlign:"center", fontSize:30}}>Available Balance:</Text>
                    <Text style={{textAlign:"center", fontSize:30}}>{formatCurrency(data[0].available)}</Text>
                </View>
                
                //<FlatList data={data} renderItem={({item}) => <Text style={styles.item}>{item.name + ": " + item.available}</Text>} keyExtractor={(item, index) => index.toString()}/>
            )

        } else {
            
            // Loading State
            //return (<ActivityIndicator size="large" color="#6ebf4a"/>)
            return <Text>Loading Balance...</Text>
        }
    }
}