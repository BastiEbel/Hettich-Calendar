import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";

export default function Input({
  label,
  value,
  multiline,
  size,
  disabled,
  onPress
}) {
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
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.textLabel}>{label}:</Text>
      <TextInput style={inputStyles} value={value} editable={disabled} />
    </Pressable>
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
