import React from "react";
import { View, StyleSheet, Text } from "react-native";

import PlaidLinkHandler from '../plaid_components/PlaidLinkHandler.js';

const AddAccountScreen = () => {
  return (
    <View style={styles.center}>
      <Text>This is the Add Accountsss screen</Text>
      <PlaidLinkHandler/>
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

export default AddAccountScreen;