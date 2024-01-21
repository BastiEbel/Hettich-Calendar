import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "../ui/Input";
import { GlobalStyles } from "../constants/styles";
import { CalendarContext } from "../store/calendar-context";
import Button from "../ui/Button";

export default function ManageScreen() {
  const entriesCTX = useContext(CalendarContext);

  console.log(entriesCTX.entries);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input label="Title" size={40} />
        <Input size={100} multiline />
        <Input label="Date" size={40} />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.style} mode="flat">
          Cancel
        </Button>
        <Button style={styles.style}>Add</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary100
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 350,
    paddingVertical: 24
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  style: {
    minWidth: 80,
    marginHorizontal: 16
  }
});
