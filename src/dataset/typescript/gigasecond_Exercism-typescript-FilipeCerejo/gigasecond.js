"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(date) {
        this._date = date;
    }
    date() {
        return new Date(this._date.getTime() + 1000000000000);
    }
}
exports.Gigasecond = Gigasecond;
