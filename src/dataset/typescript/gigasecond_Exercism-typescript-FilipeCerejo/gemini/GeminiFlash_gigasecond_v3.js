"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(date) {
        this._dateMs = date.getTime();
    }
    date() {
        return new Date(this._dateMs + 1000000000000);
    }
}
exports.Gigasecond = Gigasecond;
