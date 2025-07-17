"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGA_SECOND_IN_MILLISECONDS = 1e9 * 1000;
class Gigasecond {
    constructor(startDate) {
        this.endDate = new Date(startDate.getTime() + GIGA_SECOND_IN_MILLISECONDS);
    }
    date() {
        return this.endDate;
    }
}
exports.default = Gigasecond;
