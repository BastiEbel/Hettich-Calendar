import React, { useContext, useLayoutEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import moment from "moment";

import Input from "../ui/Input";
import { GlobalStyles } from "../constants/styles";
import { CalendarContext } from "../store/calendar-context";
import Button from "../ui/Button";
import { Entries } from "../models/entries";
import AddDateTime from "../components/AddDateTime";

export default function ManageScreen({ navigation }) {
  const entriesCTX = useContext(CalendarContext);
  const [addDate, setAddDate] = useState(entriesCTX.entries);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const entries = new Entries();

  useLayoutEffect(() => {
    setAddDate(entriesCTX.entries);
  }, [entriesCTX]);

  function onToggleDatePicker() {
    setShowPicker(!showPicker);
  }

  function onChange({ type }, date) {
    if (type == "set") {
      const currentDate = date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        onToggleDatePicker();
        const formattedDate = moment(currentDate).format("DD-MM-YYYY");
        entries.date = { startDate: formattedDate, lastDate: formattedDate };
        entriesCTX.getCalendarDate(entries.date);
      }
    } else {
      onToggleDatePicker();
    }
  }

  function cancelActionHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {showPicker && (
        <AddDateTime
          value={date}
          display="spinner"
          mode="date"
          onChange={onChange}
        />
      )}
      <View style={styles.inputContainer}>
        <Input label="Title" size={40} />
        <Input size={100} multiline />
        <Input
          label="Date"
          size={40}
          value={addDate}
          disabled={false}
          onPress={onToggleDatePicker}
        />
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
