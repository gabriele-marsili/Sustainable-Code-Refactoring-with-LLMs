class SpaceAge {
    private final double seconds;
    private static final double EARTH_YEAR_IN_SECONDS = 31557600.0;
    private static final double MERCURY_YEARS = 0.2408467;
    private static final double VENUS_YEARS = 0.61519726;
    private static final double MARS_YEARS = 1.8808158;
    private static final double JUPITER_YEARS = 11.862615;
    private static final double SATURN_YEARS = 29.447498;
    private static final double URANUS_YEARS = 84.016846;
    private static final double NEPTUNE_YEARS = 164.79132;

    SpaceAge(double seconds) {
        this.seconds = seconds;
    }

    double getSeconds() {
        return seconds;
    }

    double onEarth() {
        return seconds / EARTH_YEAR_IN_SECONDS;
    }

    double onMercury() {
        return seconds / (MERCURY_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onVenus() {
        return seconds / (VENUS_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onMars() {
        return seconds / (MARS_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onJupiter() {
        return seconds / (JUPITER_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onSaturn() {
        return seconds / (SATURN_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onUranus() {
        return seconds / (URANUS_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onNeptune() {
        return seconds / (NEPTUNE_YEARS * EARTH_YEAR_IN_SECONDS);
    }
}