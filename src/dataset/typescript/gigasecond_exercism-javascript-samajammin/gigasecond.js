"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.initDate = initDate;
    }
    date() {
        return new Date(this.initDate.getTime() + Math.pow(10, 12));
    }
}
exports.default = Gigasecond;
