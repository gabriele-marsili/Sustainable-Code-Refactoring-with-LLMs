"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGASECOND = 1000000000;
class Gigasecond {
    constructor(input) {
        this.input = input;
    }
    date() {
        return new Date(this.input.getTime() + GIGASECOND * 1000);
    }
}
exports.default = Gigasecond;
