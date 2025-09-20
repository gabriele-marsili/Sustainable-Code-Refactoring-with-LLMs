"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGA_SECOND_IN_MILLISECONDS = 1e12;
class Gigasecond {
    constructor(startDate) {
        this.startDate = startDate;
    }
    date() {
        return new Date(this.startDate.getTime() + GIGA_SECOND_IN_MILLISECONDS);
    }
}
exports.default = Gigasecond;
