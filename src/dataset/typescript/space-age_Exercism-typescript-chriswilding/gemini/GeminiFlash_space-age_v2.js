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
    [ObitalPeriod.Earth]: ObitalPeriod.Earth,
    [ObitalPeriod.Mercury]: ObitalPeriod.Mercury,
    [ObitalPeriod.Venus]: ObitalPeriod.Venus,
    [ObitalPeriod.Mars]: ObitalPeriod.Mars,
    [ObitalPeriod.Jupiter]: ObitalPeriod.Jupiter,
    [ObitalPeriod.Saturn]: ObitalPeriod.Saturn,
    [ObitalPeriod.Uranus]: ObitalPeriod.Uranus,
    [ObitalPeriod.Neptune]: ObitalPeriod.Neptune,
};
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
        this.earthYears = seconds / SECONDS_IN_EARTH_YEAR;
    }
    calculate(orbitalPeriod) {
        const n = this.earthYears / orbitalPeriodInEarthYears[orbitalPeriod];
        return Math.round(n * 100) / 100;
    }
    onMercury() {
        return this.calculate(ObitalPeriod.Mercury);
    }
    onVenus() {
        return this.calculate(ObitalPeriod.Venus);
    }
    onEarth() {
        return this.calculate(ObitalPeriod.Earth);
    }
    onMars() {
        return this.calculate(ObitalPeriod.Mars);
    }
    onJupiter() {
        return this.calculate(ObitalPeriod.Jupiter);
    }
    onSaturn() {
        return this.calculate(ObitalPeriod.Saturn);
    }
    onUranus() {
        return this.calculate(ObitalPeriod.Uranus);
    }
    onNeptune() {
        return this.calculate(ObitalPeriod.Neptune);
    }
}
exports.default = SpaceAge;
