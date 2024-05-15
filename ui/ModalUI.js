import { StyleSheet } from "react-native";
import Modal from "react-native-modal";

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
    backgroundColor: "transparent",
    flex: 1,
    margin: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});
