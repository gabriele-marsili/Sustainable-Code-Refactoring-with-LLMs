"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    parsePlanetYears(planetYear) {
        return parseFloat((this.seconds / planetYear).toFixed(2));
    }
    onEarth() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR);
    }
    onMercury() {
        return this.parsePlanetYears(SpaceAge.MERCURY_YEAR);
    }
    onVenus() {
        return this.parsePlanetYears(SpaceAge.VENUS_YEAR);
    }
    onMars() {
        return this.parsePlanetYears(SpaceAge.MARS_YEAR);
    }
    onJupiter() {
        return this.parsePlanetYears(SpaceAge.JUPITER_YEAR);
    }
    onSaturn() {
        return this.parsePlanetYears(SpaceAge.SATURN_YEAR);
    }
    onUranus() {
        return this.parsePlanetYears(SpaceAge.URANUS_YEAR);
    }
    onNeptune() {
        return this.parsePlanetYears(SpaceAge.NEPTUNE_YEAR);
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
