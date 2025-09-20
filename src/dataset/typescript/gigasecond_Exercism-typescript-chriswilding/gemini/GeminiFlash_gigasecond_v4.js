"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGASECOND = 1000000000;
class Gigasecond {
    constructor(input) {
        this.inputTime = input.getTime();
    }
    date() {
        return new Date(this.inputTime + GIGASECOND * 1000);
    }
}
exports.default = Gigasecond;
