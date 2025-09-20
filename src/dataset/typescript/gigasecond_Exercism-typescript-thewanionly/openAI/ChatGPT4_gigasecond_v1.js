"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gigasecond = void 0;
class Gigasecond {
    constructor(moment) {
        this.moment = moment;
        this.gigasecondInMs = 1e12;
    }
    date() {
        return new Date(this.moment.getTime() + this.gigasecondInMs);
    }
}
exports.Gigasecond = Gigasecond;
