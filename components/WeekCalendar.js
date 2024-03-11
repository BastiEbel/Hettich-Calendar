import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda, CalendarProvider } from "react-native-calendars";
import { fetchEntries, init } from "../util/database";
import { GlobalStyles } from "../constants/styles";
import ModalUI from "../ui/ModalUI";
import ModalCalendarEntry from "./ModalCalendarEntry";
import { CalendarContext } from "../store/calendar-context";

const INITIAL_DATE = new Date();
export default function WeekCalendar() {
  const [weeklyState, setWeeklyState] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const entriesCTX = useContext(CalendarContext);

  /*  useEffect(() => {
    init();
    loadItems();
  }, [loadItems]); */

  async function loadItems() {
    const loadedEntries = await fetchEntries();
    const items = weeklyState.items || {};
    setTimeout(() => {
      for (const newEntry of loadedEntries) {
        const strTime = newEntry.markedDates;

        if (!items[strTime]) {
          items[strTime] = [];

          items[strTime].push({
            title: newEntry.title,
            description: newEntry.description,
            definition: newEntry.definition,
            time: newEntry.time,
            dateValue: newEntry.dateValue,
            markedDates: newEntry.markedDates,
            id: newEntry.id,
            setDescriptionVisible: newEntry.setDescriptionVisible
          });
        }
      }

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setWeeklyState({ ...weeklyState, items: newItems });
    }, 100);
  }

  const onToggleHandler = () => {
    setOpenModal((prevModal) => !prevModal);
  };

  const renderModal = (reservation) => {
    entriesCTX.getCalendarValue(reservation);
    onToggleHandler();
  };

  const renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 12 : 10;
    const color = isFirst ? "black" : "#43515c";

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => renderModal(reservation)}
      >
        <Text style={{ fontSize: 20, color, marginBottom: 16 }}>
          {reservation.title}
        </Text>
        <Text style={{ fontSize, color, marginBottom: 8 }}>
          {reservation.dateValue}
        </Text>
        <Text style={{ fontSize, color }}>{reservation.definition}</Text>

        {reservation.setDescriptionVisible == 1 && (
          <Text style={{ fontSize, color }}>{reservation.description}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={{ textAlign: "center" }}>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.markedDates !== r2.markedDates;
  };
  return (
    <CalendarProvider date={Date()}>
      <Agenda
        items={weeklyState.items}
        loadItemsForMonth={loadItems}
        selected={INITIAL_DATE}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        pastScrollRange={(new Date().getFullYear() - 1900) * 12}
        futureScrollRange={(2099 - new Date().getFullYear()) * 12}
        theme={{
          backgroundColor: GlobalStyles.colors.primary200,
          dayTextColor: "black"
        }}
      />
      <ModalUI openModal={openModal}>
        <ModalCalendarEntry onClose={onToggleHandler} />
      </ModalUI>
    </CalendarProvider>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    elevation: 2,
    padding: 10,
    marginRight: 10,
    marginTop: 32
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 18,
    color: "green"
  },
  dayItem: {
    marginLeft: 34
  }
});
