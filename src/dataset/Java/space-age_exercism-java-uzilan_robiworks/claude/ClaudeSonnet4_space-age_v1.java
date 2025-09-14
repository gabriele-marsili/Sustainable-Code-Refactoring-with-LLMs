class SpaceAge {
    private final double spaceAge;
    private static final double EARTH_YEAR = 31557600.0;
    private static final double MERCURY_FACTOR = 1.0 / (0.2408467 * EARTH_YEAR);
    private static final double VENUS_FACTOR = 1.0 / (0.61519726 * EARTH_YEAR);
    private static final double EARTH_FACTOR = 1.0 / EARTH_YEAR;
    private static final double MARS_FACTOR = 1.0 / (1.8808158 * EARTH_YEAR);
    private static final double JUPITER_FACTOR = 1.0 / (11.862615 * EARTH_YEAR);
    private static final double SATURN_FACTOR = 1.0 / (29.447498 * EARTH_YEAR);
    private static final double URANUS_FACTOR = 1.0 / (84.016846 * EARTH_YEAR);
    private static final double NEPTUNE_FACTOR = 1.0 / (164.79132 * EARTH_YEAR);

    SpaceAge(double seconds) {
        this.spaceAge = seconds;
    }

    double getSeconds() {
        return spaceAge;
    }

    double onEarth() {
        return spaceAge * EARTH_FACTOR;
    }

    double onMercury() {
        return spaceAge * MERCURY_FACTOR;
    }

    double onVenus() {
        return spaceAge * VENUS_FACTOR;
    }

    double onMars() {
        return spaceAge * MARS_FACTOR;
    }

    double onJupiter() {
        return spaceAge * JUPITER_FACTOR;
    }

    double onSaturn() {
        return spaceAge * SATURN_FACTOR;
    }

    double onUranus() {
        return spaceAge * URANUS_FACTOR;
    }

    double onNeptune() {
        return spaceAge * NEPTUNE_FACTOR;
    }
}