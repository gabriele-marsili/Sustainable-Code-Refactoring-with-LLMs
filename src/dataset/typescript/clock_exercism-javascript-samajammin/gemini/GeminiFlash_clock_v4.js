"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clock {
    constructor(hours, minutes = 0) {
        this.totalMinutes = (hours * Clock.MINUTES_PER_HOUR + minutes) % Clock.MINUTES_PER_DAY;
        if (this.totalMinutes < 0) {
            this.totalMinutes += Clock.MINUTES_PER_DAY;
        }
    }
    pad(num) {
        return num < 10 ? `0${num}` : num.toString();
    }
    toString() {
        let hours = Math.floor(this.totalMinutes / Clock.MINUTES_PER_HOUR);
        let minutes = this.totalMinutes % Clock.MINUTES_PER_HOUR;
        hours = (hours % 24 + 24) % 24;
        minutes = (minutes % 60 + 60) % 60;
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
