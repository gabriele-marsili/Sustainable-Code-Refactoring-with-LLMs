function SpaceAge(seconds) {
    this.seconds = seconds;
    this.earthYear = 31557600; // seconds
}

SpaceAge.prototype.calculateAge = function (ratio) {
    return parseFloat((this.seconds / (this.earthYear * ratio)).toFixed(2));
};

SpaceAge.prototype.onMercury = function () {
    return this.calculateAge(0.2408467);
};
SpaceAge.prototype.onVenus = function () {
    return this.calculateAge(0.61519726);
};
SpaceAge.prototype.onEarth = function () {
    return this.calculateAge(1.0);
};
SpaceAge.prototype.onMars = function () {
    return this.calculateAge(1.8808158);
};
SpaceAge.prototype.onJupiter = function () {
    return this.calculateAge(11.862615);
};
SpaceAge.prototype.onSaturn = function () {
    return this.calculateAge(29.447498);
};
SpaceAge.prototype.onUranus = function () {
    return this.calculateAge(84.016846);
};
SpaceAge.prototype.onNeptune = function () {
    return this.calculateAge(164.79132);
};

export default SpaceAge;