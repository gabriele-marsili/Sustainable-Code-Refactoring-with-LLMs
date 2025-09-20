"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGASECOND_MS = 1000000000000;
class Gigasecond {
    constructor(input) {
        this.resultDate = new Date(input.getTime() + GIGASECOND_MS);
    }
    date() {
        return this.resultDate;
    }
}
exports.default = Gigasecond;
