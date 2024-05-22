import { useContext, useState, useCallback, memo, PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Agenda } from "react-native-calendars";
import { fetchEntries } from "../util/database";
import { GlobalStyles } from "../constants/styles";
import ModalUI from "../ui/ModalUI";
import ModalCalendarEntry from "./ModalCalendarEntry";
import { CalendarContext } from "../store/calendar-context";

class ItemComponent extends PureComponent {
  render() {
    const { reservation, renderModal } = this.props;

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
  }
}

function WeekCalendar() {
  const [weeklyState, setWeeklyState] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { getCalendarValue } = useContext(CalendarContext);

  const loadItems = useCallback(async () => {
    const loadedEntries = await fetchEntries();
    setWeeklyState((prevWeeklyState) => {
      const items = prevWeeklyState.items || {};
      const newItems = {};

      for (const newEntry of loadedEntries) {
        const strTime = newEntry.markedDates;

        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }
        newItems[strTime].push(newEntry);
      }

      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      return { ...prevWeeklyState, items: newItems };
    });
  }, [fetchEntries]);

  const onToggleHandler = () => {
    return setOpenModal((prevModal) => !prevModal);
  };

  const renderItem = useCallback((reservation) => {
    return (
      <ItemComponent reservation={reservation} renderModal={renderModal} />
    );
  }, []);

  const renderModal = (reservation) => {
    onToggleHandler();
    return getCalendarValue(reservation);
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
    <SafeAreaView style={styles.container}>
      <Agenda
        items={weeklyState.items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        //rowHasChanged={rowHasChanged}
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
export default memo(WeekCalendar);

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
