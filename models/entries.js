export class Entries {
  constructor(
    title,
    description,
    definition,
    markedDates,
    date,
    isDescriptionVisible,
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
    isDescriptionVisible = this.isDescriptionVisible;
    id = this.id;
  }
}
