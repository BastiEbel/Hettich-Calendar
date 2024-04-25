import { useContext, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda, CalendarProvider } from "react-native-calendars";
import { fetchEntries } from "../util/database";
import { GlobalStyles } from "../constants/styles";
import ModalUI from "../ui/ModalUI";
import ModalCalendarEntry from "./ModalCalendarEntry";
import { CalendarContext } from "../store/calendar-context";

const INITIAL_DATE = new Date();
export default function WeekCalendar() {
  const [weeklyState, setWeeklyState] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { getCalendarValue } = useContext(CalendarContext);

  const loadItems = useCallback(async () => {
    const loadedEntries = await fetchEntries();
    setWeeklyState((prevWeeklyState) => {
      const items = prevWeeklyState.items || {};
      const newItems = { items };

      for (const newEntry of loadedEntries) {
        const strTime = newEntry.markedDates;

        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }
        newItems[strTime].push(newEntry);
      }

      return { ...prevWeeklyState, items: newItems };
    });
  }, []);

  const onToggleHandler = () => {
    setOpenModal((prevModal) => !prevModal);
  };

  const renderItem = useCallback((reservation, isFirst) => {
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

        {reservation.isDescriptionVisible == 1 && (
          <Text style={{ fontSize, color }}>{reservation.description}</Text>
        )}
      </TouchableOpacity>
    );
  }, []);

  const renderModal = useCallback(
    (reservation) => {
      onToggleHandler();
      return getCalendarValue(reservation);
    },
    [onToggleHandler, getCalendarValue]
  );

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
    <CalendarProvider date={INITIAL_DATE}>
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
