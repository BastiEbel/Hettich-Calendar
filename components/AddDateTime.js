import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddDateTime = ({ value, display, mode, onDateChange }) => {
  return (
    <View>
      <DateTimePicker
        value={value}
        display={display}
        mode={mode}
        onChange={onDateChange}
      />
    </View>
  );
};

export default AddDateTime;
