"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.age = void 0;
const SECONDS_IN_YEAR = 31557600;
const planets = Object.freeze({
    earth: SECONDS_IN_YEAR,
    mercury: 0.2408467 * SECONDS_IN_YEAR,
    venus: 0.61519726 * SECONDS_IN_YEAR,
    mars: 1.8808158 * SECONDS_IN_YEAR,
    jupiter: 11.862615 * SECONDS_IN_YEAR,
    saturn: 29.447498 * SECONDS_IN_YEAR,
    uranus: 84.016846 * SECONDS_IN_YEAR,
    neptune: 164.79132 * SECONDS_IN_YEAR
});
const age = (planet, seconds) => {
    return Math.round((seconds / planets[planet]) * 100) / 100;
};
exports.age = age;
