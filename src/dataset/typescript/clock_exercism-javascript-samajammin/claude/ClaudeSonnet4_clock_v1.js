"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clock {
    constructor(hours, minutes = 0) {
        this.totalMinutes = minutes + (hours << 6) - (hours << 2);
    }
    pad(num) {
        return num < 10 ? `0${num}` : num.toString();
    }
    toString() {
        let adjustedMinutes = this.totalMinutes % Clock.MINUTES_PER_DAY;
        if (adjustedMinutes < 0) {
            adjustedMinutes += Clock.MINUTES_PER_DAY;
        }
        const hours = Math.floor(adjustedMinutes / Clock.MINUTES_PER_HOUR);
        const minutes = adjustedMinutes % Clock.MINUTES_PER_HOUR;
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
        let thisAdjusted = this.totalMinutes % Clock.MINUTES_PER_DAY;
        let thatAdjusted = that.totalMinutes % Clock.MINUTES_PER_DAY;
        if (thisAdjusted < 0)
            thisAdjusted += Clock.MINUTES_PER_DAY;
        if (thatAdjusted < 0)
            thatAdjusted += Clock.MINUTES_PER_DAY;
        return thisAdjusted === thatAdjusted;
    }
}
Clock.MINUTES_PER_HOUR = 60;
Clock.MINUTES_PER_DAY = 1440;
exports.default = Clock;
