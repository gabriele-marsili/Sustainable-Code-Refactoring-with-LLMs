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
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
        this.ageInEarthYears = Object.values(OrbitalPeriod).reduce((acc, period) => {
            if (typeof period === "number") {
                acc[period] = Math.round((seconds / (period * SECONDS_IN_EARTH_YEAR)) * 100) / 100;
            }
            return acc;
        }, {});
    }
    onMercury() {
        return this.ageInEarthYears[OrbitalPeriod.Mercury];
    }
    onVenus() {
        return this.ageInEarthYears[OrbitalPeriod.Venus];
    }
    onEarth() {
        return this.ageInEarthYears[OrbitalPeriod.Earth];
    }
    onMars() {
        return this.ageInEarthYears[OrbitalPeriod.Mars];
    }
    onJupiter() {
        return this.ageInEarthYears[OrbitalPeriod.Jupiter];
    }
    onSaturn() {
        return this.ageInEarthYears[OrbitalPeriod.Saturn];
    }
    onUranus() {
        return this.ageInEarthYears[OrbitalPeriod.Uranus];
    }
    onNeptune() {
        return this.ageInEarthYears[OrbitalPeriod.Neptune];
    }
}
exports.default = SpaceAge;
