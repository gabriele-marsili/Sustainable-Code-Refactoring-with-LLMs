"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(date) {
        this._date = new Date(date.getTime());
    }
    date() {
        const gigasecondInMs = 1000000000000;
        return new Date(this._date.getTime() + gigasecondInMs);
    }
}
exports.Gigasecond = Gigasecond;
