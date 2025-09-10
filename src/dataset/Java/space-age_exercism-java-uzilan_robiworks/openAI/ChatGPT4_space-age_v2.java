class SpaceAge {
    private final double spaceAge;
    private static final double EARTH_YEAR = 31557600;
    private static final double[] ORBITAL_PERIODS = {
        1.0, // Earth
        0.2408467, // Mercury
        0.61519726, // Venus
        1.8808158, // Mars
        11.862615, // Jupiter
        29.447498, // Saturn
        84.016846, // Uranus
        164.79132 // Neptune
    };

    SpaceAge(double seconds) {
        this.spaceAge = seconds;
    }

    double getSeconds() {
        return spaceAge;
    }

    double onEarth() {
        return calculateAge(0);
    }

    double onMercury() {
        return calculateAge(1);
    }

    double onVenus() {
        return calculateAge(2);
    }

    double onMars() {
        return calculateAge(3);
    }

    double onJupiter() {
        return calculateAge(4);
    }

    double onSaturn() {
        return calculateAge(5);
    }

    double onUranus() {
        return calculateAge(6);
    }

    double onNeptune() {
        return calculateAge(7);
    }

    private double calculateAge(int planetIndex) {
        return spaceAge / (ORBITAL_PERIODS[planetIndex] * EARTH_YEAR);
    }
}