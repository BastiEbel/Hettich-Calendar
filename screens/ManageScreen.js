import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import FormManagement from "../components/FormManagement";
import { useContext } from "react";
import { CalendarContext } from "../store/calendar-context";

export default function ManageScreen({ navigation }) {
  const { clearSelectedDates } = useContext(CalendarContext);
  function cancelActionHandler() {
    clearSelectedDates();
    navigation.goBack();
  }

  function onSubmitHandler() {
    navigation.navigate("WeekScreen");
  }

  return (
    <View style={styles.container}>
      <FormManagement
        onCancel={cancelActionHandler}
        onSubmit={onSubmitHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary100
  }
});
