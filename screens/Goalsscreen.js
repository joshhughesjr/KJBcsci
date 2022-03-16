import React from "react";
import { View, Button, Text, StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const GoalsScreen = () => {
  return (
    <View style={styles.center}>
      <Text>This is the Goals screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default GoalsScreen;