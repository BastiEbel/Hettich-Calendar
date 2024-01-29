import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddDateTime = ({ value, display, mode, onChange }) => {
  return (
    <View>
      <DateTimePicker
        value={value}
        display={display}
        mode={mode}
        onChange={onChange}
      />
    </View>
  );
};

export default AddDateTime;
