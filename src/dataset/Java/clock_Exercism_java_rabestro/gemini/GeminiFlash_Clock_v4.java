import static java.lang.Math.floorMod;

public final class Clock {
    public static final int MINUTES_PER_HOUR = 60;
    public static final int MINUTES_PER_DAY = 1440;
    private int totalMinutes;

    public Clock(int hours, int minutes) {
        totalMinutes = floorMod(hours * MINUTES_PER_HOUR + minutes, MINUTES_PER_DAY);
    }

    public void add(int minutes) {
        totalMinutes = floorMod(totalMinutes + minutes, MINUTES_PER_DAY);
    }

    @Override
    public String toString() {
        int hours = totalMinutes / MINUTES_PER_HOUR;
        int minutes = totalMinutes - hours * MINUTES_PER_HOUR;
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