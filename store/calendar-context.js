import { createContext, useReducer, useState } from "react";
import { insertEntries } from "../util/database";

export const CalendarContext = createContext({
  entries: {},
  markedDates: {},
  multiDateSelected: false,
  addCalendarEntry: ({ data }) => {},
  getCalendarDate: ({ date, markedDates }) => {},
  getCalendarValue: (items) => {},
  updateCalendar: (id) => {},
  deleteCalendarEntry: (id) => {}
});

function calendarReducer(state, action) {
  switch (action.type) {
    case "SET":
      let date = action.payload;
      let combineDate = "";
      if (date.startDate === date.lastDate) {
        combineDate = date.startDate;
      } else {
        combineDate = `${date.startDate} - ${date.lastDate}`;
      }
      return combineDate;
    case "ADD":
      let inputData = action.payload;
      console.log(inputData);
      return insertEntries(inputData);
    default:
      return state;
  }
}

function CalendarContextProvider({ children }) {
  const [multiSelected, setMultiSelected] = useState(false);
  const [getMarkedDates, setGetMarkedDates] = useState();
  const [entriesState, dispatch] = useReducer(calendarReducer);

  function getCalendarDate(date) {
    dispatch({ type: "SET", payload: date });
    setGetMarkedDates({ ...getMarkedDates, date });
    if (date.startDate === date.lastDate) {
      setMultiSelected(false);
    } else {
      setMultiSelected(true);
    }
  }

  function addCalendarEntry(data) {
    dispatch({
      type: "ADD",
      payload: { data }
    });
  }

  const value = {
    entries: entriesState,
    markedDates: getMarkedDates,
    multiDateSelected: multiSelected,
    getCalendarDate: getCalendarDate,
    addCalendarEntry: addCalendarEntry
  };
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarContextProvider;
