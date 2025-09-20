"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGA_SECOND_IN_MILLISECONDS = 1000000000000;
class Gigasecond {
    constructor(startDate) {
        this.endDate = new Date(startDate.valueOf() + GIGA_SECOND_IN_MILLISECONDS);
    }
    date() {
        return new Date(this.endDate.valueOf());
    }
}
exports.default = Gigasecond;
