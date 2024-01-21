import { createContext, useState } from "react";
import { Entries } from "../models/entries";

export const CalendarContext = createContext({
  entries: {},
  addCalendarEntry: ({ title, date, description }) => {},
  getCalendarDate: ({ date }) => {},
  getCalendarValue: (items) => {},
  updateCalendar: (id) => {},
  deleteCalendarEntry: (id) => {}
});

function CalendarContextProvider({ children }) {
  const [dateEntries, setDateEntries] = useState([]);

  function getCalendarDate(date) {
    let combineDate = `${date.startDate} - ${date.lastDate}`;
    setDateEntries(combineDate);
  }

  const value = { entries: dateEntries, getCalendarDate: getCalendarDate };
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarContextProvider;
