"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    calculateAge(ratio) {
        return Math.round((this.seconds / (SpaceAge.EARTH_YEAR * ratio)) * 100) / 100;
    }
    onEarth() {
        return this.calculateAge(SpaceAge.PLANET_RATIOS.earth);
    }
    onMercury() {
        return this.calculateAge(SpaceAge.PLANET_RATIOS.mercury);
    }
    onVenus() {
        return this.calculateAge(SpaceAge.PLANET_RATIOS.venus);
    }
    onMars() {
        return this.calculateAge(SpaceAge.PLANET_RATIOS.mars);
    }
    onJupiter() {
        return this.calculateAge(SpaceAge.PLANET_RATIOS.jupiter);
    }
    onSaturn() {
        return this.calculateAge(SpaceAge.PLANET_RATIOS.saturn);
    }
    onUranus() {
        return this.calculateAge(SpaceAge.PLANET_RATIOS.uranus);
    }
    onNeptune() {
        return this.calculateAge(SpaceAge.PLANET_RATIOS.neptune);
    }
}
SpaceAge.EARTH_YEAR = 31557600;
SpaceAge.PLANET_RATIOS = {
    earth: 1,
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
};
exports.default = SpaceAge;
