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
        this.earthAge = seconds / EARTH_YEAR_IN_SECONDS;
    }
    onEarth() {
        return round(this.earthAge);
    }
    onMercury() {
        return this.onPlanet(planetYearRatios.mercury);
    }
    onVenus() {
        return this.onPlanet(planetYearRatios.venus);
    }
    onMars() {
        return this.onPlanet(planetYearRatios.mars);
    }
    onJupiter() {
        return this.onPlanet(planetYearRatios.jupiter);
    }
    onSaturn() {
        return this.onPlanet(planetYearRatios.saturn);
    }
    onUranus() {
        return this.onPlanet(planetYearRatios.uranus);
    }
    onNeptune() {
        return this.onPlanet(planetYearRatios.neptune);
    }
    onPlanet(yearRatio) {
        return round(this.earthAge / yearRatio);
    }
}
exports.default = SpaceAge;
function round(x) {
    return Math.round(x * 100) / 100;
}
