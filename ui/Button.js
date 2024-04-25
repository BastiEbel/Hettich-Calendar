import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Button({ children, onPress, mode, style, disabled }) {
  return (
    <View style={style}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            disabled ? styles.disabledButton : ""
          ]}
        >
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 6,
    backgroundColor: GlobalStyles.colors.primary500
  },
  flat: {
    backgroundColor: "transparent",
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  flatText: {
    color: GlobalStyles.colors.gray700
  },
  disabledButton: {
    backgroundColor: GlobalStyles.colors.gray100
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary200,
    borderRadius: 4
  }
});
