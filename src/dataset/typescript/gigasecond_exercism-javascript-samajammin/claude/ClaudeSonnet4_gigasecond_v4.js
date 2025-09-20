"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.gigasecondMs = 1000000000000;
        this.resultDate = new Date(initDate.getTime() + this.gigasecondMs);
    }
    date() {
        return new Date(this.resultDate.getTime());
    }
}
exports.default = Gigasecond;
