
import * as React from 'react';
import { Text, StatusBar, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Donut from '../Donut'

const data = [{
  percentage: 36,
  color: 'tomato',
  max: 100,
  radius: 130,
}, {
  percentage: 27,
  color: 'skyblue',
  max: 100,
  radius: 115,
}, {
  percentage: 12,
  color: 'gold',
  max: 100,
  radius: 100,
}, {
  percentage: 10,
  color: '#222',
  max: 100,
  radius: 85,
}]

export default function Statisticsscreen() {
  return (
    <ScrollView 
    style={styles.container}>
      <StatusBar hidden/>
      <View style={{
        flexDirection: 'column', 
        justifyContent: 'space-evenly', 
        flexWrap: 'wrap', 
        alignItems: 'center'}}>

        {data.map((p, i) => {
          return <Donut key={i} 
          percentage={p.percentage} 
          color={p.color} 
          radius={p.radius}
          delay={500 + 100 * i} 
          max={p.max}/>
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 8,

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

