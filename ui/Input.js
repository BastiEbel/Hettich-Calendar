import { TextInput, View, Text, StyleSheet } from "react-native";

export default function Input({ label, value, multiline, size, disabled }) {
  const inputStyles = {
    height: size,
    backgroundColor: "#fff",
    borderWidth: 1,
    width: 250,
    borderRadius: 8,
    borderColor: "#eee",
    paddingHorizontal: 16
  };

  if (multiline) {
    return (
      <View style={styles.container}>
        <TextInput style={inputStyles} multiline={multiline} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{label}:</Text>
      <TextInput style={inputStyles} value={value} editable={disabled} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 16
  },
  textLabel: {
    width: 250,
    justifyContent: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12
  }
});
