"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(date) {
        this._timestamp = date.getTime() + 1000000000000;
    }
    date() {
        return new Date(this._timestamp);
    }
}
exports.Gigasecond = Gigasecond;
