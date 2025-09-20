"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.initTime = initDate.getTime();
    }
    date() {
        return new Date(this.initTime + Gigasecond.GIGASECOND);
    }
}
Gigasecond.GIGASECOND = 1000000000000;
exports.default = Gigasecond;
