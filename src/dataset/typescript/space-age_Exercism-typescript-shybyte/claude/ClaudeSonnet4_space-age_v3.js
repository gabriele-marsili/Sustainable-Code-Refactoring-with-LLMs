"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EARTH_YEAR_IN_SECONDS = 31557600;
const PLANET_YEAR_MULTIPLIERS = {
    earth: 1.0,
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
};
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
        this.earthAge = seconds / EARTH_YEAR_IN_SECONDS;
    }
    onEarth() {
        return this.onPlanetWithYearLength(PLANET_YEAR_MULTIPLIERS.earth);
    }
    onMercury() {
        return this.onPlanetWithYearLength(PLANET_YEAR_MULTIPLIERS.mercury);
    }
    onVenus() {
        return this.onPlanetWithYearLength(PLANET_YEAR_MULTIPLIERS.venus);
    }
    onMars() {
        return this.onPlanetWithYearLength(PLANET_YEAR_MULTIPLIERS.mars);
    }
    onJupiter() {
        return this.onPlanetWithYearLength(PLANET_YEAR_MULTIPLIERS.jupiter);
    }
    onSaturn() {
        return this.onPlanetWithYearLength(PLANET_YEAR_MULTIPLIERS.saturn);
    }
    onUranus() {
        return this.onPlanetWithYearLength(PLANET_YEAR_MULTIPLIERS.uranus);
    }
    onNeptune() {
        return this.onPlanetWithYearLength(PLANET_YEAR_MULTIPLIERS.neptune);
    }
    onPlanetWithYearLength(earthYears) {
        return Math.round((this.earthAge / earthYears) * 100) / 100;
    }
}
exports.default = SpaceAge;
