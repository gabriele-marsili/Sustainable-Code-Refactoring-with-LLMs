import java.util.concurrent.ThreadLocalRandom;

class CaptainsLog {

    private static final char[] PLANET_CLASSES = {'D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'};
    private static final double INITIAL_START_DATE = 41000.0;

    char randomPlanetClass() {
        return PLANET_CLASSES[ThreadLocalRandom.current().nextInt(PLANET_CLASSES.length)];
    }

    String randomShipRegistryNumber() {
        return "NCC-" + (1000 + ThreadLocalRandom.current().nextInt(9000));
    }

    double randomStardate() {
        return INITIAL_START_DATE + ThreadLocalRandom.current().nextDouble(1000);
    }
}