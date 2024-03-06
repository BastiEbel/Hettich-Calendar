import { View, Modal, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ModalUI({ openModal, children }) {
  return (
    <Modal visible={openModal} animationType="slide" transparent={true}>
      <View style={styles.container}>{children}</View>
    </Modal>
  );
}

export default ModalUI;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
