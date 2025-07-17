class Clock {
	constructor(hours, minutes) {
		// Keeps track of clock time
		minutes = minutes || 0;
		this.minutes = minutes % 60 + (minutes < 0 ? +60 : 0);
		this.hours = (hours + Math.floor(minutes / 60)) % 24;
		this.hours += this.hours < 0 ? +24 : 0;
	}
	static at(hour, minutes) {
		/* Creates a clock at a time */
		return new Clock(hour, minutes);
	}
	minus(minutes) {
		/* Adds time */
		return new Clock(this.hours, this.minutes - minutes);
	}
	plus(minutes) {
		/* Subtracts time */
		return new Clock(this.hours, this.minutes + minutes);
	}
	equals(other) {
		/* Compares two clocks */
		// Could also compare using the toString method
		return this.hours == other.hours &&
			this.minutes == other.minutes;
	}
	toString() {
		/* Standard 24h clock display */
		// Zero padded
		var hours = ("00" + this.hours).slice(-2);
		var minutes = ("00" + this.minutes).slice(-2);
		return hours + ":" + minutes;
	}
}






export default Clock;;