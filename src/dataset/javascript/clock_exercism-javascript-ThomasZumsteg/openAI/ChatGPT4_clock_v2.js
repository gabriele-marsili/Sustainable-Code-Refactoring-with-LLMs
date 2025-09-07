class Clock {
	constructor(hours, minutes = 0) {
		this.minutes = ((minutes % 60) + 60) % 60;
		this.hours = ((hours + Math.floor(minutes / 60)) % 24 + 24) % 24;
	}
	static at(hour, minutes = 0) {
		return new Clock(hour, minutes);
	}
	minus(minutes) {
		return this.plus(-minutes);
	}
	plus(minutes) {
		return new Clock(this.hours, this.minutes + minutes);
	}
	equals(other) {
		return this.hours === other.hours && this.minutes === other.minutes;
	}
	toString() {
		return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;
	}
}

export default Clock;