"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clock {
    constructor(hours, minutes = 0) {
        this.totalMinutes = (minutes + hours * Clock.MINUTES_PER_HOUR) % Clock.MINUTES_PER_DAY;
        if (this.totalMinutes < 0) {
            this.totalMinutes += Clock.MINUTES_PER_DAY;
        }
    }
    pad(num) {
        return num < 10 ? `0${num}` : num.toString();
    }
    toString() {
        let adjustedMinutes = this.totalMinutes;
        if (adjustedMinutes < 0) {
            adjustedMinutes += Clock.MINUTES_PER_DAY;
        }
        adjustedMinutes %= Clock.MINUTES_PER_DAY;
        const hours = Math.floor(adjustedMinutes / Clock.MINUTES_PER_HOUR);
        const minutes = adjustedMinutes % Clock.MINUTES_PER_HOUR;
        return `${this.pad(hours)}:${this.pad(minutes)}`;
    }
    plus(minutes) {
        this.totalMinutes = (this.totalMinutes + minutes) % Clock.MINUTES_PER_DAY;
        if (this.totalMinutes < 0) {
            this.totalMinutes += Clock.MINUTES_PER_DAY;
        }
        return this;
    }
    minus(minutes) {
        this.totalMinutes = (this.totalMinutes - minutes) % Clock.MINUTES_PER_DAY;
        if (this.totalMinutes < 0) {
            this.totalMinutes += Clock.MINUTES_PER_DAY;
        }
        return this;
    }
    equals(that) {
        return this.totalMinutes === that.totalMinutes;
    }
}
Clock.MINUTES_PER_HOUR = 60;
Clock.MINUTES_PER_DAY = Clock.MINUTES_PER_HOUR * 24;
exports.default = Clock;
