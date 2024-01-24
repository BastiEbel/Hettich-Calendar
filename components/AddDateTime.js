import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

//import Button from "../ui/Button";

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
