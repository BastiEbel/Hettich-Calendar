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
        date TEXT NOT NULL,
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

export function insertPlace(entries) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, description, startDate, lastDate), VALUES (?,?,?,?,?)`,
        [
          entries.title,
          entries.description,
          entries.date.startDate,
          entries.date.lastDate
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
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
            entries.push(
              new Entries(
                dp.title,
                dp.description,
                {
                  startDate: dp.startDate,
                  lastDate: dp.lastDate
                },
                dp.id
              )
            );
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

export function fetchDetailPlace(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM entries WHERE id = ?",
        [id],
        (_, result) => {
          const dbEntries = result.rows._array[0];
          const entries = new Entries(
            dbEntries.title,
            dbEntries.imageUri,
            {
              startDate: dbEntries.startDate,
              lastDate: dbEntries.lastDate
            },
            dbPLace.id
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
