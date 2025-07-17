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
function age(planet, seconds) {
    const planetAge = seconds / (OrbitalPeriod[planet] * EARTH_SECONDS_PER_YEAR);
    const planteAge2Dec = Math.round((planetAge + Number.EPSILON) * 100) / 100;
    return planteAge2Dec;
}
