"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EARTH_YEAR_IN_SECONDS = 31557600;
const PLANET_YEAR_LENGTHS = {
    Earth: 1.0,
    Mercury: 0.2408467,
    Venus: 0.61519726,
    Mars: 1.8808158,
    Jupiter: 11.862615,
    Saturn: 29.447498,
    Uranus: 84.016846,
    Neptune: 164.79132,
};
class SpaceAge {
    constructor(seconds) {
        this.onEarth = () => this.calculateAge("Earth");
        this.onMercury = () => this.calculateAge("Mercury");
        this.onVenus = () => this.calculateAge("Venus");
        this.onMars = () => this.calculateAge("Mars");
        this.onJupiter = () => this.calculateAge("Jupiter");
        this.onSaturn = () => this.calculateAge("Saturn");
        this.onUranus = () => this.calculateAge("Uranus");
        this.onNeptune = () => this.calculateAge("Neptune");
        this.seconds = seconds;
    }
    calculateAge(planet) {
        return Math.round((this.seconds / (PLANET_YEAR_LENGTHS[planet] * EARTH_YEAR_IN_SECONDS)) * 100) / 100;
    }
}
exports.default = SpaceAge;
