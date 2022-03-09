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
                    console.log(success);
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
