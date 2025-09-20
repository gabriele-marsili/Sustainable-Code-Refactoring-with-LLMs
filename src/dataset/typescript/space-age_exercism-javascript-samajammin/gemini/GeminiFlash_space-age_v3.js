"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    calculateYears(yearLengthInSeconds) {
        const years = this.seconds / yearLengthInSeconds;
        return Math.round(years * 100) / 100;
    }
    onEarth() {
        return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS);
    }
    onMercury() {
        return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.mercury);
    }
    onVenus() {
        return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.venus);
    }
    onMars() {
        return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.mars);
    }
    onJupiter() {
        return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.jupiter);
    }
    onSaturn() {
        return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.saturn);
    }
    onUranus() {
        return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.uranus);
    }
    onNeptune() {
        return this.calculateYears(SpaceAge.EARTH_YEAR_IN_SECONDS * SpaceAge.planetYearMultipliers.neptune);
    }
}
SpaceAge.EARTH_YEAR_IN_SECONDS = 31557600;
SpaceAge.planetYearMultipliers = {
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132,
};
exports.default = SpaceAge;
