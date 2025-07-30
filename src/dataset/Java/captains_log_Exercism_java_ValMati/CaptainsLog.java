import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = new char[]{'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final double INITIAL_START_DATE = 41000.0;

    private final Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    char randomPlanetClass() {
        int randomIndex = random.nextInt(PLANET_CLASSES.length);

        return PLANET_CLASSES[randomIndex];
    }

    String randomShipRegistryNumber() {
        int randomNumber = 1000 + random.nextInt(9000);

        return String.format("NCC-%4d", randomNumber);
    }

    double randomStardate() {
        return INITIAL_START_DATE + random.nextDouble(1000);
    }
}
