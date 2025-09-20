"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SECONDS_IN_EARTH_YEAR = 31557600;
var ObitalPeriod;
(function (ObitalPeriod) {
    ObitalPeriod[ObitalPeriod["Earth"] = 1] = "Earth";
    ObitalPeriod[ObitalPeriod["Mercury"] = 0.2408467] = "Mercury";
    ObitalPeriod[ObitalPeriod["Venus"] = 0.61519726] = "Venus";
    ObitalPeriod[ObitalPeriod["Mars"] = 1.8808158] = "Mars";
    ObitalPeriod[ObitalPeriod["Jupiter"] = 11.862615] = "Jupiter";
    ObitalPeriod[ObitalPeriod["Saturn"] = 29.447498] = "Saturn";
    ObitalPeriod[ObitalPeriod["Uranus"] = 84.016846] = "Uranus";
    ObitalPeriod[ObitalPeriod["Neptune"] = 164.79132] = "Neptune";
})(ObitalPeriod || (ObitalPeriod = {}));
const orbitalPeriodInEarthYears = {
    [ObitalPeriod.Earth]: 1,
    [ObitalPeriod.Mercury]: 0.2408467,
    [ObitalPeriod.Venus]: 0.61519726,
    [ObitalPeriod.Mars]: 1.8808158,
    [ObitalPeriod.Jupiter]: 11.862615,
    [ObitalPeriod.Saturn]: 29.447498,
    [ObitalPeriod.Uranus]: 84.016846,
    [ObitalPeriod.Neptune]: 164.79132,
};
const calculateAge = (seconds, orbitalPeriod) => {
    const age = seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR);
    return Math.round(age * 100) / 100;
};
class SpaceAge {
    constructor(seconds) {
        this._seconds = seconds;
    }
    get seconds() {
        return this._seconds;
    }
    onMercury() {
        return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Mercury]);
    }
    onVenus() {
        return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Venus]);
    }
    onEarth() {
        return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Earth]);
    }
    onMars() {
        return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Mars]);
    }
    onJupiter() {
        return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Jupiter]);
    }
    onSaturn() {
        return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Saturn]);
    }
    onUranus() {
        return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Uranus]);
    }
    onNeptune() {
        return calculateAge(this._seconds, orbitalPeriodInEarthYears[ObitalPeriod.Neptune]);
    }
}
exports.default = SpaceAge;
