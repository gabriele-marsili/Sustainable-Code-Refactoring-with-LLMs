"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clock {
    constructor(hours, minutes = 0) {
        this.totalMinutes = ((hours * Clock.MINUTES_PER_HOUR + minutes) % Clock.MINUTES_PER_DAY + Clock.MINUTES_PER_DAY) % Clock.MINUTES_PER_DAY;
    }
    static pad(num) {
        return num.toString().padStart(2, '0');
    }
    toString() {
        const hours = Math.floor(this.totalMinutes / Clock.MINUTES_PER_HOUR);
        const minutes = this.totalMinutes % Clock.MINUTES_PER_HOUR;
        return `${Clock.pad(hours)}:${Clock.pad(minutes)}`;
    }
    plus(minutes) {
        this.totalMinutes = (this.totalMinutes + minutes) % Clock.MINUTES_PER_DAY;
        if (this.totalMinutes < 0)
            this.totalMinutes += Clock.MINUTES_PER_DAY;
        return this;
    }
    minus(minutes) {
        return this.plus(-minutes);
    }
    equals(that) {
        return this.totalMinutes === that.totalMinutes;
    }
}
Clock.MINUTES_PER_HOUR = 60;
Clock.MINUTES_PER_DAY = Clock.MINUTES_PER_HOUR * 24;
exports.default = Clock;
