import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";

import Input from "../ui/Input";
import { GlobalStyles } from "../constants/styles";
import { CalendarContext } from "../store/calendar-context";
import Button from "../ui/Button";
import { Entries } from "../models/entries";
import AddDateTime from "../components/AddDateTime";
import SelectBox from "../components/SelectBox";

export default function ManageScreen({ navigation }) {
  const entriesCTX = useContext(CalendarContext);
  const [addDate, setAddDate] = useState(entriesCTX.entries);
  const [showDescription, setShowDescription] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const entries = new Entries();

  useLayoutEffect(() => {
    setAddDate(entriesCTX.entries);
    setShowPicker(false);
  }, [entriesCTX]);

  function onToggleDatePicker() {
    setShowPicker(!showPicker);
  }

  function onChange({ type }, date) {
    if (type == "set") {
      const currentDate = date;
      setDate(currentDate);
      const formattedDate = moment(currentDate).format("DD-MM-YYYY");
      entries.date = { startDate: formattedDate, lastDate: formattedDate };
      entriesCTX.getCalendarDate(entries.date);
      setShowPicker(false);
    } else {
      onToggleDatePicker();
    }
  }

  function setSelectedValue(val) {}

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
        <Input placeholder="Title" label="Title" size={40} />
        <SelectBox selectedValue={(val) => setSelectedValue(val)} />
        {showDescription && (
          <Input placeholder="Description" size={100} multiline />
        )}
        <Input
          placeholder="DD-MM-YYYY"
          label="Date"
          size={40}
          value={addDate}
          shown={true}
          onPress={onChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={cancelActionHandler}
          style={styles.styleButton}
          mode="flat"
        >
          Cancel
        </Button>
        <Button style={styles.styleButton}>Add</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary100
  },
  inputContainer: {
    width: 300,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  styleButton: {
    minWidth: 80,
    marginHorizontal: 16
  }
});
