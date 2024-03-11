import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { GlobalStyles } from "../constants/styles";

function ModalUI({ openModal, children }) {
  return (
    <Modal
      style={styles.container}
      isVisible={openModal}
      animationIn="slideInUp"
      transparent={true}
      useNativeDriver={true}
      animationInTiming={250}
      animationOutTiming={250}
    >
      {children}
    </Modal>
  );
}

export default ModalUI;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    flex: 1,
    margin: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});
