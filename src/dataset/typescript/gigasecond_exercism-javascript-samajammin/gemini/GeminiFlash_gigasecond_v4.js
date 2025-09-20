"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.initDateMilliseconds = initDate.getTime();
    }
    date() {
        return new Date(this.initDateMilliseconds + 1000000000000);
    }
}
exports.default = Gigasecond;
