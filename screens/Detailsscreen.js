import React from "react";
import { View, StyleSheet, Text } from "react-native";

import BalanceDisplay from "../plaid_components/BalanceDisplay";

const DetailsScreen = () => {
  return (
    <View style={styles.center}>
      <BalanceDisplay/>
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
