"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGASECOND_IN_MS = 1000000000000;
class Gigasecond {
    constructor(input) {
        this.input = input;
    }
    date() {
        return new Date(this.input.getTime() + GIGASECOND_IN_MS);
    }
}
exports.default = Gigasecond;
