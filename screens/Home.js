import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarComponent from "../components/CalendarComponent";
import { GlobalStyles } from "../constants/styles";

export default function Home() {
  return (
    <View style={styles.container}>
      <CalendarComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    justifyContent: "center"
  }
});
