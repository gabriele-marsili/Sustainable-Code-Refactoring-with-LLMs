"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.gigasecondTimestamp = initDate.getTime() + 1000000000000;
    }
    date() {
        return new Date(this.gigasecondTimestamp);
    }
}
exports.default = Gigasecond;
