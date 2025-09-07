class Clock {
    private int rawHour, rawMin;
    private String cachedToString;

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
        if (cachedToString == null) {
            cachedToString = formatNum(rawHour) + ":" + formatNum(rawMin);
        }
        return cachedToString;
    }

    void add(int minutes) {
        calculateTimeOnClock(rawHour, rawMin + minutes);
        cachedToString = null;
    }

    private void calculateTimeOnClock(int hour, int min) {
        int totalMinutes = hour * 60 + min;
        totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;
        rawHour = totalMinutes / 60;
        rawMin = totalMinutes % 60;
    }

    private String formatNum(int rawNum) {
        return rawNum < 10 ? "0" + rawNum : Integer.toString(rawNum);
    }
}