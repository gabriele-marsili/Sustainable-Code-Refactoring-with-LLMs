"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.age = void 0;
const SECONDS_IN_YEAR = 31557600;
const planetSeconds = {
    earth: SECONDS_IN_YEAR,
    mercury: SECONDS_IN_YEAR * 0.2408467,
    venus: SECONDS_IN_YEAR * 0.61519726,
    mars: SECONDS_IN_YEAR * 1.8808158,
    jupiter: SECONDS_IN_YEAR * 11.862615,
    saturn: SECONDS_IN_YEAR * 29.447498,
    uranus: SECONDS_IN_YEAR * 84.016846,
    neptune: SECONDS_IN_YEAR * 164.79132
};
const age = (planet, seconds) => Math.round((seconds / planetSeconds[planet]) * 100) / 100;
exports.age = age;
