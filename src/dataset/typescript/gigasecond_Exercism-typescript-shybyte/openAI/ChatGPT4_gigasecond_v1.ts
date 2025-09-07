export default class Gigasecond {
    private static readonly GIGA_SECOND_IN_MILLISECONDS = 1e9 * 1000;
    private readonly endDate: Date;

    constructor(startDate: Date) {
        this.endDate = new Date(startDate.getTime() + Gigasecond.GIGA_SECOND_IN_MILLISECONDS);
    }

    date(): Date {
        return this.endDate;
    }
}