"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.initDate = initDate;
    }
    date() {
        return new Date(this.initDate.getTime() + Gigasecond.GIGASECOND_MS);
    }
}
Gigasecond.GIGASECOND_MS = 1000000000000;
exports.default = Gigasecond;
