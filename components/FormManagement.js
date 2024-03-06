import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import moment from "moment";

import Input from "../ui/Input";
import { GlobalStyles } from "../constants/styles";
import { CalendarContext } from "../store/calendar-context";
import Button from "../ui/Button";
import AddDateTime from "./AddDateTime";
import SelectBox from "./SelectBox";
import { useNavigation } from "@react-navigation/native";
import { deleteTable, insertEntries } from "../util/database";

export default function FormManagement({ onCancel }) {
  const navigation = useNavigation();
  const entriesCTX = useContext(CalendarContext);
  const [addDate, setAddDate] = useState(entriesCTX.entries);
  const [showDescription, setShowDescription] = useState(false);
  const [inputs, setInputs] = useState({
    title: { value: "", titleIsValid: true },
    description: { value: "", descriptionIsValid: true },
    definition: { value: "", definitionIsValid: true },
    setDescriptionVisible: false,
    date: {
      dateValue: "",
      time: ""
    }
  });
  const [showPicker, setShowPicker] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    setAddDate(entriesCTX.entries);
    const newTime = new Date().getTime();
    setInputs((curInput) => {
      return {
        ...curInput,
        date: {
          dateValue: entriesCTX.entries,
          time: moment(newTime).format("HH:mm")
        }
      };
    });
  }, [entriesCTX]);

  function onToggleDatePicker() {
    setShowPicker(!showPicker);
  }

  function onToggleTimerPicker() {
    setShowTimer(!showTimer);
  }

  function onDateChange({ type }, date) {
    onToggleDatePicker();
    if (type == "set") {
      const currentDate = date;
      const formattedDate = moment(currentDate).format("DD-MM-YYYY");
      setInputs((curInput) => {
        return { ...curInput, date: { dateValue: formattedDate } };
      });
      setShowPicker(false);
    }
  }

  function onTimeChange({ type }, date) {
    onToggleTimerPicker();
    if (type == "set") {
      const currentTime = date.getTime();
      const formattedTime = moment(currentTime).format("HH:mm");
      setInputs((curTime) => {
        return { ...curTime, date: { time: formattedTime } };
      });
      setShowTimer(false);
    }
  }

  function setSelectedValue(val) {
    if (val === "Reminder" || val === "Task") {
      setShowDescription(true);
    } else {
      setShowDescription(false);
    }
    setInputs((curDefinition) => {
      return {
        ...curDefinition,
        definition: { value: val, definitionIsValid: true }
      };
    });
  }

  function onChangeTitleHandler(value) {
    setInputs((curTitle) => {
      return { ...curTitle, title: { value: value, titleIsValid: true } };
    });
  }

  function onChangeDescriptionHandler(value) {
    setInputs((curDescription) => {
      return {
        ...curDescription,
        description: { value: value, descriptionIsValid: true },
        setDescriptionVisible: true
      };
    });
  }

  function onAddHandler() {
    let descriptionIsValid = true;

    const entries = {
      title: inputs.title.value,
      description: inputs.description.value,
      definition: inputs.definition.value,
      markedDates: entriesCTX.markedDates.date.markedDates,
      setDescriptionVisible: inputs.setDescriptionVisible,
      date: {
        dateValue: inputs.date.dateValue,
        time: inputs.date.time
      }
    };
    const titleIsValid = entries.title.trim().length > 0;
    if (showDescription) {
      descriptionIsValid = entries.description.trim().length > 0;
    }
    const definitionIsValid = entries.definition.trim().length > 0;

    if (!titleIsValid || !descriptionIsValid || !definitionIsValid) {
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, titleIsValid: titleIsValid },
          description: {
            value: curInputs.description.value,
            descriptionIsValid: descriptionIsValid
          },
          definition: {
            value: curInputs.definition.value,
            definitionIsValid: definitionIsValid
          },
          date: {
            dateValue: curInputs.date.dateValue,
            time: curInputs.date.time
          }
        };
      });
      return;
    }
    //deleteTable();
    insertEntries(entries);
    entriesCTX.multiDateSelected = false;
    clearInputs();
  }

  function clearInputs() {
    setInputs({
      title: { value: "", titleIsValid: true },
      description: { value: "", descriptionIsValid: true },
      definition: { value: "", definitionIsValid: true },
      setDescriptionVisible: false,
      date: {
        dateValue: "",
        time: ""
      }
    });
    navigation.navigate("WeekScreen");
  }

  const formIsInvalid =
    !inputs.title.titleIsValid ||
    !inputs.description.descriptionIsValid ||
    !inputs.definition.definitionIsValid;

  return (
    <View style={styles.container}>
      {showPicker && (
        <AddDateTime
          value={inputs.date.dateValue}
          display="spinner"
          mode="date"
          onDateChange={onDateChange}
        />
      )}
      {showTimer && (
        <AddDateTime
          value={inputs.date.dateValue}
          display="spinner"
          mode="time"
          onDateChange={onTimeChange}
        />
      )}
      <View style={styles.inputContainer}>
        <Input
          validation={!inputs.title.titleIsValid}
          placeholder="Title"
          label="Title"
          size={40}
          getValue={onChangeTitleHandler}
        />
        {showDescription && (
          <Input
            validation={!inputs.description.descriptionIsValid}
            placeholder="Description"
            size={100}
            multiline
            getValue={onChangeDescriptionHandler}
          />
        )}
        <View style={showDescription ? styles.selectContainer : null}>
          <SelectBox
            selectedValue={setSelectedValue}
            validation={!inputs.definition.definitionIsValid}
          />
        </View>
        <Input
          placeholder="DD-MM-YYYY"
          label="Date"
          size={40}
          value={addDate}
          shown={true}
          onPress={onDateChange}
        />
        {showDescription && (
          <Input
            placeholder="HH:MM"
            label="Time"
            size={40}
            value={inputs.date.time}
            time={true}
            onPress={onTimeChange}
          />
        )}
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data!
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <Button onPress={onCancel} style={styles.styleButton} mode="flat">
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
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 16
  }
});
