"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clock {
    constructor(hours, minutes = 0) {
        this.totalMinutes = this.normalizeMinutes(minutes + hours * Clock.MINUTES_PER_HOUR);
    }
    normalizeMinutes(minutes) {
        const result = minutes % Clock.MINUTES_PER_DAY;
        return result < 0 ? result + Clock.MINUTES_PER_DAY : result;
    }
    pad(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
    toString() {
        const hours = Math.floor(this.totalMinutes / Clock.MINUTES_PER_HOUR);
        const minutes = this.totalMinutes % Clock.MINUTES_PER_HOUR;
        return `${this.pad(hours)}:${this.pad(minutes)}`;
    }
    plus(minutes) {
        this.totalMinutes = this.normalizeMinutes(this.totalMinutes + minutes);
        return this;
    }
    minus(minutes) {
        this.totalMinutes = this.normalizeMinutes(this.totalMinutes - minutes);
        return this;
    }
    equals(that) {
        return this.totalMinutes === that.totalMinutes;
    }
}
Clock.MINUTES_PER_HOUR = 60;
Clock.MINUTES_PER_DAY = 1440;
exports.default = Clock;
