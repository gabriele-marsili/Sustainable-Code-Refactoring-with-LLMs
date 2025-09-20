"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECONDS_MS = 1e12;
class Gigasecond {
    constructor(initialDate) {
        this.initialDate = initialDate;
    }
    date() {
        return new Date(this.initialDate.getTime() + GIGASECONDS_MS);
    }
}
exports.Gigasecond = Gigasecond;
