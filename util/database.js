import * as SQLite from "expo-sqlite";
import { Entries } from "../models/entries";

const database = SQLite.openDatabase("entries.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        definition TEXT NOT NULL,
        markedDates TEXT NOT NULL,
        isDescriptionVisible BOOLEAN,
        dateValue TEXT NOT NULL,
        time TEXT NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function deleteTable() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE entries`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function deleteItem(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      if (id.length === 0) {
        tx.executeSql(
          `DELETE FROM entries WHERE id=?`,
          [id],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      } else {
        for (let id = 0; id < id.length; id++) {
          const idElement = id[id];
          tx.executeSql(
            `DELETE FROM entries WHERE id=?`,
            [idElement],
            () => {
              resolve();
            },
            (_, error) => {
              reject(error);
            }
          );
        }
      }
    });
  });
  return promise;
}

export function insertEntries(entries) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      for (let i = 0; i < entries.markedDates.length; i++) {
        const markedDate = entries.markedDates[i];
        tx.executeSql(
          `INSERT INTO entries (title, description, definition, markedDates, isDescriptionVisible, dateValue, time) VALUES (?,?,?,?,?,?,?)`,
          [
            entries.title,
            entries.description,
            entries.definition,
            markedDate,
            entries.isDescriptionVisible,
            entries.date.dateValue,
            entries.date.time
          ],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      }
    });
  });

  return promise;
}

export function fetchEntries() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM entries",
        [],
        (_, result) => {
          const entries = [];

          for (const dp of result.rows._array) {
            entries.push(dp);
          }
          resolve(entries);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchDetailEntries(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM entries WHERE id = ?",
        [id],
        (_, result) => {
          const dbEntries = result.rows._array[0];
          const entries = new Entries(
            dbEntries.title,
            dbEntries.description,
            dbEntries.definition,
            dbEntries.markedDate,
            dbEntries.isDescriptionVisible,
            dbEntries.date.dateValue,
            dbEntries.date.time,
            entries.id
          );
          resolve(entries);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
