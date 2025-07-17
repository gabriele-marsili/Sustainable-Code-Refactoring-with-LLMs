"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECOND = Math.pow(10, 9);
const MILLISECOND = Math.pow(10, -3);
class Gigasecond {
    constructor(moment) {
        this.milliseconds = moment.getTime();
    }
    date() {
        return new Date(this.milliseconds + GIGASECOND / MILLISECOND);
    }
}
exports.Gigasecond = Gigasecond;
