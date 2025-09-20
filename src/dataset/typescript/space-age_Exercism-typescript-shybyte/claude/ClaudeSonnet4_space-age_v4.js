"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EARTH_YEAR_IN_SECONDS = 31557600;
const PLANET_YEAR_MULTIPLIERS = {
    EARTH: 1.0,
    MERCURY: 0.2408467,
    VENUS: 0.61519726,
    MARS: 1.8808158,
    JUPITER: 11.862615,
    SATURN: 29.447498,
    URANUS: 84.016846,
    NEPTUNE: 164.79132
};
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
        this.earthAge = seconds / EARTH_YEAR_IN_SECONDS;
    }
    onEarth() {
        return this.round(this.earthAge / PLANET_YEAR_MULTIPLIERS.EARTH);
    }
    onMercury() {
        return this.round(this.earthAge / PLANET_YEAR_MULTIPLIERS.MERCURY);
    }
    onVenus() {
        return this.round(this.earthAge / PLANET_YEAR_MULTIPLIERS.VENUS);
    }
    onMars() {
        return this.round(this.earthAge / PLANET_YEAR_MULTIPLIERS.MARS);
    }
    onJupiter() {
        return this.round(this.earthAge / PLANET_YEAR_MULTIPLIERS.JUPITER);
    }
    onSaturn() {
        return this.round(this.earthAge / PLANET_YEAR_MULTIPLIERS.SATURN);
    }
    onUranus() {
        return this.round(this.earthAge / PLANET_YEAR_MULTIPLIERS.URANUS);
    }
    onNeptune() {
        return this.round(this.earthAge / PLANET_YEAR_MULTIPLIERS.NEPTUNE);
    }
    round(x) {
        return Math.round(x * 100) / 100;
    }
}
exports.default = SpaceAge;
