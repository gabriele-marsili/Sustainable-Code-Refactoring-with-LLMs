"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.initTime = initDate.getTime();
    }
    date() {
        return new Date(this.initTime + Gigasecond.GIGASECOND_MS);
    }
}
Gigasecond.GIGASECOND_MS = 1e12;
exports.default = Gigasecond;
