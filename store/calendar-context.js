import { createContext, useReducer, useState } from "react";

export const CalendarContext = createContext({
  entries: "",
  markedDates: {},
  multiDateSelected: false,
  getCalendarDate: ({ date, markedDates }) => {},
  clearSelectedDates: () => {},
  getCalendarValue: (items) => {},
  updateCalendar: (id) => {},
  deleteCalendarEntry: (id) => {}
});

function calendarReducer(state, action) {
  switch (action.type) {
    case "SETDATE":
      let date = action.payload;
      let combineDate = "";
      if (date.startDate === date.lastDate) {
        combineDate = date.startDate;
      } else {
        combineDate = `${date.startDate} - ${date.lastDate}`;
      }
      return combineDate;
    case "GET":
      let selectedValue = action.payload;
      return selectedValue;
    default:
      return state;
  }
}

function CalendarContextProvider({ children }) {
  const [multiSelected, setMultiSelected] = useState(false);
  const [getMarkedDates, setGetMarkedDates] = useState();
  const [entriesState, dispatch] = useReducer(calendarReducer);
  //const [entriesState, setEntriesState] = useState();

  function getCalendarDate(date) {
    dispatch({ type: "SETDATE", payload: date });
    // let combineDate = "";
    setGetMarkedDates({ ...getMarkedDates, date });
    if (date.startDate === date.lastDate) {
      //combineDate = date.startDate;
      setMultiSelected(false);
    } else {
      //combineDate = `${date.startDate} - ${date.lastDate}`;
      setMultiSelected(true);
    }
    //setEntriesState(combineDate);
  }

  function clearSelectedDates() {
    setMultiSelected(false);
  }

  function getCalendarValue(reservation) {
    dispatch({ type: "GET", payload: reservation });
  }

  const value = {
    entries: entriesState,
    markedDates: getMarkedDates,
    multiDateSelected: multiSelected,
    getCalendarDate: getCalendarDate,
    clearSelectedDates: clearSelectedDates,
    getCalendarValue: getCalendarValue
  };
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarContextProvider;
