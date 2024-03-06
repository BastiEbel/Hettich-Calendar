import { createContext, useReducer, useState } from "react";

export const CalendarContext = createContext({
  entries: "",
  markedDates: {},
  multiDateSelected: false,
  getCalendarDate: ({ date, markedDates }) => {},
  getCalendarValue: (items) => {},
  updateCalendar: (id) => {},
  deleteCalendarEntry: (id) => {}
});

async function calendarReducer(state, action) {
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
    default:
      return state;
  }
}

function CalendarContextProvider({ children }) {
  const [multiSelected, setMultiSelected] = useState(false);
  const [getMarkedDates, setGetMarkedDates] = useState();
  //const [entriesState, dispatch] = useReducer(calendarReducer);
  const [entriesState, setEntriesState] = useState();

  function getCalendarDate(date) {
    //dispatch({ type: "SET", payload: date });
    let combineDate = "";
    setGetMarkedDates({ ...getMarkedDates, date });
    if (date.startDate === date.lastDate) {
      combineDate = date.startDate;
      setMultiSelected(false);
    } else {
      combineDate = `${date.startDate} - ${date.lastDate}`;
      setMultiSelected(true);
    }
    setEntriesState(combineDate);
  }

  const value = {
    entries: entriesState,
    markedDates: getMarkedDates,
    multiDateSelected: multiSelected,
    getCalendarDate: getCalendarDate
  };
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarContextProvider;
