function SpaceAge(seconds) { 
    this.seconds = seconds;
}

const EARTH_YEAR = 31557600;
const PLANET_RATIOS = {
    Mercury: 0.2408467,
    Venus: 0.61519726,
    Earth: 1.0,
    Mars: 1.8808158,
    Jupiter: 11.862615,
    Saturn: 29.447498,
    Uranus: 84.016846,
    Neptune: 164.79132
};

function calculateAge(seconds, ratio) {
    return Math.round((seconds / (EARTH_YEAR * ratio)) * 100) / 100;
}

SpaceAge.prototype.onMercury = function() {
    return calculateAge(this.seconds, PLANET_RATIOS.Mercury);
};

SpaceAge.prototype.onVenus = function() {
    return calculateAge(this.seconds, PLANET_RATIOS.Venus);
};

SpaceAge.prototype.onEarth = function() {
    return calculateAge(this.seconds, PLANET_RATIOS.Earth);
};

SpaceAge.prototype.onMars = function() {
    return calculateAge(this.seconds, PLANET_RATIOS.Mars);
};

SpaceAge.prototype.onJupiter = function() {
    return calculateAge(this.seconds, PLANET_RATIOS.Jupiter);
};

SpaceAge.prototype.onSaturn = function() {
    return calculateAge(this.seconds, PLANET_RATIOS.Saturn);
};

SpaceAge.prototype.onUranus = function() {
    return calculateAge(this.seconds, PLANET_RATIOS.Uranus);
};

SpaceAge.prototype.onNeptune = function() {
    return calculateAge(this.seconds, PLANET_RATIOS.Neptune);
};

export default SpaceAge;