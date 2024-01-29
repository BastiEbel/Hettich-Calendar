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
  const [selected, setSelected] = useState(data[0].value);
  const [changePlaceholder, setChangePlaceholder] = useState("");
  const entriesCTX = useContext(CalendarContext);
  selectedValue(selected);

  useEffect(() => {
    if (entriesCTX.multiDateSelected) {
      setChangePlaceholder(selected);
    } else {
      setChangePlaceholder("Select Option");
    }
  }, [entriesCTX.multiDateSelected]);

  return (
    <View style={styles.container}>
      <SelectList
        placeholder={changePlaceholder}
        search={false}
        onSelect={(val) => setSelected(val)}
        setSelected={selected}
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
