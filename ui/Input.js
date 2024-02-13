import { TextInput, View, Text, StyleSheet } from "react-native";
import IconButton from "../ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { CalendarContext } from "../store/calendar-context";

export default function Input({
  placeholder,
  label,
  value,
  multiline,
  size,
  shown,
  time,
  onPress,
  getValue,
  validation
}) {
  const entriesCTX = useContext(CalendarContext);
  const inputStyles = {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: size,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#eee",
    paddingHorizontal: 16
  };

  function onChangeHandler(text) {
    getValue(text);
  }

  if (multiline) {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          style={[
            inputStyles,
            { textAlignVertical: "top", paddingTop: 12 },
            validation ? styles.valid : ""
          ]}
          multiline={multiline}
          onChangeText={onChangeHandler}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{label}:</Text>
      <View style={styles.dateContainer}>
        <TextInput
          placeholder={placeholder}
          style={[inputStyles, styles.input, validation && styles.valid]}
          value={value}
          onChangeText={onChangeHandler}
        />
        {shown && !entriesCTX.multiDateSelected && (
          <View style={styles.icon}>
            <IconButton
              icon="calendar"
              color="white"
              size={24}
              onPress={onPress}
            />
          </View>
        )}
        {time && (
          <View style={styles.icon}>
            <IconButton
              icon="alarm-outline"
              color="white"
              size={24}
              onPress={onPress}
            />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    marginVertical: 24
  },
  textLabel: {
    justifyContent: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  icon: {
    width: 60,
    height: 40,
    backgroundColor: GlobalStyles.colors.primary400,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 2,
    borderRadius: 10
  },
  input: {
    flex: 1
  },
  valid: {
    borderColor: GlobalStyles.colors.error500,
    backgroundColor: GlobalStyles.colors.error50
  }
});
