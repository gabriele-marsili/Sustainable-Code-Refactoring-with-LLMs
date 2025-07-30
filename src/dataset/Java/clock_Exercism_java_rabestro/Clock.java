import static java.lang.Math.floorMod;

public final class Clock {
    public static final int MINUTES_PER_HOUR = 60;
    public static final int MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR;
    private int totalMinutes;

    public Clock(int hours, int minutes) {
        totalMinutes = floorMod(hours * MINUTES_PER_HOUR + minutes, MINUTES_PER_DAY);
    }

    public void add(int minutes) {
        totalMinutes = floorMod(totalMinutes + minutes, MINUTES_PER_DAY);
    }

    @Override
    public String toString() {
        var hours = totalMinutes / MINUTES_PER_HOUR;
        var minutes = totalMinutes % MINUTES_PER_HOUR;
        return "%02d:%02d".formatted(hours, minutes);
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
