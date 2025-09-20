"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.age = age;
var OrbitalPeriod;
(function (OrbitalPeriod) {
    OrbitalPeriod[OrbitalPeriod["mercury"] = 0.2408467] = "mercury";
    OrbitalPeriod[OrbitalPeriod["venus"] = 0.61519726] = "venus";
    OrbitalPeriod[OrbitalPeriod["earth"] = 1] = "earth";
    OrbitalPeriod[OrbitalPeriod["mars"] = 1.8808158] = "mars";
    OrbitalPeriod[OrbitalPeriod["jupiter"] = 11.862615] = "jupiter";
    OrbitalPeriod[OrbitalPeriod["saturn"] = 29.447498] = "saturn";
    OrbitalPeriod[OrbitalPeriod["uranus"] = 84.016846] = "uranus";
    OrbitalPeriod[OrbitalPeriod["neptune"] = 164.79132] = "neptune";
})(OrbitalPeriod || (OrbitalPeriod = {}));
const EARTH_SECONDS_PER_YEAR = 31557600;
// Pre-compute orbital periods in seconds to avoid repeated multiplication
const ORBITAL_PERIODS_SECONDS = {
    mercury: OrbitalPeriod.mercury * EARTH_SECONDS_PER_YEAR,
    venus: OrbitalPeriod.venus * EARTH_SECONDS_PER_YEAR,
    earth: OrbitalPeriod.earth * EARTH_SECONDS_PER_YEAR,
    mars: OrbitalPeriod.mars * EARTH_SECONDS_PER_YEAR,
    jupiter: OrbitalPeriod.jupiter * EARTH_SECONDS_PER_YEAR,
    saturn: OrbitalPeriod.saturn * EARTH_SECONDS_PER_YEAR,
    uranus: OrbitalPeriod.uranus * EARTH_SECONDS_PER_YEAR,
    neptune: OrbitalPeriod.neptune * EARTH_SECONDS_PER_YEAR
};
function age(planet, seconds) {
    const planetAge = seconds / ORBITAL_PERIODS_SECONDS[planet];
    return Math.round(planetAge * 100) / 100;
}
