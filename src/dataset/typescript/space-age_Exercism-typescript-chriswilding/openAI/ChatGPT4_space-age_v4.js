"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SECONDS_IN_EARTH_YEAR = 31557600;
var OrbitalPeriod;
(function (OrbitalPeriod) {
    OrbitalPeriod[OrbitalPeriod["Earth"] = 1] = "Earth";
    OrbitalPeriod[OrbitalPeriod["Mercury"] = 0.2408467] = "Mercury";
    OrbitalPeriod[OrbitalPeriod["Venus"] = 0.61519726] = "Venus";
    OrbitalPeriod[OrbitalPeriod["Mars"] = 1.8808158] = "Mars";
    OrbitalPeriod[OrbitalPeriod["Jupiter"] = 11.862615] = "Jupiter";
    OrbitalPeriod[OrbitalPeriod["Saturn"] = 29.447498] = "Saturn";
    OrbitalPeriod[OrbitalPeriod["Uranus"] = 84.016846] = "Uranus";
    OrbitalPeriod[OrbitalPeriod["Neptune"] = 164.79132] = "Neptune";
})(OrbitalPeriod || (OrbitalPeriod = {}));
const calculate = (orbitalPeriod, seconds) => Math.round((seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR)) * 100) / 100;
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    calculateAge(orbitalPeriod) {
        return calculate(orbitalPeriod, this.seconds);
    }
    onMercury() {
        return this.calculateAge(OrbitalPeriod.Mercury);
    }
    onVenus() {
        return this.calculateAge(OrbitalPeriod.Venus);
    }
    onEarth() {
        return this.calculateAge(OrbitalPeriod.Earth);
    }
    onMars() {
        return this.calculateAge(OrbitalPeriod.Mars);
    }
    onJupiter() {
        return this.calculateAge(OrbitalPeriod.Jupiter);
    }
    onSaturn() {
        return this.calculateAge(OrbitalPeriod.Saturn);
    }
    onUranus() {
        return this.calculateAge(OrbitalPeriod.Uranus);
    }
    onNeptune() {
        return this.calculateAge(OrbitalPeriod.Neptune);
    }
}
exports.default = SpaceAge;
