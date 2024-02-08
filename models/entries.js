export class Entries {
  constructor(title, description, definition, date, id) {
    title = this.title;
    description = this?.description;
    definition = this.definition;
    date = {
      startDate: this.date?.startDate,
      lastDate: this.date?.lastDate,
      time: this.date?.time
    };
    id = this.id;
  }
}
