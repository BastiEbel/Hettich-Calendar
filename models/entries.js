export class Entries {
  constructor(title, description, date, id) {
    title = this.title;
    description = this.description;
    date = {
      startDate: this.date?.startDate,
      lastDate: this.date?.lastDate
    };
    id = this.id;
  }
}
