import React from 'react';
import { View, StyleSheet, Text, Button } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

import CategoriesDisplay from "../plaid_components/CategoriesDisplay"

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

  
  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="250" width="250" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            { total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
             ) : (
               <>
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#7aeb7c"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={spentStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                 />
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#4a9c41"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={billsStrokeDashoffset}
                  rotation={spentAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                 />
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#1e4d19"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={regularStrokeDashoffset}
                  rotation={regularAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
               </>
             )
            }
          </G>
        </Svg>
        <Text style={styles.label}>${total}</Text>
      </View>
    </View>
  )

  /*
  return (
    <CategoriesDisplay></CategoriesDisplay>
  )
  */
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
