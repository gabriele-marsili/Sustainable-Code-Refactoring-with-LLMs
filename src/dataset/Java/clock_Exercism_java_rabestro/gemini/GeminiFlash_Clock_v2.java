public final class Clock {
    private static final int MINUTES_PER_HOUR = 60;
    private static final int MINUTES_PER_DAY = 1440;
    private final int totalMinutes;

    public Clock(int hours, int minutes) {
        totalMinutes = normalizeMinutes(hours * MINUTES_PER_HOUR + minutes);
    }

    private Clock(int totalMinutes) {
        this.totalMinutes = totalMinutes;
    }


    public Clock add(int minutes) {
        return new Clock(normalizeMinutes(this.totalMinutes + minutes));
    }

    private static int normalizeMinutes(int totalMinutes) {
        int normalizedMinutes = totalMinutes % MINUTES_PER_DAY;
        return normalizedMinutes < 0 ? normalizedMinutes + MINUTES_PER_DAY : normalizedMinutes;
    }

    @Override
    public String toString() {
        int hours = totalMinutes / MINUTES_PER_HOUR;
        int minutes = totalMinutes % MINUTES_PER_HOUR;
        return String.format("%02d:%02d", hours, minutes);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Clock clock = (Clock) o;
        return totalMinutes == clock.totalMinutes;
    }

    @Override
    public int hashCode() {
        return totalMinutes;
    }
}