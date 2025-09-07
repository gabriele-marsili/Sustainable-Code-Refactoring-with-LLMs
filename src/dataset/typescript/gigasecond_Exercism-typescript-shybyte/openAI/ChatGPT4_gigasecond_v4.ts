const GIGA_SECOND_IN_MILLISECONDS = 1_000_000_000_000;

export default class Gigasecond {
    constructor(private readonly startDate: Date) {}

    date(): Date {
        return new Date(this.startDate.getTime() + GIGA_SECOND_IN_MILLISECONDS);
    }
}