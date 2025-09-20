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
    Earth: 1,
    Mercury: 0.2408467,
    Venus: 0.61519726,
    Mars: 1.8808158,
    Jupiter: 11.862615,
    Saturn: 29.447498,
    Uranus: 84.016846,
    Neptune: 164.79132,
};
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
        this.earthYears = seconds / SECONDS_IN_EARTH_YEAR;
    }
    calculate(orbitalPeriod) {
        const n = this.earthYears / orbitalPeriod;
        return Math.round(n * 100) / 100;
    }
    onMercury() {
        return this.calculate(orbitalPeriodInEarthYears.Mercury);
    }
    onVenus() {
        return this.calculate(orbitalPeriodInEarthYears.Venus);
    }
    onEarth() {
        return this.calculate(orbitalPeriodInEarthYears.Earth);
    }
    onMars() {
        return this.calculate(orbitalPeriodInEarthYears.Mars);
    }
    onJupiter() {
        return this.calculate(orbitalPeriodInEarthYears.Jupiter);
    }
    onSaturn() {
        return this.calculate(orbitalPeriodInEarthYears.Saturn);
    }
    onUranus() {
        return this.calculate(orbitalPeriodInEarthYears.Uranus);
    }
    onNeptune() {
        return this.calculate(orbitalPeriodInEarthYears.Neptune);
    }
}
exports.default = SpaceAge;
