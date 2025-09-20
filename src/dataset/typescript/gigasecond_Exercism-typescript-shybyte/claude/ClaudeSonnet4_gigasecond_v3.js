"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGA_SECOND_IN_MILLISECONDS = 1000000000000;
class Gigasecond {
    constructor(startDate) {
        this.endTime = startDate.getTime() + GIGA_SECOND_IN_MILLISECONDS;
    }
    date() {
        return new Date(this.endTime);
    }
}
exports.default = Gigasecond;
