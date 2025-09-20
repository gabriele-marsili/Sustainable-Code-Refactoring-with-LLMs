"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGASECOND_MS = 1000000000000;
class Gigasecond {
    constructor(input) {
        this.timestamp = input.getTime();
    }
    date() {
        return new Date(this.timestamp + GIGASECOND_MS);
    }
}
exports.default = Gigasecond;
