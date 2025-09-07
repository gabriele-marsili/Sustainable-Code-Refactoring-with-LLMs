class Clock {
    private int rawHour, rawMin;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Clock)) return false;
        Clock compare = (Clock) o;
        return rawHour == compare.rawHour && rawMin == compare.rawMin;
    }

    Clock(int hour, int min) {
        calculateTimeOnClock(hour, min);
    }

    public String toString() {
        return String.format("%02d:%02d", rawHour, rawMin);
    }

    void add(int minutes) {
        calculateTimeOnClock(rawHour, rawMin + minutes);
    }

    private void calculateTimeOnClock(int hour, int min) {
        rawMin = ((min % 60) + 60) % 60;
        rawHour = ((hour + (min / 60) + (min < 0 && rawMin > 0 ? -1 : 0)) % 24 + 24) % 24;
    }
}