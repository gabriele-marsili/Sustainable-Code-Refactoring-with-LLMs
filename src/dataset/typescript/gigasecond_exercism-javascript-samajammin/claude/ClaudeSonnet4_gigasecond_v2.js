"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.gigasecondMs = 1000000000000; // Pre-calculated 10^12
        this.futureTime = initDate.getTime() + this.gigasecondMs;
    }
    date() {
        return new Date(this.futureTime);
    }
}
exports.default = Gigasecond;
