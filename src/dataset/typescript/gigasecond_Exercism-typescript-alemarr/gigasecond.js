"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECONDS_SECONDS = Math.pow(10, 9);
class Gigasecond {
    constructor(initialDate) {
        this.initialDate = initialDate;
    }
    date() {
        const moment = new Date(this.initialDate);
        moment.setSeconds(moment.getSeconds() + GIGASECONDS_SECONDS);
        return moment;
    }
}
exports.Gigasecond = Gigasecond;
