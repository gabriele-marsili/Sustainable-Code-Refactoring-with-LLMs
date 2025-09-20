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
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.mercury);
    }
    onVenus() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.venus);
    }
    onMars() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.mars);
    }
    onJupiter() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.jupiter);
    }
    onSaturn() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.saturn);
    }
    onUranus() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.uranus);
    }
    onNeptune() {
        return this.parsePlanetYears(SpaceAge.EARTH_YEAR * SpaceAge.PLANET_RATIOS.neptune);
    }
}
SpaceAge.EARTH_YEAR = 31557600;
SpaceAge.PLANET_RATIOS = {
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
};
exports.default = SpaceAge;
