"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    calculateYears(planetYear) {
        return Number((this.seconds / planetYear).toFixed(2));
    }
    onEarth() {
        return this.calculateYears(SpaceAge.EARTH_YEAR);
    }
    onMercury() {
        return this.calculateYears(SpaceAge.MERCURY_YEAR);
    }
    onVenus() {
        return this.calculateYears(SpaceAge.VENUS_YEAR);
    }
    onMars() {
        return this.calculateYears(SpaceAge.MARS_YEAR);
    }
    onJupiter() {
        return this.calculateYears(SpaceAge.JUPITER_YEAR);
    }
    onSaturn() {
        return this.calculateYears(SpaceAge.SATURN_YEAR);
    }
    onUranus() {
        return this.calculateYears(SpaceAge.URANUS_YEAR);
    }
    onNeptune() {
        return this.calculateYears(SpaceAge.NEPTUNE_YEAR);
    }
}
SpaceAge.EARTH_YEAR = 31557600;
SpaceAge.MERCURY_YEAR = SpaceAge.EARTH_YEAR * 0.2408467;
SpaceAge.VENUS_YEAR = SpaceAge.EARTH_YEAR * 0.61519726;
SpaceAge.MARS_YEAR = SpaceAge.EARTH_YEAR * 1.8808158;
SpaceAge.JUPITER_YEAR = SpaceAge.EARTH_YEAR * 11.862615;
SpaceAge.SATURN_YEAR = SpaceAge.EARTH_YEAR * 29.447498;
SpaceAge.URANUS_YEAR = SpaceAge.EARTH_YEAR * 84.016846;
SpaceAge.NEPTUNE_YEAR = SpaceAge.EARTH_YEAR * 164.79132;
exports.default = SpaceAge;
