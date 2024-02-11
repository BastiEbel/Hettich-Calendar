import { createContext, useReducer, useState } from "react";

export const CalendarContext = createContext({
  entries: {},
  multiDateSelected: false,
  addCalendarEntry: ({ title, date, description, definition }) => {},
  getCalendarDate: ({ date }) => {},
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
    default:
      return state;
  }
}

function CalendarContextProvider({ children }) {
  const [multiSelected, setMultiSelected] = useState(false);
  const [entriesState, dispatch] = useReducer(calendarReducer);

  function getCalendarDate(date) {
    dispatch({ type: "SET", payload: date });
  }

  const value = {
    entries: entriesState,
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
