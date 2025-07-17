"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
const HOURS_IN_A_DAY = 24;
const MINUTES_IN_AN_HOUR = 60;
var TimeUnit;
(function (TimeUnit) {
    TimeUnit["hour"] = "hour";
    TimeUnit["minute"] = "minute";
})(TimeUnit || (TimeUnit = {}));
var TimeUnitLimit;
(function (TimeUnitLimit) {
    TimeUnitLimit[TimeUnitLimit["hour"] = 24] = "hour";
    TimeUnitLimit[TimeUnitLimit["minute"] = 60] = "minute";
})(TimeUnitLimit || (TimeUnitLimit = {}));
class Clock {
    constructor(hour, minute = 0) {
        this.hour = this.calculateTime(TimeUnit.hour, this.calculateTotalHours(hour, minute));
        this.minute = this.calculateTime(TimeUnit.minute, minute);
    }
    toString() {
        return `${this.toTwoDigitsString(this.hour)}:${this.toTwoDigitsString(this.minute)}`;
    }
    plus(minutes) {
        return new Clock(this.hour, this.minute + minutes);
    }
    minus(minutes) {
        return new Clock(this.hour, this.minute - minutes);
    }
    equals(other) {
        return this.toString() === other.toString();
    }
    calculateTotalHours(hours, minutes) {
        // Get the total hours, including the exceeding minutes
        return hours + Math.floor(minutes / MINUTES_IN_AN_HOUR);
    }
    calculateTime(unit, value) {
        // Get the absolute time. This is to handle case where time is negative
        let absoluteTime = value + TimeUnitLimit[unit] * Math.abs(Math.floor(value / TimeUnitLimit[unit]));
        // If time exceeds the max limit, roll over
        absoluteTime = absoluteTime % TimeUnitLimit[unit];
        return absoluteTime;
    }
    toTwoDigitsString(value) {
        // Convert to two digit string
        return String(value).padStart(2, '0');
    }
}
exports.Clock = Clock;
