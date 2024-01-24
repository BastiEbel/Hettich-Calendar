import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Input from "../ui/Input";
import { GlobalStyles } from "../constants/styles";
import { CalendarContext } from "../store/calendar-context";
import Button from "../ui/Button";
import { Entries } from "../models/entries";

export default function ManageScreen({ navigation }) {
  const entriesCTX = useContext(CalendarContext);
  const [addDate, setAddDate] = useState(entriesCTX.entries);

  const entries = new Entries();

  useEffect(() => {
    setAddDate(entriesCTX.entries);
  }, [entriesCTX]);

  function cancelActionHandler() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input label="Title" size={40} />
        <Input size={100} multiline />
        <Input label="Date" size={40} value={addDate} disabled={false} />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={cancelActionHandler} style={styles.style} mode="flat">
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
