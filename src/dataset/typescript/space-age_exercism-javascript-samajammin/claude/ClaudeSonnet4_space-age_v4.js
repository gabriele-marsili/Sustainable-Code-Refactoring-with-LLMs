"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    parsePlanetYears(planetYear) {
        return Math.round((this.seconds / planetYear) * 100) / 100;
    }
    onEarth() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR);
    }
    onMercury() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.MERCURY);
    }
    onVenus() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.VENUS);
    }
    onMars() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.MARS);
    }
    onJupiter() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.JUPITER);
    }
    onSaturn() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.SATURN);
    }
    onUranus() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.URANUS);
    }
    onNeptune() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.NEPTUNE);
    }
}
SpaceAge.EARTH_YEAR = 31557600;
SpaceAge.PLANET_RATIOS = {
    MERCURY: 0.2408467,
    VENUS: 0.61519726,
    MARS: 1.8808158,
    JUPITER: 11.862615,
    SATURN: 29.447498,
    URANUS: 84.016846,
    NEPTUNE: 164.79132
};
exports.default = SpaceAge;
