import React from "react";
import { 
  View, 
  Button, 
  Text, 
  StyleSheet, 
  Image,
  TouchableOpacity } 
from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlaidLinkHandler from "../plaid_components/PlaidLinkHandler";
const AccountScreen = ({navigation}) => {
  return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Josh Hughes</Text>
            
              <PlaidLinkHandler></PlaidLinkHandler>
              

              <TouchableOpacity style={styles.buttonContainer}
              onPress={() => navigation.navigate('View Account')}
              >
                <Text>View Account</Text> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}
              onPress={() => navigation.navigate('History')}
              >
                <Text>History</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}
              onPress={() => navigation.navigate('Preferences')}
              >
                <Text>Preferences</Text> 
              </TouchableOpacity>
              
            </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#6ebf4a",
    height:125,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:65
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },

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
  },
});

export default AccountScreen;