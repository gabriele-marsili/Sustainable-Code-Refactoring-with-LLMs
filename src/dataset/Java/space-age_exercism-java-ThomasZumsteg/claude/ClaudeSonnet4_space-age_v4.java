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
    private final double earthYears;

    public SpaceAge(Long seconds) {
        this.seconds = seconds;
        this.earthYears = seconds / EARTH_YEAR_SECONDS;
    }

    public SpaceAge(Integer seconds) {
        this.seconds = seconds.longValue();
        this.earthYears = this.seconds / EARTH_YEAR_SECONDS;
    }

    public Long getSeconds() {
        return this.seconds;
    }

    public double onEarth() {
        return this.earthYears;
    }

    public double onMercury() {
        return this.earthYears / MERCURY_RATIO;
    }

    public double onVenus() {
        return this.earthYears / VENUS_RATIO;
    }

    public double onMars() {
        return this.earthYears / MARS_RATIO;
    }

    public double onJupiter() {
        return this.earthYears / JUPITER_RATIO;
    }

    public double onSaturn() {
        return this.earthYears / SATURN_RATIO;
    }

    public double onUranus() {
        return this.earthYears / URANUS_RATIO;
    }

    public double onNeptune() {
        return this.earthYears / NEPTUNE_RATIO;
    }
}