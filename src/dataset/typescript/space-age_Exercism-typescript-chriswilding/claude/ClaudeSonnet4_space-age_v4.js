"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SECONDS_IN_EARTH_YEAR = 31557600;
const ORBITAL_PERIODS = {
    Mercury: 0.2408467,
    Venus: 0.61519726,
    Earth: 1,
    Mars: 1.8808158,
    Jupiter: 11.862615,
    Saturn: 29.447498,
    Uranus: 84.016846,
    Neptune: 164.79132,
};
const INVERSE_ORBITAL_PERIODS = {
    Mercury: 1 / (ORBITAL_PERIODS.Mercury * SECONDS_IN_EARTH_YEAR),
    Venus: 1 / (ORBITAL_PERIODS.Venus * SECONDS_IN_EARTH_YEAR),
    Earth: 1 / (ORBITAL_PERIODS.Earth * SECONDS_IN_EARTH_YEAR),
    Mars: 1 / (ORBITAL_PERIODS.Mars * SECONDS_IN_EARTH_YEAR),
    Jupiter: 1 / (ORBITAL_PERIODS.Jupiter * SECONDS_IN_EARTH_YEAR),
    Saturn: 1 / (ORBITAL_PERIODS.Saturn * SECONDS_IN_EARTH_YEAR),
    Uranus: 1 / (ORBITAL_PERIODS.Uranus * SECONDS_IN_EARTH_YEAR),
    Neptune: 1 / (ORBITAL_PERIODS.Neptune * SECONDS_IN_EARTH_YEAR),
};
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
function calculate(orbitalPeriod, seconds) {
    const n = seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR);
    return Math.round(n * 100) / 100;
}
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    onMercury() {
        return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Mercury * 100) / 100;
    }
    onVenus() {
        return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Venus * 100) / 100;
    }
    onEarth() {
        return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Earth * 100) / 100;
    }
    onMars() {
        return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Mars * 100) / 100;
    }
    onJupiter() {
        return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Jupiter * 100) / 100;
    }
    onSaturn() {
        return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Saturn * 100) / 100;
    }
    onUranus() {
        return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Uranus * 100) / 100;
    }
    onNeptune() {
        return Math.round(this.seconds * INVERSE_ORBITAL_PERIODS.Neptune * 100) / 100;
    }
}
exports.default = SpaceAge;
