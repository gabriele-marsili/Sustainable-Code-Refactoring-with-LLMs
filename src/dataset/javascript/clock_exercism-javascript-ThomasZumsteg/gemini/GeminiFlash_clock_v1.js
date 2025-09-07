class Clock {
    constructor(hours, minutes) {
        minutes = minutes || 0;
        let totalMinutes = (hours * 60 + minutes) % 1440;
        if (totalMinutes < 0) {
            totalMinutes += 1440;
        }
        this.hours = Math.floor(totalMinutes / 60);
        this.minutes = totalMinutes % 60;
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
        const hours = String(this.hours).padStart(2, '0');
        const minutes = String(this.minutes).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}

export default Clock;