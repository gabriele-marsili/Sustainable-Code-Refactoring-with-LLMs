class Clock {
    private int hour, minute;

    Clock(int hour, int minute) {
        setTime(hour, minute);
    }

    public String toString() {
        return String.format("%02d:%02d", hour, minute);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Clock)) return false;
        Clock compare = (Clock) o;
        return this.hour == compare.hour && this.minute == compare.minute;
    }

    void add(int minutes) {
        setTime(this.hour, this.minute + minutes);
    }

    private void setTime(int hour, int minute) {
        int totalMinutes = hour * 60 + minute;
        totalMinutes = Math.floorMod(totalMinutes, 24 * 60);
        this.hour = totalMinutes / 60;
        this.minute = totalMinutes % 60;
    }
}