class SpaceAge {
    private final double spaceAge;
    private static final double EARTH_YEAR = 31557600;
    private static final double MERCURY_YEAR = 0.2408467 * EARTH_YEAR;
    private static final double VENUS_YEAR = 0.61519726 * EARTH_YEAR;
    private static final double MARS_YEAR = 1.8808158 * EARTH_YEAR;
    private static final double JUPITER_YEAR = 11.862615 * EARTH_YEAR;
    private static final double SATURN_YEAR = 29.447498 * EARTH_YEAR;
    private static final double URANUS_YEAR = 84.016846 * EARTH_YEAR;
    private static final double NEPTUNE_YEAR = 164.79132 * EARTH_YEAR;

    SpaceAge(double seconds) {
        this.spaceAge = seconds;
    }

    double getSeconds() {
        return spaceAge;
    }

    double onEarth() {
        return spaceAge / EARTH_YEAR;
    }

    double onMercury() {
        return spaceAge / MERCURY_YEAR;
    }

    double onVenus() {
        return spaceAge / VENUS_YEAR;
    }

    double onMars() {
        return spaceAge / MARS_YEAR;
    }

    double onJupiter() {
        return spaceAge / JUPITER_YEAR;
    }

    double onSaturn() {
        return spaceAge / SATURN_YEAR;
    }

    double onUranus() {
        return spaceAge / URANUS_YEAR;
    }

    double onNeptune() {
        return spaceAge / NEPTUNE_YEAR;
    }
}