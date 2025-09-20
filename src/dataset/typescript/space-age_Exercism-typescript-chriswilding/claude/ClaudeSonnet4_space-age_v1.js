"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SECONDS_IN_EARTH_YEAR = 31557600;
const ORBITAL_PERIODS = {
    Mercury: 0.2408467,
    Venus: 0.61519726,
    Earth: 1,
    Mars: 1.8808158,
    Jupiter: 11.862615,
    Saturn: 29.447498,
    Uranus: 84.016846,
    Neptune: 164.79132,
};
class SpaceAge {
    constructor(seconds) {
        this.earthYears = seconds / SECONDS_IN_EARTH_YEAR;
    }
    onMercury() {
        return Math.round((this.earthYears / ORBITAL_PERIODS.Mercury) * 100) / 100;
    }
    onVenus() {
        return Math.round((this.earthYears / ORBITAL_PERIODS.Venus) * 100) / 100;
    }
    onEarth() {
        return Math.round(this.earthYears * 100) / 100;
    }
    onMars() {
        return Math.round((this.earthYears / ORBITAL_PERIODS.Mars) * 100) / 100;
    }
    onJupiter() {
        return Math.round((this.earthYears / ORBITAL_PERIODS.Jupiter) * 100) / 100;
    }
    onSaturn() {
        return Math.round((this.earthYears / ORBITAL_PERIODS.Saturn) * 100) / 100;
    }
    onUranus() {
        return Math.round((this.earthYears / ORBITAL_PERIODS.Uranus) * 100) / 100;
    }
    onNeptune() {
        return Math.round((this.earthYears / ORBITAL_PERIODS.Neptune) * 100) / 100;
    }
}
exports.default = SpaceAge;
