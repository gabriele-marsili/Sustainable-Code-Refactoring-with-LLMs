"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.gigasecondInMs = 1e12;
        this.resultDate = new Date(initDate.getTime() + this.gigasecondInMs);
    }
    date() {
        return this.resultDate;
    }
}
exports.default = Gigasecond;
