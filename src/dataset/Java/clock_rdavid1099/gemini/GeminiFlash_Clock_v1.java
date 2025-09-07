class Clock {
    private int hour, minute;

    Clock(int hour, int minute) {
        this.hour = normalizeHour(hour, minute);
        this.minute = normalizeMinute(minute);
    }

    public String toString() {
        return String.format("%02d:%02d", hour, minute);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Clock clock = (Clock) o;
        return hour == clock.hour && minute == clock.minute;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + hour;
        result = 31 * result + minute;
        return result;
    }

    void add(int minutes) {
        int totalMinutes = this.hour * 60 + this.minute + minutes;
        this.hour = normalizeHour(0, totalMinutes);
        this.minute = normalizeMinute(totalMinutes);
    }

    private int normalizeHour(int hour, int minute) {
        int totalHours = (hour + minute / 60) % 24;
        if (totalHours < 0) {
            totalHours += 24;
        }
        return totalHours;
    }

    private int normalizeMinute(int minute) {
        int normalizedMinute = minute % 60;
        if (normalizedMinute < 0) {
            normalizedMinute += 60;
        }
        return normalizedMinute;
    }
}