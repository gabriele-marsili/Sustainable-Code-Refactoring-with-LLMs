"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clock {
    constructor(hours, minutes = 0) {
        this.totalMinutes = minutes + hours * 60;
    }
    pad(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
    toString() {
        let adjustedMinutes = this.totalMinutes % 1440;
        if (adjustedMinutes < 0) {
            adjustedMinutes += 1440;
        }
        const hours = Math.floor(adjustedMinutes / 60);
        const minutes = adjustedMinutes % 60;
        return `${this.pad(hours)}:${this.pad(minutes)}`;
    }
    plus(minutes) {
        this.totalMinutes += minutes;
        return this;
    }
    minus(minutes) {
        this.totalMinutes -= minutes;
        return this;
    }
    equals(that) {
        let thisAdjusted = this.totalMinutes % 1440;
        let thatAdjusted = that.totalMinutes % 1440;
        if (thisAdjusted < 0)
            thisAdjusted += 1440;
        if (thatAdjusted < 0)
            thatAdjusted += 1440;
        return thisAdjusted === thatAdjusted;
    }
}
Clock.MINUTES_PER_HOUR = 60;
Clock.MINUTES_PER_DAY = 1440;
exports.default = Clock;
