import React from 'react';

import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {openLink} from 'react-native-plaid-link-sdk';

import AsyncStorage from '@react-native-async-storage/async-storage';

const urlBase = "https://birdboombox.com/";

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#6ebf4a",
      }
})


// This component handles the PlaidLink component from react-native-plaid-link-sdk
// The PlaidLink Component requires a link token in order to work properly
// When this component is loaded, it asynchronously requests a link token from the backend server.
// When the link token is not yet retrieved, the component displays a loading screen and waits for the link token
// When the link token is retrieved, the component uses that to render the PlaidLink Component which allows user login
export default class PlaidLinkHandler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {linkToken: new String()};
    }
    
    async componentDidMount() {
        // Get Link Token asynchronously when this component is displayed
        try {
            const response = await fetch(urlBase + "api/create_link_token", {
                method: 'GET'
            });
            
            // When the link token is retrieved, then save that into the component state
            const data = await response.json();
            this.setState({linkToken: data.link_token});
            

        } catch (error) {
            console.error(error);
        }
        
        
    }

    componentWillUnmount() {
        if (this._listener) {
            this._listener.remove();
        }
    }

    async getAccessToken(public_token) {
        console.log("Public token: " + public_token);
        console.log("fetching access token");
        
        const response = await fetch(urlBase + "api/exchange_public_token", {
            method: "POST",
            body: JSON.stringify({ public_token: public_token }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        const token = data.access_token;

        return token;
    }

    openPlaidLink() {
        var plaidProps = {
            tokenConfig:{token: this.state.linkToken},
            onSuccess: async (success) => {
                
                
                // The link_token has been exchanged for a public_token
                // Exchange the public_token for an access_token
                const publicToken = success.publicToken;

                    
                // Get the access token
                const accessToken = await this.getAccessToken(publicToken);
                console.log(accessToken);
            
                // Save the access_token to storage
                try {
                    await AsyncStorage.setItem('@access_token', accessToken)
                } catch (e) {
                    console.log("Save Error")
                }
                
                // Test Retrieving Token
                try {
                    const value = await AsyncStorage.getItem('@access_token')
                    if(value !== null) {
                        console.log("Retrieved Token: " + value)
                    }
                } catch(e) {
                    console.log("Access Token Not Found")
                }

               
            },
            onExit: () => console.log("exit")
        }
        
        openLink(plaidProps)
    }

    render() {
        if (this.state.linkToken == '') {
            // No link token yet, display loading button
            
            return (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => {}}
                >
                    <Text>Loading...</Text> 
                </TouchableOpacity>
            )
        } else {
            // Retrieved Link token, link process can be performed
            return (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => {this.openPlaidLink()}}
                >
                    <Text>Add Account</Text> 
                </TouchableOpacity>
            )

        }

            
      
    }
  }
