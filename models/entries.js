export class Entries {
  constructor(
    title,
    description,
    definition,
    markedDates,
    date,
    setDescriptionVisible,
    id
  ) {
    title = this.title;
    description = this?.description;
    definition = this.definition;
    markedDates = this.markedDates;
    date = {
      dateValue: this.date?.dateValue,
      startDate: this.date?.startDate,
      lastDate: this.date?.lastDate,
      time: this.date?.time
    };
    setDescriptionVisible = this.setDescriptionVisible;
    id = this.id;
  }
}
