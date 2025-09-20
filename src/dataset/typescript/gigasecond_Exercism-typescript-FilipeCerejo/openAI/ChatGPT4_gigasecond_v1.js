"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(_date) {
        this._date = _date;
        this.gigasecondInMs = 1e12;
    }
    date() {
        return new Date(this._date.getTime() + this.gigasecondInMs);
    }
}
exports.Gigasecond = Gigasecond;
