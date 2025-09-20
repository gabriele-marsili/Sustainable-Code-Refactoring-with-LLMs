"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(startDate) {
        this.endDate = new Date(startDate.getTime() + Gigasecond.GIGA_SECOND_IN_MILLISECONDS);
    }
    date() {
        return this.endDate;
    }
}
Gigasecond.GIGA_SECOND_IN_MILLISECONDS = 1e9 * 1000;
exports.default = Gigasecond;
