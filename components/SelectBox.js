import { SelectList } from "react-native-dropdown-select-list";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { CalendarContext } from "../store/calendar-context";

const data = [
  { key: "0", value: "Vacation" },
  { key: "1", value: "Task" },
  { key: "2", value: "Reminder" },
  { key: "3", value: "Date" }
];

function SelectBox({ selectedValue }) {
  const [selected, setSelected] = useState("");
  const [changePlaceholder, setChangePlaceholder] = useState("");
  const entriesCTX = useContext(CalendarContext);

  useEffect(() => {
    if (entriesCTX.multiDateSelected) {
      setChangePlaceholder("Vacation");
    } else {
      setChangePlaceholder("Select Option");
    }
    selectedValue(selected);
  }, [entriesCTX.multiDateSelected, selected]);

  return (
    <View>
      <SelectList
        placeholder={changePlaceholder}
        search={false}
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        boxStyles={{
          width: 300,
          borderColor: GlobalStyles.colors.primary700,
          backgroundColor: "white",
          marginTop: 32
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
    marginTop: 16
  }
});
