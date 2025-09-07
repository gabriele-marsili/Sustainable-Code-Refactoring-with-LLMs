class Clock {
	constructor(hours, minutes = 0) {
		const totalMinutes = (hours * 60 + minutes) % 1440;
		this.minutes = (totalMinutes + 1440) % 60;
		this.hours = Math.floor((totalMinutes + 1440) / 60) % 24;
	}
	static at(hour, minutes) {
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