import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../ui/Button";
import { CalendarContext } from "../store/calendar-context";

function ModalCalendarEntry({ onClose }) {
  const entriesCTX = useContext(CalendarContext);
  const [getItems, setGetItems] = useState(entriesCTX.entries);

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.textName}>
        Title:
        <Text style={styles.textOutput}> {getItems.title} </Text>
      </Text>
      {getItems.setDescriptionVisible === 1 && (
        <Text style={styles.textName}>
          Description:
          <Text style={styles.textOutput}>{getItems.description}</Text>
        </Text>
      )}
      <Text style={styles.textName}>
        Selected Option:
        <Text style={styles.textOutput}>{getItems.definition}</Text>
      </Text>
      <Text style={styles.textName}>
        Selected Date:
        <Text style={styles.textOutput}>{getItems.dateValue}</Text>
      </Text>
      {getItems.setDescriptionVisible === 1 && (
        <Text style={styles.textName}>
          Selected Time:
          <Text style={styles.textOutput}> {getItems.time}</Text>
        </Text>
      )}
      <View>
        <Button style={styles.styleButton} onPress={onClose}>
          Close
        </Button>
      </View>
    </View>
  );
}

export default ModalCalendarEntry;

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: "white",
    width: "90%",
    minHeight: 600,
    justifyContent: "center"
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 8
  },
  textOutput: {
    fontSize: 18,
    fontWeight: "normal",
    marginLeft: 16
  },
  styleButton: {
    marginVertical: 32,
    marginHorizontal: 16,
    minWidth: 80
  }
});
