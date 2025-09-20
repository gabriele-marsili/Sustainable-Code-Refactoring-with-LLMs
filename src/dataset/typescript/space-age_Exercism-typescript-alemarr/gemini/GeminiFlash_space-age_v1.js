"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.age = void 0;
const SECONDS_IN_YEAR = 31557600;
const orbitalPeriods = {
    earth: 1,
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
};
const planetYearsInSeconds = Object.entries(orbitalPeriods).reduce((acc, [planet, period]) => {
    acc[planet] = period * SECONDS_IN_YEAR;
    return acc;
}, {});
const age = (planet, seconds) => {
    const ageInPlanetYears = seconds / planetYearsInSeconds[planet];
    return Math.round(ageInPlanetYears * 100) / 100;
};
exports.age = age;
