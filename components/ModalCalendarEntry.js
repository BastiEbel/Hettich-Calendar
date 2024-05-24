import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import { CalendarContext } from "../store/calendar-context";
import { GlobalStyles } from "../constants/styles";
import Input from "../ui/Input";
import AddDateTime from "./AddDateTime";
import SelectBox from "./SelectBox";
import { deleteItem, fetchEntries } from "../util/database";

function ModalCalendarEntry({ onClose }) {
  const { entries } = useContext(CalendarContext);
  const [getItems, setGetItems] = useState();
  const [enable, setEnable] = useState({
    enableInput: true,
    timePicker: false,
    datePicker: false,
    enableButton: false,
    textButton: "Edit"
  });

  function onPressHandler() {
    setEnable((curEnable) => ({
      ...curEnable,
      enableInput: false,
      timePicker: false,
      datePicker: false,
      enableButton: true,
      textButton: "Save"
    }));
  }

  async function onDeleteHandler() {
    const getLoadedItems = await fetchEntries();
    let listOfDates = [];
    getLoadedItems.map((id) => {
      if (id.dateValue === entries.dateValue) {
        listOfDates.push(id.id);
        deleteItem(listOfDates);
      }
    });
    onClose();
  }

  function selectedValue(value) {
    setGetItems((curItem) => ({ ...curItem, definition: value }));
  }

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.closeContainer}>
        <IconButton
          icon="close-outline"
          onPress={onClose}
          size={48}
          color={GlobalStyles.colors.primary500}
        />
      </View>
      {enable.datePicker && (
        <AddDateTime
          value={date.dateValue}
          display="spinner"
          mode="date"
          onDateChange={onDateChange}
        />
      )}
      {enable.timePicker && (
        <AddDateTime
          value={date.dateValue}
          display="spinner"
          mode="time"
          onDateChange={onTimeChange}
        />
      )}
      <View style={styles.inputContainer}>
        <Input
          //validation={!title.isValid}
          disabled={enable.enableInput}
          value={entries.title}
          placeholder="Title"
          label="Title"
          size={40}
          //getValue={onChangeTitleHandler}
        />
        {entries.isDescriptionVisible === 1 && (
          <Input
            //validation={!description.isValid}
            disabled={enable.enableInput}
            value={entries.description}
            placeholder="Description"
            size={100}
            multiline
            //getValue={onChangeDescriptionHandler}
          />
        )}
        <View
          style={
            entries.isDescriptionVisible === 1 ? styles.selectContainer : null
          }
        >
          <SelectBox
            disabled={enable.enableInput}
            selectedValue={(val) => selectedValue(val)}
            getValue={entries.definition}
            //validation={!definition.isValid}
          />
        </View>
        <Input
          disabled={enable.enableInput}
          placeholder="DD-MM-YYYY"
          label="Date"
          size={40}
          value={entries.dateValue}
          shown={true}
        />
        {entries.isDescriptionVisible === 1 && (
          <Input
            disabled={enable.enableInput}
            placeholder="HH:MM"
            label="Time"
            size={40}
            value={entries.time}
            time={true}
            //onPress={onTimeChange}
          />
        )}
        {/* {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data!
          </Text>
        )} */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={onDeleteHandler}
            style={styles.styleButton}
            mode="flat"
          >
            Delete
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
    //minHeight: 600,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  closeContainer: {
    width: "100%",
    alignItems: "flex-end"
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
