class Clock {
	constructor(hours, minutes = 0) {
		const totalMinutes = (hours * 60 + minutes) % 1440;
		this.hours = ((Math.floor(totalMinutes / 60) + 24) % 24);
		this.minutes = ((totalMinutes % 60) + 60) % 60;
	}
	static at(hour, minutes) {
		return new Clock(hour, minutes);
	}
	minus(minutes) {
		return new Clock(this.hours, this.minutes - minutes);
	}
	plus(minutes) {
		return new Clock(this.hours, this.minutes + minutes);
	}
	equals(other) {
		return this.hours === other.hours && this.minutes === other.minutes;
	}
	toString() {
		return `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}`;
	}
}

export default Clock;