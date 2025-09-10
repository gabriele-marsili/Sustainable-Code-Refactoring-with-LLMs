public class SpaceAge {
    private final double seconds;
    private static final double EARTH_YEAR_IN_SECONDS = 31557600.0;

    public SpaceAge(Long seconds) {
        this.seconds = seconds;
    }

    public SpaceAge(Integer seconds) {
        this.seconds = seconds;
    }

    public Long getSeconds() {
        return (long) seconds;
    }

    public double onEarth() {
        return seconds / EARTH_YEAR_IN_SECONDS;
    }

    public double onMercury() {
        return seconds / (EARTH_YEAR_IN_SECONDS * 0.2408467);
    }

    public double onVenus() {
        return seconds / (EARTH_YEAR_IN_SECONDS * 0.61519726);
    }

    public double onMars() {
        return seconds / (EARTH_YEAR_IN_SECONDS * 1.8808158);
    }

    public double onJupiter() {
        return seconds / (EARTH_YEAR_IN_SECONDS * 11.862615);
    }

    public double onSaturn() {
        return seconds / (EARTH_YEAR_IN_SECONDS * 29.447498);
    }

    public double onUranus() {
        return seconds / (EARTH_YEAR_IN_SECONDS * 84.016846);
    }

    public double onNeptune() {
        return seconds / (EARTH_YEAR_IN_SECONDS * 164.79132);
    }
}