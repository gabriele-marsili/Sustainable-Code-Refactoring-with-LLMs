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
const planetYears = Object.fromEntries(Object.entries(orbitalPeriods).map(([planet, period]) => [planet, period * SECONDS_IN_YEAR]));
const age = (planet, seconds) => {
    const planetSecond = planetYears[planet];
    return Math.round((seconds / planetSecond) * 100) / 100;
};
exports.age = age;
