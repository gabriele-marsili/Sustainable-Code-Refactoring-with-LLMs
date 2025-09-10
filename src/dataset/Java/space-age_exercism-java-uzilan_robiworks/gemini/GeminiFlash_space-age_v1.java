class SpaceAge {
    private final double spaceAge;
    private static final double EARTH_YEAR_IN_SECONDS = 31557600.0;
    private static final double MERCURY_YEARS = 0.2408467;
    private static final double VENUS_YEARS = 0.61519726;
    private static final double MARS_YEARS = 1.8808158;
    private static final double JUPITER_YEARS = 11.862615;
    private static final double SATURN_YEARS = 29.447498;
    private static final double URANUS_YEARS = 84.016846;
    private static final double NEPTUNE_YEARS = 164.79132;

    SpaceAge(double seconds) {
        this.spaceAge = seconds;
    }

    double getSeconds() {
        return spaceAge;
    }

    double onEarth() {
        return spaceAge / EARTH_YEAR_IN_SECONDS;
    }

    double onMercury() {
        return spaceAge / (MERCURY_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onVenus() {
        return spaceAge / (VENUS_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onMars() {
        return spaceAge / (MARS_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onJupiter() {
        return spaceAge / (JUPITER_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onSaturn() {
        return spaceAge / (SATURN_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onUranus() {
        return spaceAge / (URANUS_YEARS * EARTH_YEAR_IN_SECONDS);
    }

    double onNeptune() {
        return spaceAge / (NEPTUNE_YEARS * EARTH_YEAR_IN_SECONDS);
    }
}