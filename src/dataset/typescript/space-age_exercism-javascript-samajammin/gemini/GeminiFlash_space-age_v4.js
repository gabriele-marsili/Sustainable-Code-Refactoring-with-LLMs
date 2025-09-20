"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
        this.earthYears = seconds / SpaceAge.EARTH_YEAR;
    }
    calculatePlanetYear(yearLength) {
        return parseFloat((this.earthYears * (SpaceAge.EARTH_YEAR / yearLength)).toFixed(2));
    }
    onEarth() {
        return parseFloat(this.earthYears.toFixed(2));
    }
    onMercury() {
        return this.calculatePlanetYear(SpaceAge.MERCURY_YEAR);
    }
    onVenus() {
        return this.calculatePlanetYear(SpaceAge.VENUS_YEAR);
    }
    onMars() {
        return this.calculatePlanetYear(SpaceAge.MARS_YEAR);
    }
    onJupiter() {
        return this.calculatePlanetYear(SpaceAge.JUPITER_YEAR);
    }
    onSaturn() {
        return this.calculatePlanetYear(SpaceAge.SATURN_YEAR);
    }
    onUranus() {
        return this.calculatePlanetYear(SpaceAge.URANUS_YEAR);
    }
    onNeptune() {
        return this.calculatePlanetYear(SpaceAge.NEPTUNE_YEAR);
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
