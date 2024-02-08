import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GlobalStyles } from "../constants/styles";

const AddDateTime = ({ value, display, mode, onDateChange }) => {
  return (
    <View>
      <DateTimePicker
        themeVariant="dark"
        value={value}
        display={display}
        mode={mode}
        onChange={onDateChange}
        positiveButton={{
          label: "Ok",
          textColor: GlobalStyles.colors.primary400
        }}
        negativeButton={{
          label: "Chancel",
          textColor: GlobalStyles.colors.gray500
        }}
      />
    </View>
  );
};

export default AddDateTime;
