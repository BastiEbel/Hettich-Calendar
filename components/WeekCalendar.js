import { useContext, useState, useCallback, memo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import moment from "moment";

import { Agenda } from "react-native-calendars";
import { fetchEntries } from "../util/database";
import { GlobalStyles } from "../constants/styles";
import ModalUI from "../ui/ModalUI";
import ModalCalendarEntry from "./ModalCalendarEntry";
import { CalendarContext } from "../store/calendar-context";

const ProgramItem = memo(
  ({ reservation, renderModal }) => {
    return (
      <TouchableOpacity
        key={reservation.id}
        style={[styles.item, { height: "auto" }]}
        onPress={() => {
          renderModal(reservation);
        }}
      >
        <Text style={{ fontSize: 20, color: "black", marginBottom: 16 }}>
          {reservation.title}
        </Text>
        <Text style={{ fontSize: 10, color: "black", marginBottom: 8 }}>
          {reservation.dateValue}
        </Text>
        <Text style={{ fontSize: 10, color: "black" }}>
          {reservation.definition}
        </Text>

        {reservation.isDescriptionVisible == 1 && (
          <Text style={{ fontSize: 10, color: "black" }}>
            {reservation.description}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item === nextProps.item;
  }
);

function WeekCalendar() {
  const [weeklyState, setWeeklyState] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [entriesDbInitialized, setEntriesDbInitialized] = useState(false);
  const { getCalendarValue } = useContext(CalendarContext);

  useEffect(() => {
    fetchEntries()
      .then(() => {
        setEntriesDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
    loadItems();
  }, [fetchEntries, openModal]);

  const loadItems = async () => {
    const loadedEntries = await fetchEntries();
    const newItems = {};

    for (const newEntry of loadedEntries) {
      const strTime = newEntry.markedDates;

      if (!newItems[strTime]) {
        newItems[strTime] = [];
      }
      newItems[strTime].push(newEntry);
    }

    setWeeklyState((prevWeeklyState) => ({
      ...prevWeeklyState,
      items: newItems
    }));
  };

  const onToggleHandler = () => {
    setOpenModal((prevModal) => !prevModal);
  };

  const renderItem = useCallback((reservation) => {
    return <ProgramItem reservation={reservation} renderModal={renderModal} />;
  }, []);

  const renderModal = (reservation) => {
    onToggleHandler();
    return getCalendarValue(reservation);
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        {!entriesDbInitialized && (
          <ActivityIndicator
            size="large"
            color={GlobalStyles.colors.accent500}
          />
        )}
        <Text style={{ textAlign: "center" }}>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.markedDates !== r2.markedDates;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={weeklyState.items}
        loadItemsForMonth={loadItems}
        selected={moment().format("YYYY-MM-DD")}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        theme={{
          backgroundColor: GlobalStyles.colors.primary200,
          dayTextColor: "black"
        }}
      />
      <ModalUI openModal={openModal}>
        <ModalCalendarEntry onClose={onToggleHandler} />
      </ModalUI>
    </SafeAreaView>
  );
}
export default WeekCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
