import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { fetchEntries } from "../util/database";
import { GlobalStyles } from "../constants/styles";
import ModalUI from "../ui/ModalUI";
import ModalCalendarEntry from "./ModalCalendarEntry";

export default function WeekCalendar() {
  const [weeklyState, setWeeklyState] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [showData, setShowData] = useState();
  /* 
  useEffect(() => {
    renderItem;
  }, [weeklyState]); */

  async function loadItems() {
    const loadedEntries = await fetchEntries();
    const items = weeklyState.items || {};
    setTimeout(() => {
      for (let i = 0; i < loadedEntries.length; i++) {
        const newEntry = loadedEntries[i];
        const strTime = newEntry.markedDates;

        if (!items[strTime]) {
          items[strTime] = [];

          items[strTime].push({
            title: newEntry.title,
            description: newEntry.description,
            definition: newEntry.definition,
            time: newEntry.time,
            dateValue: newEntry.dateValue,
            markedDates: newEntry.markedDates
          });
        }
      }

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setWeeklyState({
        items: newItems
      });
    }, 500);
  }

  /* const renderDay = (day) => {
    if (day) {
      return <Text style={styles.customDay}>{day.getDay()}</Text>;
    }
    return <View style={styles.dayItem} />;
  }; */
  const onToggleHandler = () => {
    setOpenModal(!openModal);
  };

  const renderModal = (reservation) => {
    setShowData(reservation);
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
    return r1.name !== r2.name;
  };
  return (
    <>
      <Agenda
        items={weeklyState.items}
        loadItemsForMonth={loadItems}
        selected={Date()}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        reservationsKeyExtractor={(index) => index.id}
        //rowHasChanged={rowHasChanged}
        //showClosingKnob={true}
        theme={{
          backgroundColor: GlobalStyles.colors.primary200,
          dayTextColor: "black"
        }}
      />
      <ModalUI openModal={openModal}>
        <ModalCalendarEntry reservation={showData} onClose={onToggleHandler} />
      </ModalUI>
    </>
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
