"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.age = void 0;
const SECONDS_IN_YEAR = 31557600;
const planetYearSeconds = {
    earth: 31557600,
    mercury: 7600543.82,
    venus: 19414166.18,
    mars: 59354032.69,
    jupiter: 374355659.12,
    saturn: 929292362.88,
    uranus: 2651370019.33,
    neptune: 5203039608.96
};
const age = (planet, seconds) => {
    return Math.round((seconds / planetYearSeconds[planet]) * 100) / 100;
};
exports.age = age;
