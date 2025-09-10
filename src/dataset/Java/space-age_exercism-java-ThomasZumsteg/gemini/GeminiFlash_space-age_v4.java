public class SpaceAge {
    private final long seconds;
    private static final double EARTH_YEAR_IN_SECONDS = 31557600.0;
    private static final double MERCURY_ORBITAL_PERIOD = 0.2408467;
    private static final double VENUS_ORBITAL_PERIOD = 0.61519726;
    private static final double MARS_ORBITAL_PERIOD = 1.8808158;
    private static final double JUPITER_ORBITAL_PERIOD = 11.862615;
    private static final double SATURN_ORBITAL_PERIOD = 29.447498;
    private static final double URANUS_ORBITAL_PERIOD = 84.016846;
    private static final double NEPTUNE_ORBITAL_PERIOD = 164.79132;

    public SpaceAge(long seconds) {
        this.seconds = seconds;
    }

    public SpaceAge(int seconds) {
        this((long) seconds);
    }

    public long getSeconds() {
        return seconds;
    }

    public double onEarth() {
        return seconds / EARTH_YEAR_IN_SECONDS;
    }

    public double onMercury() {
        return onEarth() / MERCURY_ORBITAL_PERIOD;
    }

    public double onVenus() {
        return onEarth() / VENUS_ORBITAL_PERIOD;
    }

    public double onMars() {
        return onEarth() / MARS_ORBITAL_PERIOD;
    }

    public double onJupiter() {
        return onEarth() / JUPITER_ORBITAL_PERIOD;
    }

    public double onSaturn() {
        return onEarth() / SATURN_ORBITAL_PERIOD;
    }

    public double onUranus() {
        return onEarth() / URANUS_ORBITAL_PERIOD;
    }

    public double onNeptune() {
        return onEarth() / NEPTUNE_ORBITAL_PERIOD;
    }
}