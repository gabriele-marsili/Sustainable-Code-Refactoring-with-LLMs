class SpaceAge {
    private final double seconds;
    private static final double EARTH_YEAR_SECONDS = 31557600.0;
    private static final double MERCURY_YEAR_RATIO = 0.2408467;
    private static final double VENUS_YEAR_RATIO = 0.61519726;
    private static final double MARS_YEAR_RATIO = 1.8808158;
    private static final double JUPITER_YEAR_RATIO = 11.862615;
    private static final double SATURN_YEAR_RATIO = 29.447498;
    private static final double URANUS_YEAR_RATIO = 84.016846;
    private static final double NEPTUNE_YEAR_RATIO = 164.79132;

    SpaceAge(double seconds) {
        this.seconds = seconds;
    }

    double getSeconds() {
        return seconds;
    }

    double onEarth() {
        return seconds / EARTH_YEAR_SECONDS;
    }

    double onMercury() {
        return seconds / (MERCURY_YEAR_RATIO * EARTH_YEAR_SECONDS);
    }

    double onVenus() {
        return seconds / (VENUS_YEAR_RATIO * EARTH_YEAR_SECONDS);
    }

    double onMars() {
        return seconds / (MARS_YEAR_RATIO * EARTH_YEAR_SECONDS);
    }

    double onJupiter() {
        return seconds / (JUPITER_YEAR_RATIO * EARTH_YEAR_SECONDS);
    }

    double onSaturn() {
        return seconds / (SATURN_YEAR_RATIO * EARTH_YEAR_SECONDS);
    }

    double onUranus() {
        return seconds / (URANUS_YEAR_RATIO * EARTH_YEAR_SECONDS);
    }

    double onNeptune() {
        return seconds / (NEPTUNE_YEAR_RATIO * EARTH_YEAR_SECONDS);
    }
}