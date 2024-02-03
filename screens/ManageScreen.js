import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";

import Input from "../ui/Input";
import { GlobalStyles } from "../constants/styles";
import { CalendarContext } from "../store/calendar-context";
import Button from "../ui/Button";
import { Entries } from "../models/entries";
import AddDateTime from "../components/AddDateTime";
import SelectBox from "../components/SelectBox";

const entries = new Entries({
  title: "",
  description: "",
  definition: "",
  date: ""
});

export default function ManageScreen({ navigation }) {
  const entriesCTX = useContext(CalendarContext);
  const [addDate, setAddDate] = useState(entriesCTX.entries);
  const [showDescription, setShowDescription] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setAddDate(entriesCTX.entries);
    setShowPicker(false);
  }, [entriesCTX]);

  function onToggleDatePicker() {
    setShowPicker(!showPicker);
  }

  function onDateChange({ type }, date) {
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

  function setSelectedValue(val) {
    if (val === "Reminder" || val === "Task") {
      setShowDescription(true);
    } else {
      setShowDescription(false);
    }
    entries.definition = val;
  }

  function cancelActionHandler() {
    navigation.goBack();
  }

  function onChangeTitleHandler(value) {
    entries.title = value;
    return entries.title;
  }

  function onChangeHandler(value) {
    entries.description = value;
    return entries.description;
  }

  function onAddHandler() {
    console.log(addDate, entries);
  }

  return (
    <View style={styles.container}>
      {showPicker && (
        <AddDateTime
          value={date}
          display="spinner"
          mode="date"
          onDateChange={onDateChange}
        />
      )}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Title"
          label="Title"
          size={40}
          getValue={onChangeTitleHandler}
        />
        {showDescription && (
          <Input
            placeholder="Description"
            size={100}
            multiline
            getValue={onChangeHandler}
          />
        )}
        <View style={showDescription ? styles.selectContainer : null}>
          <SelectBox selectedValue={setSelectedValue} />
        </View>
        <Input
          placeholder="DD-MM-YYYY"
          label="Date"
          size={40}
          value={addDate}
          shown={true}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={cancelActionHandler}
            style={styles.styleButton}
            mode="flat"
          >
            Cancel
          </Button>
          <Button onPress={onAddHandler} style={styles.styleButton}>
            Add
          </Button>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24
  },
  selectContainer: {
    marginTop: 60
  },
  buttonContainer: {
    marginVertical: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  styleButton: {
    minWidth: 80,
    marginHorizontal: 16
  }
});
