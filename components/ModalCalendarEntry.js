import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../ui/Button";
function ModalCalendarEntry({ reservation, onClose }) {
  return (
    <View style={styles.bodyContainer}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 16 }}>
        Title:<Text style={styles.textOutput}> {reservation.title}</Text>
      </Text>
      {reservation.setDescriptionVisible === 1 && (
        <Text
          style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 16 }}
        >
          Description:
          <Text style={styles.textOutput}>{reservation.description}</Text>
        </Text>
      )}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 16 }}>
        Selected Option:
        <Text style={styles.textOutput}>{reservation.definition}</Text>
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 16 }}>
        Selected Date:
        <Text style={styles.textOutput}>{reservation.dateValue}</Text>
      </Text>
      {reservation.setDescriptionVisible === 1 && (
        <Text
          style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 16 }}
        >
          Selected Time:
          <Text style={styles.textOutput}>{reservation.time}</Text>
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
    justifyContent: "space-evenly"
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
