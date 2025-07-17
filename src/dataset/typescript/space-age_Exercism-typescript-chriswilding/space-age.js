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
function calculate(orbitalPeriod, seconds) {
    const n = seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR);
    return Math.round(n * 100) / 100;
}
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    onMercury() {
        return calculate(ObitalPeriod.Mercury, this.seconds);
    }
    onVenus() {
        return calculate(ObitalPeriod.Venus, this.seconds);
    }
    onEarth() {
        return calculate(ObitalPeriod.Earth, this.seconds);
    }
    onMars() {
        return calculate(ObitalPeriod.Mars, this.seconds);
    }
    onJupiter() {
        return calculate(ObitalPeriod.Jupiter, this.seconds);
    }
    onSaturn() {
        return calculate(ObitalPeriod.Saturn, this.seconds);
    }
    onUranus() {
        return calculate(ObitalPeriod.Uranus, this.seconds);
    }
    onNeptune() {
        return calculate(ObitalPeriod.Neptune, this.seconds);
    }
}
exports.default = SpaceAge;
