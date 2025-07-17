"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
class Clock {
    constructor(hour, minute) {
        this._hours = hour;
        this._minutes = minute !== null && minute !== void 0 ? minute : 0;
        this.adjustClock();
    }
    plusHours(hour) {
        this._hours += hour;
        this.adjustClock();
    }
    adjustClock() {
        let hoursFromMinutes = Math.trunc(this._minutes / 60);
        this._hours += hoursFromMinutes;
        this._minutes %= 60;
        if (this._minutes < 0) {
            this._hours -= 1;
            this._minutes += 60;
        }
        this._hours %= 24;
        if (this._hours < 0) {
            this._hours += 24;
        }
    }
    toString() {
        return `${this._hours.toString().padStart(2, '0')}:${this._minutes.toString().padStart(2, '0')}`;
    }
    plus(minutes) {
        this._minutes += minutes;
        this.adjustClock();
        return this;
    }
    minus(minutes) {
        this._minutes -= minutes;
        this.adjustClock();
        return this;
    }
    equals(other) {
        return this._hours === other._hours && this._minutes === other._minutes;
    }
}
exports.Clock = Clock;
