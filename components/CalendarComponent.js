import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { CalendarContext } from "../store/calendar-context";
import { Entries } from "../models/entries";

const INITIAL_DATE = Date();
export default function CalendarComponent() {
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
        textColor: "#FFFFFF"
      };
      setMarkedState({
        ...markedState,
        markedDates: markedDates,
        isStartDatePicked: true,
        startDate: day.dateString,
        markedType: "period"
      });
    } else {
      let markedDates = markedState.markedDates;
      let startDate = moment(markedState.startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDate, "days");
      let lastSelectedDate = "";
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDate.add(1, "day");
          tempDate = moment(tempDate).format("DD-MM-YYYY");
          if (i < range) {
            markedDates[tempDate] = { color: "#afdcfc", textColor: "#FFFFFF" };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: "#afdcfc",
              textColor: "#FFFFFF"
            };
            lastSelectedDate = tempDate;
            entries.date = {
              startDate: moment(markedState.startDate).format("DD-MM-YYYY"),
              lastDate: tempDate
            };
          }
        }
        setMarkedState({
          ...markedState,
          markedDates: markedDates,
          isStartDatePicked: true,
          lastDate: lastSelectedDate
        });
        navigation.navigate("ManageScreen");
        entriesCTX.getCalendarDate(entries.date);
      } else if (day.dateString === day.dateString) {
        setMarkedState({
          ...markedState,
          markedDates: markedDates,
          isStartDatePicked: true,
          isEndDatePicked: true,
          startDate: day.dateString,
          markedType: ""
        });
        entries.date = {
          startDate: moment(markedState.startDate).format("DD-MM-YYYY"),
          lastDate: moment(markedState.startDate).format("DD-MM-YYYY")
        };
        navigation.navigate("ManageScreen");
        entriesCTX.getCalendarDate(entries.date);
      } else {
        alert("Select an upcomming date!");
      }
      resetMarketDates();
    }
  };

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
