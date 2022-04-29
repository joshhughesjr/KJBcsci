import React from 'react';
import { View, StyleSheet, Text, Button } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

import CategoriesDisplay from "../plaid_components/CategoriesDisplay"
import BalanceDisplay from '../plaid_components/BalanceDisplay';
import TransactionDisplay from '../plaid_components/TransactionDisplay'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const App = () => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const spent = 25;
  const remaining = 25;
  const regular = 25;
  const total = spent + remaining + regular;

  const spentPercentage = (spent / total) * 100;
  const remainingPercentage = (remaining / total) * 100;
  const regularPercentage = (regular / total) * 100;

  const spentStrokeDashoffset =
    circleCircumference - (circleCircumference * spentPercentage) / 100;
  const billsStrokeDashoffset =
    circleCircumference - (circleCircumference * remainingPercentage) / 100;
  const regularStrokeDashoffset =
    circleCircumference - (circleCircumference * regularPercentage) / 100;

  const spentAngle = (spent / total) * 360;
  const billsAngle = (remaining / total) * 360;
  const regularAngle = spentAngle + billsAngle;

  const Tab = createMaterialTopTabNavigator();
  
  return (
    
    <View style={{display:"flex", flexDirection:"column", flex:1, justifyContent:"center", alignItems:"center" }}>
      <BalanceDisplay style={{flex: 1, marginTop: 10}}></BalanceDisplay>
      <TransactionDisplay style={{flex: 4}}></TransactionDisplay>
    </View>
    /*
      <>
          <Tab.Navigator>
            <Tab.Screen name="Balance" component={BalanceDisplay} />
            <Tab.Screen name="Transactions" component={TransactionDisplay} />

          </Tab.Navigator>
      </>
    */
  )

};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
  },
});
