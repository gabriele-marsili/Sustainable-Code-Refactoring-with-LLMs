// Your age on another planet
function SpaceAge(seconds) { 
    this.seconds = seconds;
    this.earthYear = 31557600; // Cache earth year constant
}

// Pre-calculate ratios to avoid repeated calculations
const PLANET_RATIOS = {
    mercury: 0.2408467,
    venus: 0.61519726,
    earth: 1.0,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
};

// Optimized calculation function
function calculateAge(seconds, earthYear, ratio) {
    const age = seconds / (earthYear * ratio);
    return Math.round(age * 100) / 100; // Faster than parseFloat + toFixed
}

// Direct method implementations for better performance
SpaceAge.prototype.onMercury = function() {
    return calculateAge(this.seconds, this.earthYear, PLANET_RATIOS.mercury);
};

SpaceAge.prototype.onVenus = function() {
    return calculateAge(this.seconds, this.earthYear, PLANET_RATIOS.venus);
};

SpaceAge.prototype.onEarth = function() {
    return calculateAge(this.seconds, this.earthYear, PLANET_RATIOS.earth);
};

SpaceAge.prototype.onMars = function() {
    return calculateAge(this.seconds, this.earthYear, PLANET_RATIOS.mars);
};

SpaceAge.prototype.onJupiter = function() {
    return calculateAge(this.seconds, this.earthYear, PLANET_RATIOS.jupiter);
};

SpaceAge.prototype.onSaturn = function() {
    return calculateAge(this.seconds, this.earthYear, PLANET_RATIOS.saturn);
};

SpaceAge.prototype.onUranus = function() {
    return calculateAge(this.seconds, this.earthYear, PLANET_RATIOS.uranus);
};

SpaceAge.prototype.onNeptune = function() {
    return calculateAge(this.seconds, this.earthYear, PLANET_RATIOS.neptune);
};

export default SpaceAge;