import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import FormManagement from "../components/FormManagement";

export default function ManageScreen({ navigation }) {
  function cancelActionHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <FormManagement onCancel={cancelActionHandler} />
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
