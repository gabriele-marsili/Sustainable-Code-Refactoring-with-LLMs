import static java.lang.Math.floorMod;

public final class Clock {
    public static final int MINUTES_PER_HOUR = 60;
    public static final int MINUTES_PER_DAY = 1440; // Inline constant for clarity and efficiency
    private final int totalMinutes;

    public Clock(int hours, int minutes) {
        totalMinutes = (hours * MINUTES_PER_HOUR + minutes) % MINUTES_PER_DAY;
        if (totalMinutes < 0) totalMinutes += MINUTES_PER_DAY;
    }

    public Clock add(int minutes) {
        int newTotalMinutes = (totalMinutes + minutes) % MINUTES_PER_DAY;
        if (newTotalMinutes < 0) newTotalMinutes += MINUTES_PER_DAY;
        return new Clock(0, newTotalMinutes);
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