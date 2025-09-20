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
        let hours = Math.floor(this.totalMinutes / Clock.MINUTES_PER_HOUR);
        let minutes = this.totalMinutes % Clock.MINUTES_PER_HOUR;
        hours = hours % 24;
        if (hours < 0) {
            hours += 24;
        }
        if (minutes < 0) {
            minutes += 60;
        }
        minutes = minutes % 60;
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
