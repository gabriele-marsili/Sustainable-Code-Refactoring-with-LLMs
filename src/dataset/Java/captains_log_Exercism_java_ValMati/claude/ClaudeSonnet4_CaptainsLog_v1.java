import java.util.Random;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final double INITIAL_START_DATE = 41000.0;
    private static final int MIN_SHIP_NUMBER = 1000;
    private static final int SHIP_NUMBER_RANGE = 9000;
    private static final int STARDATE_RANGE = 1000;

    private final Random random;

    CaptainsLog(Random random) {
        this.random = random;
    }

    char randomPlanetClass() {
        return PLANET_CLASSES[random.nextInt(PLANET_CLASSES.length)];
    }

    String randomShipRegistryNumber() {
        int randomNumber = MIN_SHIP_NUMBER + random.nextInt(SHIP_NUMBER_RANGE);
        return "NCC-" + randomNumber;
    }

    double randomStardate() {
        return INITIAL_START_DATE + random.nextDouble() * STARDATE_RANGE;
    }
}