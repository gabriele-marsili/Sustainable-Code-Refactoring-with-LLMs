"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EARTH_YEAR_IN_SECONDS = 31557600;
// Pre-calculated divisors to avoid repeated multiplication
const PLANET_DIVISORS = {
    EARTH: EARTH_YEAR_IN_SECONDS,
    MERCURY: 0.2408467 * EARTH_YEAR_IN_SECONDS,
    VENUS: 0.61519726 * EARTH_YEAR_IN_SECONDS,
    MARS: 1.8808158 * EARTH_YEAR_IN_SECONDS,
    JUPITER: 11.862615 * EARTH_YEAR_IN_SECONDS,
    SATURN: 29.447498 * EARTH_YEAR_IN_SECONDS,
    URANUS: 84.016846 * EARTH_YEAR_IN_SECONDS,
    NEPTUNE: 164.79132 * EARTH_YEAR_IN_SECONDS
};
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    onEarth() {
        return Math.round(this.seconds / PLANET_DIVISORS.EARTH * 100) / 100;
    }
    onMercury() {
        return Math.round(this.seconds / PLANET_DIVISORS.MERCURY * 100) / 100;
    }
    onVenus() {
        return Math.round(this.seconds / PLANET_DIVISORS.VENUS * 100) / 100;
    }
    onMars() {
        return Math.round(this.seconds / PLANET_DIVISORS.MARS * 100) / 100;
    }
    onJupiter() {
        return Math.round(this.seconds / PLANET_DIVISORS.JUPITER * 100) / 100;
    }
    onSaturn() {
        return Math.round(this.seconds / PLANET_DIVISORS.SATURN * 100) / 100;
    }
    onUranus() {
        return Math.round(this.seconds / PLANET_DIVISORS.URANUS * 100) / 100;
    }
    onNeptune() {
        return Math.round(this.seconds / PLANET_DIVISORS.NEPTUNE * 100) / 100;
    }
}
exports.default = SpaceAge;
