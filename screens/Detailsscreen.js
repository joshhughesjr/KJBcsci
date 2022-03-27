import React from "react";
import { View, StyleSheet, Text } from "react-native";

import BalanceDisplay from "../plaid_components/BalanceDisplay";
import TransactionDisplay from "../plaid_components/TransactionDisplay";

const DetailsScreen = () => {
  return (
    <View style={styles.center}>
      <TransactionDisplay/>
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

export default DetailsScreen;
