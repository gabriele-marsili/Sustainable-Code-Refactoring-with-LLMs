// milliseconds 
const GIGASECOND = 1000000000000;

class Gigasecond {
	constructor(day) {
		/* Adds a gigasecond (10^9 seconds) to a date */
		this.day = day;
	}

	// The date a gigasecond later
	date() { 
		return new Date(this.day.getTime() + GIGASECOND);
	}
}

export default Gigasecond;