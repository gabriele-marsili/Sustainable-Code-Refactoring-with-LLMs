"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(date) {
        this._date = new Date(date.getTime());
    }
    date() {
        return new Date(this._date.getTime() + Gigasecond.GIGASECOND_MS);
    }
}
exports.Gigasecond = Gigasecond;
Gigasecond.GIGASECOND_MS = 1000000000000;
