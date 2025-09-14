public class SpaceAge {
    private static final double EARTH_YEAR_SECONDS = 31557600.0;
    private static final double MERCURY_RATIO = 0.2408467;
    private static final double VENUS_RATIO = 0.61519726;
    private static final double MARS_RATIO = 1.8808158;
    private static final double JUPITER_RATIO = 11.862615;
    private static final double SATURN_RATIO = 29.447498;
    private static final double URANUS_RATIO = 84.016846;
    private static final double NEPTUNE_RATIO = 164.79132;
    
    private final long seconds;
    private double earthAge = -1.0;

    public SpaceAge(Long seconds) {
        this.seconds = seconds;
    }

    public SpaceAge(Integer seconds) {
        this.seconds = seconds.longValue();
    }

    public Long getSeconds() {
        return this.seconds;
    }

    public double onEarth() {
        if (earthAge == -1.0) {
            earthAge = this.seconds / EARTH_YEAR_SECONDS;
        }
        return earthAge;
    }

    public double onMercury() {
        return onEarth() / MERCURY_RATIO;
    }

    public double onVenus() {
        return onEarth() / VENUS_RATIO;
    }

    public double onMars() {
        return onEarth() / MARS_RATIO;
    }

    public double onJupiter() {
        return onEarth() / JUPITER_RATIO;
    }

    public double onSaturn() {
        return onEarth() / SATURN_RATIO;
    }

    public double onUranus() {
        return onEarth() / URANUS_RATIO;
    }

    public double onNeptune() {
        return onEarth() / NEPTUNE_RATIO;
    }
}