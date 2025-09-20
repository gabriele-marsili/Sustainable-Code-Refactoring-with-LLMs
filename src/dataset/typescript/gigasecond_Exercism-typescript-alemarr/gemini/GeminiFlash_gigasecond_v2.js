"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECONDS_MILLISECONDS = Math.pow(10, 12);
class Gigasecond {
    constructor(initialDate) {
        this.initialTime = initialDate.getTime();
    }
    date() {
        return new Date(this.initialTime + GIGASECONDS_MILLISECONDS);
    }
}
exports.Gigasecond = Gigasecond;
