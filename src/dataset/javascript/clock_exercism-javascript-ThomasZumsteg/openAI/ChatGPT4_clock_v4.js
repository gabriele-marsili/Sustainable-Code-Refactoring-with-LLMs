class Clock {
	constructor(hours, minutes = 0) {
		const totalMinutes = (hours * 60 + minutes) % 1440;
		const adjustedMinutes = totalMinutes < 0 ? totalMinutes + 1440 : totalMinutes;
		this.hours = Math.floor(adjustedMinutes / 60);
		this.minutes = adjustedMinutes % 60;
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
		return `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}`;
	}
}

export default Clock;