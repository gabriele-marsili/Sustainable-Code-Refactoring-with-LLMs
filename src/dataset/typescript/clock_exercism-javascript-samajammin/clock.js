"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clock {
    constructor(hours, minutes = 0) {
        this.totalMinutes = minutes + hours * Clock.MINUTES_PER_HOUR;
    }
    pad(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
    toString() {
        const remainingMinutes = this.totalMinutes % Clock.MINUTES_PER_DAY;
        const adjustedMinutes = remainingMinutes < 0
            ? remainingMinutes + Clock.MINUTES_PER_DAY
            : remainingMinutes;
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
        return this.toString() === that.toString();
    }
}
Clock.MINUTES_PER_HOUR = 60;
Clock.MINUTES_PER_DAY = Clock.MINUTES_PER_HOUR * 24;
exports.default = Clock;
