"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.age = age;
const OrbitalPeriodsInEarthYears = {
    'mercury': 0.2408467,
    'venus': 0.61519726,
    'earth': 1,
    'mars': 1.8808158,
    'jupiter': 11.862615,
    'saturn': 29.447498,
    'uranus': 84.016846,
    'neptune': 164.79132
};
const earthYearInSeconds = 31557600;
function age(planet, seconds) {
    const orbitalPeriodInEarthYears = OrbitalPeriodsInEarthYears[planet];
    return Math.round(seconds * 100 / (orbitalPeriodInEarthYears * earthYearInSeconds)) / 100;
}
