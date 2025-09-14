// Your age on another planet
function SpaceAge(seconds) { 
    this.seconds = seconds;
    this.earthYear = 31557600; // Cache earth year constant
}

// Pre-calculate division factors to avoid repeated multiplication
const PLANET_FACTORS = {
    mercury: 31557600 * 0.2408467,
    venus: 31557600 * 0.61519726,
    earth: 31557600,
    mars: 31557600 * 1.8808158,
    jupiter: 31557600 * 11.862615,
    saturn: 31557600 * 29.447498,
    uranus: 31557600 * 84.016846,
    neptune: 31557600 * 164.79132
};

function calculateAge(seconds, factor) {
    return Math.round((seconds / factor) * 100) / 100;
}

SpaceAge.prototype.onMercury = function() { return calculateAge(this.seconds, PLANET_FACTORS.mercury); };
SpaceAge.prototype.onVenus = function() { return calculateAge(this.seconds, PLANET_FACTORS.venus); };
SpaceAge.prototype.onEarth = function() { return calculateAge(this.seconds, PLANET_FACTORS.earth); };
SpaceAge.prototype.onMars = function() { return calculateAge(this.seconds, PLANET_FACTORS.mars); };
SpaceAge.prototype.onJupiter = function() { return calculateAge(this.seconds, PLANET_FACTORS.jupiter); };
SpaceAge.prototype.onSaturn = function() { return calculateAge(this.seconds, PLANET_FACTORS.saturn); };
SpaceAge.prototype.onUranus = function() { return calculateAge(this.seconds, PLANET_FACTORS.uranus); };
SpaceAge.prototype.onNeptune = function() { return calculateAge(this.seconds, PLANET_FACTORS.neptune); };

export default SpaceAge;