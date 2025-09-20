"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECOND_MS = 1000000000000;
class Gigasecond {
    constructor(moment) {
        this.futureTime = moment.getTime() + GIGASECOND_MS;
    }
    date() {
        return new Date(this.futureTime);
    }
}
exports.Gigasecond = Gigasecond;
