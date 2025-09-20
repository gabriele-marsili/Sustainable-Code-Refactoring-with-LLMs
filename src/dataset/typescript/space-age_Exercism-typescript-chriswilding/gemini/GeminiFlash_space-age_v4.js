"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SECONDS_IN_EARTH_YEAR = 31557600;
var ObitalPeriod;
(function (ObitalPeriod) {
    ObitalPeriod[ObitalPeriod["Earth"] = 1] = "Earth";
    ObitalPeriod[ObitalPeriod["Mercury"] = 0.2408467] = "Mercury";
    ObitalPeriod[ObitalPeriod["Venus"] = 0.61519726] = "Venus";
    ObitalPeriod[ObitalPeriod["Mars"] = 1.8808158] = "Mars";
    ObitalPeriod[ObitalPeriod["Jupiter"] = 11.862615] = "Jupiter";
    ObitalPeriod[ObitalPeriod["Saturn"] = 29.447498] = "Saturn";
    ObitalPeriod[ObitalPeriod["Uranus"] = 84.016846] = "Uranus";
    ObitalPeriod[ObitalPeriod["Neptune"] = 164.79132] = "Neptune";
})(ObitalPeriod || (ObitalPeriod = {}));
const orbitalPeriodValues = {
    [ObitalPeriod.Mercury]: ObitalPeriod.Mercury * SECONDS_IN_EARTH_YEAR,
    [ObitalPeriod.Venus]: ObitalPeriod.Venus * SECONDS_IN_EARTH_YEAR,
    [ObitalPeriod.Earth]: ObitalPeriod.Earth * SECONDS_IN_EARTH_YEAR,
    [ObitalPeriod.Mars]: ObitalPeriod.Mars * SECONDS_IN_EARTH_YEAR,
    [ObitalPeriod.Jupiter]: ObitalPeriod.Jupiter * SECONDS_IN_EARTH_YEAR,
    [ObitalPeriod.Saturn]: ObitalPeriod.Saturn * SECONDS_IN_EARTH_YEAR,
    [ObitalPeriod.Uranus]: ObitalPeriod.Uranus * SECONDS_IN_EARTH_YEAR,
    [ObitalPeriod.Neptune]: ObitalPeriod.Neptune * SECONDS_IN_EARTH_YEAR,
};
function calculate(orbitalPeriod, seconds) {
    const periodInSeconds = orbitalPeriodValues[orbitalPeriod];
    const n = seconds / periodInSeconds;
    return Math.round(n * 100) / 100;
}
class SpaceAge {
    constructor(seconds) {
        this.seconds = seconds;
        this.earthAge = calculate(ObitalPeriod.Earth, this.seconds);
        this.mercuryAge = calculate(ObitalPeriod.Mercury, this.seconds);
        this.venusAge = calculate(ObitalPeriod.Venus, this.seconds);
        this.marsAge = calculate(ObitalPeriod.Mars, this.seconds);
        this.jupiterAge = calculate(ObitalPeriod.Jupiter, this.seconds);
        this.saturnAge = calculate(ObitalPeriod.Saturn, this.seconds);
        this.uranusAge = calculate(ObitalPeriod.Uranus, this.seconds);
        this.neptuneAge = calculate(ObitalPeriod.Neptune, this.seconds);
    }
    onMercury() {
        return this.mercuryAge;
    }
    onVenus() {
        return this.venusAge;
    }
    onEarth() {
        return this.earthAge;
    }
    onMars() {
        return this.marsAge;
    }
    onJupiter() {
        return this.jupiterAge;
    }
    onSaturn() {
        return this.saturnAge;
    }
    onUranus() {
        return this.uranusAge;
    }
    onNeptune() {
        return this.neptuneAge;
    }
}
exports.default = SpaceAge;
