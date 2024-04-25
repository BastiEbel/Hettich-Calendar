import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../ui/Button";
import { CalendarContext } from "../store/calendar-context";
import { GlobalStyles } from "../constants/styles";
import Input from "../ui/Input";
import AddDateTime from "./AddDateTime";
import SelectBox from "./SelectBox";
import { fetchEntries } from "../util/database";

function ModalCalendarEntry({ onClose }) {
  const { entries } = useContext(CalendarContext);
  const [getItems, setGetItems] = useState(entries);
  const [enable, setEnable] = useState({
    enableInput: true,
    enableButton: false,
    textButton: "Edit"
  });

  useEffect(() => {
    loadAllItems();
  }, []);

  async function loadAllItems() {
    const getLoadedItems = await fetchEntries();
    let listOfDates = [];
    getLoadedItems.map((dateValue) => {
      if (dateValue.dateValue === getItems.dateValue) {
        listOfDates.push(dateValue);
      }
    });

    //console.log(listOfDates);
  }

  function onPressHandler() {
    setEnable((curEnable) => ({
      ...curEnable,
      enableInput: false,
      enableButton: true,
      textButton: "Save"
    }));
  }

  function selectedValue(value) {
    setGetItems((curItem) => ({ ...curItem, definition: value }));
  }

  return (
    <View style={styles.bodyContainer}>
      {/* {showPicker && (
        <AddDateTime
          value={date.dateValue}
          display="spinner"
          mode="date"
          onDateChange={onDateChange}
        />
      )}
      {showTimer && (
        <AddDateTime
          value={date.dateValue}
          display="spinner"
          mode="time"
          onDateChange={onTimeChange}
        />
      )} */}
      <View style={styles.inputContainer}>
        <Input
          //validation={!title.isValid}
          disabled={enable.enableInput}
          value={getItems.title}
          placeholder="Title"
          label="Title"
          size={40}
          //getValue={onChangeTitleHandler}
        />
        {/* {showDescription && (
          <Input
            validation={!description.isValid}
            value={description.value}
            placeholder="Description"
            size={100}
            multiline
            getValue={onChangeDescriptionHandler}
          />
        )} */}
        <View /*style={showDescription ? styles.selectContainer : null}*/>
          <SelectBox
            disabled={enable.enableInput}
            selectedValue={(val) => selectedValue(val)}
            getValue={getItems.definition}
            //validation={!definition.isValid}
          />
        </View>
        <Input
          disabled={enable.enableInput}
          placeholder="DD-MM-YYYY"
          label="Date"
          size={40}
          value={getItems.dateValue}
          shown={true}
        />
        {/* {showDescription && (
          <Input
            placeholder="HH:MM"
            label="Time"
            size={40}
            value={date.time}
            time={true}
            onPress={onTimeChange}
          />
        )} */}
        {/* {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data!
          </Text>
        )} */}
        <View style={styles.buttonContainer}>
          <Button onPress={onClose} style={styles.styleButton} mode="flat">
            Cancel
          </Button>
          <Button
            disabled={enable.enableButton}
            onPress={onPressHandler}
            style={styles.styleButton}
          >
            {enable.textButton}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ModalCalendarEntry;

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: GlobalStyles.colors.primary100,
    width: "90%",
    minHeight: 600,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
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
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 16
  }
});
