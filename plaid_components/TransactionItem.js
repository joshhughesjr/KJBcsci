import React from 'react';

import {Text, View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDDDDD',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 2,
        height: 100,
    },
    item: {
        fontSize: 18,
        
        
    },
    date:{
        fontSize: 15,
        paddingTop: 2,
        color: '#666666'
    },
    amount: {
        fontSize: 20,
        textAlign: 'right',
        position: 'absolute',
        paddingRight: 20,
        paddingTop: 20,
        right: 0
    }
  });

// This component is for the listing of transaction data
// It represents one transaction in the list
export default class TransactionItem extends React.Component {

    render () {
        return (
            <>
            <View style={styles.container}>
            <Text style={styles.date}>{this.props.date}</Text>
            <Text style={styles.amount}>{ "$  " + this.props.amount * -1}</Text>
            <Text style={styles.item}>{this.props.account_id + "\n"}</Text>
            <Text style={styles.item}>{this.props.vendor_name}</Text>
            </View>
            </>
        )
    }
}