"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(_date) {
        this._date = _date;
    }
    date() {
        return new Date(this._date.valueOf() + 1e12);
    }
}
exports.Gigasecond = Gigasecond;
