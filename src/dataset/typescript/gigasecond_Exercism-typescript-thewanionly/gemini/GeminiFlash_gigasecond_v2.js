"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECOND_IN_MS = Math.pow(10, 12);
class Gigasecond {
    constructor(moment) {
        this.birthTimeMs = moment.getTime();
    }
    date() {
        return new Date(this.birthTimeMs + GIGASECOND_IN_MS);
    }
}
exports.Gigasecond = Gigasecond;
