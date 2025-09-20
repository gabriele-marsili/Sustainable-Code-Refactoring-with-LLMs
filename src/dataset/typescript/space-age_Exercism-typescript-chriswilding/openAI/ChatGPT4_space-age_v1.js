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
const orbitalPeriodMap = {
    Mercury: OrbitalPeriod.Mercury,
    Venus: OrbitalPeriod.Venus,
    Earth: OrbitalPeriod.Earth,
    Mars: OrbitalPeriod.Mars,
    Jupiter: OrbitalPeriod.Jupiter,
    Saturn: OrbitalPeriod.Saturn,
    Uranus: OrbitalPeriod.Uranus,
    Neptune: OrbitalPeriod.Neptune,
};
function calculate(orbitalPeriod, seconds) {
    return Math.round((seconds / (orbitalPeriod * SECONDS_IN_EARTH_YEAR)) * 100) / 100;
}
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    calculateAge(planet) {
        return calculate(orbitalPeriodMap[planet], this.seconds);
    }
    onMercury() {
        return this.calculateAge("Mercury");
    }
    onVenus() {
        return this.calculateAge("Venus");
    }
    onEarth() {
        return this.calculateAge("Earth");
    }
    onMars() {
        return this.calculateAge("Mars");
    }
    onJupiter() {
        return this.calculateAge("Jupiter");
    }
    onSaturn() {
        return this.calculateAge("Saturn");
    }
    onUranus() {
        return this.calculateAge("Uranus");
    }
    onNeptune() {
        return this.calculateAge("Neptune");
    }
}
exports.default = SpaceAge;
