import { View, Button } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

//import Button from "../ui/Button";

const AddDateTime = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View>
      <DateTimePicker value={date} display="spinner" mode="date" />
    </View>
  );
};

export default AddDateTime;
