"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
const GIGASECOND_IN_MS = 1e12; // Precomputed gigasecond in milliseconds
class Gigasecond {
    constructor(moment) {
        this.targetDate = new Date(moment.getTime() + GIGASECOND_IN_MS);
    }
    date() {
        return this.targetDate;
    }
}
exports.Gigasecond = Gigasecond;
