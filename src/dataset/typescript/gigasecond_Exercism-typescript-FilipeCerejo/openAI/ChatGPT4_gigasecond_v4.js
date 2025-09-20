"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(date) {
        this.gigasecondDate = new Date(date.getTime() + 1e12);
    }
    date() {
        return new Date(this.gigasecondDate);
    }
}
exports.Gigasecond = Gigasecond;
