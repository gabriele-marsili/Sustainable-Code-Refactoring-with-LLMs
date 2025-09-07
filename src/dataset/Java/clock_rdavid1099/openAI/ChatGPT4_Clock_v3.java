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
        int totalMinutes = (hour * 60 + min) % 1440;
        if (totalMinutes < 0) totalMinutes += 1440;
        rawHour = totalMinutes / 60;
        rawMin = totalMinutes % 60;
    }
}