class Clock {
    private int rawHour, rawMin, addHours = 0;
    private String hour, minute;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Clock)) return false;
        Clock compare = (Clock) o;
        return toString().equals(compare.toString());
    }

    Clock(int hour, int min) {
        calculateTimeOnClock(hour, min);
    }

    public String toString() {
        convertRawTime();
        return hour + ":" + minute;
    }

    void add(int minutes) {
        calculateTimeOnClock(rawHour, rawMin + minutes);
    }

    private void calculateTimeOnClock(int hour, int min) {
        addHours = (min >= 0) ? min / 60 : (-60 + min) / 60;
        rawMin = calcRolloverTime(min, 60) % 60;
        rawHour = calcRolloverTime(hour + addHours, 24) % 24;
    }

    private void convertRawTime() {
        hour   = formatNum(rawHour);
        minute = formatNum(rawMin);
    }

    private String formatNum(int rawNum) {
        String displayNum = Integer.toString(rawNum);
        return (rawNum < 10) ? "0" + displayNum : displayNum;
    }

    private int calcRolloverTime(int initTime, int amount) {
        return (initTime >= 0) ? initTime % amount : amount + (initTime % amount);
    }
}
