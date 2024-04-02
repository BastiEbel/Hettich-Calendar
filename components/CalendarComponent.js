import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { CalendarContext } from "../store/calendar-context";
import { Entries } from "../models/entries";
import ErrorOverlay from "../ui/ErrorOverlay";

const INITIAL_DATE = Date();
export default function CalendarComponent({ singleChecked, multiChecked }) {
  const entriesCTX = useContext(CalendarContext);
  const entries = new Entries();
  const [markedState, setMarkedState] = useState({
    markedDates: {},
    isStartDatePicked: false,
    isEndDatePicked: false,
    startDate: "",
    lastDate: "",
    markedType: ""
  });

  const navigation = useNavigation();

  const onDayPress = (day) => {
    if (!markedState.isStartDatePicked) {
      let markedDates = {};

      markedDates[day.dateString] = {
        startingDay: true,
        color: "#afdcfc",
        textColor: "#FFFFFF",
        selected: true,
        selectedColor: "#afdcfc"
      };
      setMarkedState({
        ...markedState,
        markedDates: markedDates,
        isStartDatePicked: true,
        startDate: day.dateString,
        markedType: ""
      });
      if (singleChecked) {
        addOneDayHandler(markedDates, day.dateString);
      }
    } else if (multiChecked) {
      const markedDates = markedState.markedDates;
      const markedTempDate = [];
      const startDate = moment(markedState.startDate);
      const endDate = moment(day.dateString);
      const range = endDate.diff(startDate, "days");
      let lastSelectedDate = "";
      markedTempDate.push(startDate.format("YYYY-MM-DD"));
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDate.add(1, "day");
          tempDate = moment(tempDate).format("YYYY-MM-DD");
          markedTempDate.push(tempDate);
          if (i < range) {
            markedDates[tempDate] = {
              color: "#afdcfc",
              textColor: "#FFFFFF",
              selected: true,
              selectedColor: "#afdcfc"
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: "#afdcfc",
              textColor: "#FFFFFF",
              selected: true,
              selectedColor: "#afdcfc"
            };
            lastSelectedDate = tempDate;
            entries.date = {
              markedDates: markedTempDate,
              startDate: moment(markedState.startDate).format("DD-MM-YYYY"),
              lastDate: moment(lastSelectedDate).format("DD-MM-YYYY")
            };
          }
        }
        setMarkedState({
          ...markedState,
          markedDates: markedDates,
          isEndDatePicked: true,
          lastDate: lastSelectedDate,
          markedType: "period"
        });
        switchToNextScreen();
      } else {
        alert("Select an upcomming date!");
      }
    }
  };

  function addOneDayHandler(markedDates, day) {
    setMarkedState({
      ...markedState,
      markedDates: markedDates,
      isStartDatePicked: true,
      isEndDatePicked: true,
      startDate: day.dateString,
      markedType: ""
    });
    entries.date = {
      markedDates: [moment(day).format("YYYY-MM-DD")],
      startDate: moment(day).format("DD-MM-YYYY"),
      lastDate: moment(day).format("DD-MM-YYYY")
    };
    switchToNextScreen();
  }

  function switchToNextScreen() {
    setTimeout(() => {
      navigation.navigate("ManageScreen");
      entriesCTX.getCalendarDate(entries.date);
      resetMarketDates();
    }, 100);
  }

  const resetMarketDates = () => {
    setMarkedState({
      markedDates: {},
      isStartDatePicked: false,
      isEndDatePicked: false,
      startDate: "",
      lastDate: "",
      markedType: ""
    });
  };

  return (
    <View>
      <Calendar
        current={INITIAL_DATE}
        onDayPress={onDayPress}
        hideExtraDays
        showWeekNumbers
        markingType={markedState.markedType}
        markedDates={markedState.markedDates}
        maxData={"2050-01-01"}
        firstDay={1}
        style={styles.calendar}
        theme={{
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 24,
    borderColor: "gray",
    elevation: 2
  }
});
