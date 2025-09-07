public final class Clock {
    public static final int MINUTES_PER_HOUR = 60;
    public static final int MINUTES_PER_DAY = 1440; // Pre-calculated 24 * 60
    private int totalMinutes;

    public Clock(int hours, int minutes) {
        int total = hours * MINUTES_PER_HOUR + minutes;
        totalMinutes = ((total % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    }

    public void add(int minutes) {
        totalMinutes = (totalMinutes + minutes % MINUTES_PER_DAY + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    }

    @Override
    public String toString() {
        int hours = totalMinutes / MINUTES_PER_HOUR;
        int minutes = totalMinutes % MINUTES_PER_HOUR;
        return String.format("%02d:%02d", hours, minutes);
    }

    @Override
    public boolean equals(Object o) {
        return this == o || (o instanceof Clock that && this.totalMinutes == that.totalMinutes);
    }

    @Override
    public int hashCode() {
        return totalMinutes;
    }
}