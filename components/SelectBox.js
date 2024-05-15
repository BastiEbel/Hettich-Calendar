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

function SelectBox({ selectedValue, validation, getValue, disabled }) {
  const [selected, setSelected] = useState(getValue);
  const [changePlaceholder, setChangePlaceholder] = useState(getValue);
  const { multiDateSelected } = useContext(CalendarContext);

  useEffect(() => {
    if (multiDateSelected) {
      setChangePlaceholder("Vacation");
      setSelected(data[0].value);
    } else if (getValue === undefined) {
      setChangePlaceholder("Select Option");
    }
    selectedValue(selected);
  }, [multiDateSelected, selected]);

  const boxStyles = {
    width: 300,
    borderColor: validation
      ? GlobalStyles.colors.error500
      : GlobalStyles.colors.primary700,
    backgroundColor: validation ? GlobalStyles.colors.error50 : "white",
    marginTop: 32
  };

  const dropdownStyles = {
    width: "100%",
    backgroundColor: GlobalStyles.colors.primary100,
    justifyContent: "center",
    borderColor: GlobalStyles.colors.primary700,
    backgroundColor: "white"
  };

  const dropdownTextStyles = {
    color: GlobalStyles.colors.gray500,
    fontSize: 12
  };

  return (
    <View>
      <SelectList
        placeholder={changePlaceholder}
        value={selected}
        search={false}
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        boxStyles={boxStyles}
        dropdownStyles={disabled ? { display: "none" } : dropdownStyles}
        dropdownTextStyles={dropdownTextStyles}
      />
    </View>
  );
}

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 16
  },
  valid: {
    borderColor: GlobalStyles.colors.error500,
    backgroundColor: GlobalStyles.colors.error50
  }
});
