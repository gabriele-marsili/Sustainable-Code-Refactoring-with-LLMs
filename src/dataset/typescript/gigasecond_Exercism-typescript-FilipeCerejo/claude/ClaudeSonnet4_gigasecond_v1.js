"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(date) {
        this._gigasecondTime = date.getTime() + 1000000000000;
    }
    date() {
        return new Date(this._gigasecondTime);
    }
}
exports.Gigasecond = Gigasecond;
