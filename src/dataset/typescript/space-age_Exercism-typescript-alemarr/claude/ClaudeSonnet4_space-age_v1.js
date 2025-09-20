"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.age = void 0;
const SECONDS_IN_YEAR = 31557600;
const planetYearSeconds = {
    earth: 31557600,
    mercury: 7600543.82,
    venus: 19414166.25,
    mars: 59354294.4,
    jupiter: 374335776.36,
    saturn: 929292362.88,
    uranus: 2651370019.36,
    neptune: 5203620608
};
const age = (planet, seconds) => {
    return Math.round((seconds / planetYearSeconds[planet]) * 100) / 100;
};
exports.age = age;
