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
        this.ageInEarthYears = seconds / SECONDS_IN_EARTH_YEAR;
    }
    calculate(orbitalPeriod) {
        return Math.round((this.ageInEarthYears / orbitalPeriod) * 100) / 100;
    }
    onMercury() {
        return this.calculate(OrbitalPeriod.Mercury);
    }
    onVenus() {
        return this.calculate(OrbitalPeriod.Venus);
    }
    onEarth() {
        return this.calculate(OrbitalPeriod.Earth);
    }
    onMars() {
        return this.calculate(OrbitalPeriod.Mars);
    }
    onJupiter() {
        return this.calculate(OrbitalPeriod.Jupiter);
    }
    onSaturn() {
        return this.calculate(OrbitalPeriod.Saturn);
    }
    onUranus() {
        return this.calculate(OrbitalPeriod.Uranus);
    }
    onNeptune() {
        return this.calculate(OrbitalPeriod.Neptune);
    }
}
exports.default = SpaceAge;
