"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECONDS_MILLISECONDS = 1000000000000;
class Gigasecond {
    constructor(initialDate) {
        this.resultDate = new Date(initialDate.getTime() + GIGASECONDS_MILLISECONDS);
    }
    date() {
        return new Date(this.resultDate);
    }
}
exports.Gigasecond = Gigasecond;
