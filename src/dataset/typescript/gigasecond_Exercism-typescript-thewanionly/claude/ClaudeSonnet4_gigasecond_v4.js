"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECOND_MS = 1000000000000;
class Gigasecond {
    constructor(moment) {
        this.milliseconds = moment.getTime();
    }
    date() {
        return new Date(this.milliseconds + GIGASECOND_MS);
    }
}
exports.Gigasecond = Gigasecond;
