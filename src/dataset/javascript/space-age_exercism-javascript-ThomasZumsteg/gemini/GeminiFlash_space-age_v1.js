// Your age on another planet
function SpaceAge(seconds) { this.seconds = seconds }

const earthYearInSeconds = 31557600;

SpaceAge.prototype.onMercury = function() {
    return parseFloat((this.seconds / (earthYearInSeconds * 0.2408467)).toFixed(2));
};

SpaceAge.prototype.onVenus = function() {
    return parseFloat((this.seconds / (earthYearInSeconds * 0.61519726)).toFixed(2));
};

SpaceAge.prototype.onEarth = function() {
    return parseFloat((this.seconds / earthYearInSeconds).toFixed(2));
};

SpaceAge.prototype.onMars = function() {
    return parseFloat((this.seconds / (earthYearInSeconds * 1.8808158)).toFixed(2));
};

SpaceAge.prototype.onJupiter = function() {
    return parseFloat((this.seconds / (earthYearInSeconds * 11.862615)).toFixed(2));
};

SpaceAge.prototype.onSaturn = function() {
    return parseFloat((this.seconds / (earthYearInSeconds * 29.447498)).toFixed(2));
};

SpaceAge.prototype.onUranus = function() {
    return parseFloat((this.seconds / (earthYearInSeconds * 84.016846)).toFixed(2));
};

SpaceAge.prototype.onNeptune = function() {
    return parseFloat((this.seconds / (earthYearInSeconds * 164.79132)).toFixed(2));
};

export default SpaceAge;