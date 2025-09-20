"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
    }
    calculateAge(planet) {
        return Math.round((this.seconds / SpaceAge.PLANET_YEARS[planet]) * 100) / 100;
    }
    onEarth() {
        return this.calculateAge("Earth");
    }
    onMercury() {
        return this.calculateAge("Mercury");
    }
    onVenus() {
        return this.calculateAge("Venus");
    }
    onMars() {
        return this.calculateAge("Mars");
    }
    onJupiter() {
        return this.calculateAge("Jupiter");
    }
    onSaturn() {
        return this.calculateAge("Saturn");
    }
    onUranus() {
        return this.calculateAge("Uranus");
    }
    onNeptune() {
        return this.calculateAge("Neptune");
    }
}
SpaceAge.PLANET_YEARS = {
    Earth: 31557600,
    Mercury: 31557600 * 0.2408467,
    Venus: 31557600 * 0.61519726,
    Mars: 31557600 * 1.8808158,
    Jupiter: 31557600 * 11.862615,
    Saturn: 31557600 * 29.447498,
    Uranus: 31557600 * 84.016846,
    Neptune: 31557600 * 164.79132,
};
exports.default = SpaceAge;
