import React, {useState} from 'react';

import {Text} from 'react-native';

import { PlaidLink, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk';

// https://birdboombox.com/
const urlBase = "https://birdboombox.com/";

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

    async getAccessToken(public_token) {
        console.log("Public token: " + public_token);
        console.log("fetching access token");
        
        const response = await fetch(urlBase + "/api/exchange_public_token", {
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

    async testGetBalance(accessToken) {
        const response = await fetch(urlBase + "/api/getBalance", {
            method: "POST",
            body: JSON.stringify({ access_token: accessToken }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        
        console.log(data)
    }

    async testGetTransactions(accessToken) {
        console.log("awaiting transaction data...")
        const response = await fetch(urlBase + "/api/getTransactions", {
            method: "POST",
            body: JSON.stringify({ 
                access_token: accessToken,
                start_date : '2022-03-01',
                end_date: '2022-03-16'
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(JSON.stringify(response))
        const data = await response.json();
        
        console.log(data)
    }

    render() {
        if (this.state.linkToken == '') {
            // No link token yet, display loading screen
            
            return <Text>Loading...</Text>
        } else {
            // Use the link token in the PlaidLink Component
            return (
                <PlaidLink
                    tokenConfig={{
                        token: this.state.linkToken,
                    }}
                    onSuccess={(success) => {
                    // The link_token has been exchanged for a public_token
                    // Exchange the public_token for an access_token
                    const publicToken = success.publicToken;
                    
                    (async () => {
                        // Get the access token
                        const accessToken = await this.getAccessToken(publicToken);
                        console.log(accessToken);

                        this.testGetTransactions(accessToken)
                    })();

                    }}
                    onExit={(exit) => {
                        console.log(exit);
                    }}
                >
                
                <Text>Add Account</Text>
                </PlaidLink>
            )

        }

            
      
    }
  }
