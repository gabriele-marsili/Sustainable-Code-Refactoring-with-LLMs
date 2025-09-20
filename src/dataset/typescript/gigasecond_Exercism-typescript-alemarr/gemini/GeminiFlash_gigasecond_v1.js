"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECONDS_MILLISECONDS = 1000000000000;
class Gigasecond {
    constructor(initialDate) {
        this.initialTime = initialDate.getTime();
    }
    date() {
        return new Date(this.initialTime + GIGASECONDS_MILLISECONDS);
    }
}
exports.Gigasecond = Gigasecond;
