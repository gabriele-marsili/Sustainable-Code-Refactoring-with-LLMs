class SpaceAge {
    private static final double EARTH_YEAR = 31557600.0;
    private static final double MERCURY_RATIO = 1.0 / 0.2408467;
    private static final double VENUS_RATIO = 1.0 / 0.61519726;
    private static final double MARS_RATIO = 1.0 / 1.8808158;
    private static final double JUPITER_RATIO = 1.0 / 11.862615;
    private static final double SATURN_RATIO = 1.0 / 29.447498;
    private static final double URANUS_RATIO = 1.0 / 84.016846;
    private static final double NEPTUNE_RATIO = 1.0 / 164.79132;
    
    private final double seconds;
    private final double earthAge;

    SpaceAge(double seconds) {
        this.seconds = seconds;
        this.earthAge = seconds / EARTH_YEAR;
    }

    double getSeconds() {
        return seconds;
    }

    double onEarth() {
        return earthAge;
    }

    double onMercury() {
        return earthAge * MERCURY_RATIO;
    }

    double onVenus() {
        return earthAge * VENUS_RATIO;
    }

    double onMars() {
        return earthAge * MARS_RATIO;
    }

    double onJupiter() {
        return earthAge * JUPITER_RATIO;
    }

    double onSaturn() {
        return earthAge * SATURN_RATIO;
    }

    double onUranus() {
        return earthAge * URANUS_RATIO;
    }

    double onNeptune() {
        return earthAge * NEPTUNE_RATIO;
    }
}