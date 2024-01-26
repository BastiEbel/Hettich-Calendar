import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function SelectBox() {
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Vacation" },
    { key: "2", value: "Task" },
    { key: "3", value: "Reminder" },
    { key: "4", value: "Date" }
  ];

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        boxStyles={{
          width: 300,
          borderColor: GlobalStyles.colors.primary700,
          backgroundColor: "white"
        }}
        dropdownStyles={{
          width: "100%",
          backgroundColor: GlobalStyles.colors.primary100,
          justifyContent: "center",
          borderColor: GlobalStyles.colors.primary700,
          backgroundColor: "white"
        }}
        dropdownTextStyles={{
          color: GlobalStyles.colors.gray500,
          fontSize: 12
        }}
      />
    </View>
  );
}

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 32
  }
});
