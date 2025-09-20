"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.initDate = initDate;
        this.gigasecondInMs = 1e12;
    }
    date() {
        return new Date(this.initDate.getTime() + this.gigasecondInMs);
    }
}
exports.default = Gigasecond;
