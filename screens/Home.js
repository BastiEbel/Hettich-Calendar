import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import CalendarComponent from "../components/CalendarComponent";
import { GlobalStyles } from "../constants/styles";
import CheckBoxUI from "../ui/CheckBoxUI";
import { CalendarContext } from "../store/calendar-context";

export default function Home() {
  const [single, setSingle] = useState(true);
  const [multi, setMulti] = useState(false);
  const { multiDateSelected } = useContext(CalendarContext);

  useEffect(() => {
    if (!multiDateSelected) {
      setSingle(true);
      setMulti(false);
    }
  }, [multiDateSelected]);

  return (
    <View style={styles.container}>
      <View style={styles.checkBoxContainer}>
        <CheckBoxUI
          checked={multi}
          onPress={!multi ? () => [setMulti(true), setSingle(false)] : null}
        >
          Select more days
        </CheckBoxUI>
        <CheckBoxUI
          checked={single}
          onPress={!single ? () => [setSingle(true), setMulti(false)] : null}
        >
          Select one day
        </CheckBoxUI>
      </View>
      <CalendarComponent singleChecked={single} multiChecked={multi} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    justifyContent: "center",
    alignItems: "center"
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
