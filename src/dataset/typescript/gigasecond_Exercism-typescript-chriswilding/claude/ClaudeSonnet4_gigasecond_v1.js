"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGASECOND_MS = 1000000000000;
class Gigasecond {
    constructor(input) {
        this.futureTime = input.getTime() + GIGASECOND_MS;
    }
    date() {
        return new Date(this.futureTime);
    }
}
exports.default = Gigasecond;
