import { useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { GlobalStyles } from "../constants/styles";

function CheckBoxUI({ children, checked, onPress }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[
          styles.checkBoxWrapper,
          ({ pressed }) => pressed && styles.pressed
        ]}
      >
        <Text style={styles.checkBoxText}>{children}</Text>
        <Checkbox
          style={{
            width: 15,
            height: 15,
            backgroundColor: "white",
            borderColor: GlobalStyles.colors.primary200,
            borderRadius: 4
          }}
          disabled={false}
          value={checked}
          onValueChange={checked}
        />
      </Pressable>
    </View>
  );
}

export default CheckBoxUI;

const styles = StyleSheet.create({
  checkBoxWrapper: {
    minWidth: 130,
    borderColor: GlobalStyles.colors.primary200,
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 8,
    borderWidth: 2,
    padding: 8,
    marginHorizontal: 8,
    marginBottom: 96,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row-reverse",
    elevation: 3
  },
  checkBoxText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 8,
    color: "white"
  },
  pressed: {
    backgroundColor: GlobalStyles.colors.primary200,
    opacity: 0.75
  }
});
