const GIGA_SECOND_IN_MILLISECONDS = 1e9 * 1000

export default class Gigasecond {
    private readonly endDate: Date

    constructor(startDate: Date) {
        this.endDate = new Date(startDate.getTime() + GIGA_SECOND_IN_MILLISECONDS)
    }

    date() {
        return this.endDate
    }
}