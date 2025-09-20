"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    onPlanet(ratio) {
        return parseFloat((this.seconds / (SpaceAge.EARTH_YEAR * ratio)).toFixed(2));
    }
    onEarth() {
        return parseFloat((this.seconds / SpaceAge.EARTH_YEAR).toFixed(2));
    }
    onMercury() {
        return this.onPlanet(SpaceAge.YEAR_RATIOS.mercury);
    }
    onVenus() {
        return this.onPlanet(SpaceAge.YEAR_RATIOS.venus);
    }
    onMars() {
        return this.onPlanet(SpaceAge.YEAR_RATIOS.mars);
    }
    onJupiter() {
        return this.onPlanet(SpaceAge.YEAR_RATIOS.jupiter);
    }
    onSaturn() {
        return this.onPlanet(SpaceAge.YEAR_RATIOS.saturn);
    }
    onUranus() {
        return this.onPlanet(SpaceAge.YEAR_RATIOS.uranus);
    }
    onNeptune() {
        return this.onPlanet(SpaceAge.YEAR_RATIOS.neptune);
    }
}
SpaceAge.EARTH_YEAR = 31557600;
SpaceAge.YEAR_RATIOS = {
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132,
};
exports.default = SpaceAge;
