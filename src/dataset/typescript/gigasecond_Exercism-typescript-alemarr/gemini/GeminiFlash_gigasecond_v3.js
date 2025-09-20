"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECONDS_SECONDS = 1000000000;
class Gigasecond {
    constructor(initialDate) {
        this.initialTime = initialDate.getTime();
    }
    date() {
        return new Date(this.initialTime + GIGASECONDS_SECONDS * 1000);
    }
}
exports.Gigasecond = Gigasecond;
