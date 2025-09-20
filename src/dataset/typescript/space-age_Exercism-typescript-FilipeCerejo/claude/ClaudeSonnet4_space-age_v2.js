"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.age = age;
const OrbitalPeriods = {
    'mercury': 0.2408467,
    'venus': 0.61519726,
    'earth': 1,
    'mars': 1.8808158,
    'jupiter': 11.862615,
    'saturn': 29.447498,
    'uranus': 84.016846,
    'neptune': 164.79132
};
const EARTH_YEAR_SECONDS = 31557600;
const ROUNDING_FACTOR = 100;
function age(planet, seconds) {
    const orbitalPeriod = OrbitalPeriods[planet];
    const ageInYears = seconds / (orbitalPeriod * EARTH_YEAR_SECONDS);
    return Math.round(ageInYears * ROUNDING_FACTOR) / ROUNDING_FACTOR;
}
