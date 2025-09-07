const GIGA_SECOND_IN_MILLISECONDS = 1000000000000

export default class Gigasecond {
    private readonly endTime: number

    constructor(startDate: Date) {
        this.endTime = startDate.getTime() + GIGA_SECOND_IN_MILLISECONDS
    }

    date(): Date {
        return new Date(this.endTime)
    }
}