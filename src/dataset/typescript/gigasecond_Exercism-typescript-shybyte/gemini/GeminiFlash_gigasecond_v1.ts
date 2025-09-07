const GIGA_SECOND_IN_MILLISECONDS = 1e12;

export default class Gigasecond {
    private readonly endDate: Date;

    constructor(startDate: Date) {
        this.endDate = new Date(startDate.valueOf() + GIGA_SECOND_IN_MILLISECONDS);
    }

    date(): Date {
        return new Date(this.endDate.valueOf());
    }
}