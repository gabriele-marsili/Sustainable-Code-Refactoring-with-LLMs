class Clock {
	constructor(hours, minutes = 0) {
		const totalMinutes = hours * 60 + minutes;
		const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
		this.hours = Math.floor(normalizedMinutes / 60);
		this.minutes = normalizedMinutes % 60;
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
		return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;
	}
}

export default Clock;