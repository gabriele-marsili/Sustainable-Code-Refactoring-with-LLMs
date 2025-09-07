const GIGA_SECOND_IN_MILLISECONDS = 1e12;

export default class Gigasecond {
    constructor(private readonly startDate: Date) {}

    date(): Date {
        return new Date(this.startDate.getTime() + GIGA_SECOND_IN_MILLISECONDS);
    }
}