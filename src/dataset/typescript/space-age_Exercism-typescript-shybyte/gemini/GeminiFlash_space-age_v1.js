"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EARTH_YEAR_IN_SECONDS = 31557600;
const planetYearRatios = {
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132,
};
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
        this.earthAge = this.calculateAge(1.0);
    }
    calculateAge(earthYears) {
        return Math.round((this.seconds / (earthYears * EARTH_YEAR_IN_SECONDS)) * 100) / 100;
    }
    onEarth() {
        return this.earthAge;
    }
    onMercury() {
        return this.calculateAge(planetYearRatios.mercury);
    }
    onVenus() {
        return this.calculateAge(planetYearRatios.venus);
    }
    onMars() {
        return this.calculateAge(planetYearRatios.mars);
    }
    onJupiter() {
        return this.calculateAge(planetYearRatios.jupiter);
    }
    onSaturn() {
        return this.calculateAge(planetYearRatios.saturn);
    }
    onUranus() {
        return this.calculateAge(planetYearRatios.uranus);
    }
    onNeptune() {
        return this.calculateAge(planetYearRatios.neptune);
    }
}
exports.default = SpaceAge;
