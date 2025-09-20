"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECONDS_MILLISECONDS = 1000000000000;
class Gigasecond {
    constructor(initialDate) {
        this.initialDate = initialDate;
        this.targetTime = this.initialDate.getTime() + GIGASECONDS_MILLISECONDS;
    }
    date() {
        return new Date(this.targetTime);
    }
}
exports.Gigasecond = Gigasecond;
