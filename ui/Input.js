import { TextInput, View, Text, StyleSheet } from "react-native";
import IconButton from "../ui/IconButton";
import { GlobalStyles } from "../constants/styles";

export default function Input({
  placeholder,
  label,
  value,
  multiline,
  size,
  shown,
  onPress
}) {
  const inputStyles = {
    justifyContent: "flex-start",
    height: size,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#eee",
    paddingHorizontal: 16
  };

  if (multiline) {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          style={inputStyles}
          multiline={multiline}
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
          style={[inputStyles, styles.input]}
          value={value}
        />
        {shown && (
          <View style={styles.icon}>
            <IconButton
              icon="calendar"
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
  }
});
