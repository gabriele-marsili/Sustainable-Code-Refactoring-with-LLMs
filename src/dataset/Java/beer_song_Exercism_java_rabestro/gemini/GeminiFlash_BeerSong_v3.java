class BeerSong {

    private static final int INITIAL_BOTTLES = 99;
    private static final String NO_MORE_BOTTLES = "no more bottles";
    private static final String ONE_BOTTLE = "1 bottle";
    private static final String OF_BEER_ON_THE_WALL = " of beer on the wall";
    private static final String OF_BEER = " of beer";
    private static final String GO_TO_THE_STORE = "Go to the store and buy some more, ";
    private static final String TAKE_DOWN = "Take ";
    private static final String IT = "it";
    private static final String ONE = "one";
    private static final String DOWN_AND_PASS = " down and pass it around, ";
    private static final String NEW_LINE = "\n";
    private static final String COMMA = ", ";
    private static final String PERIOD = ".";
    private static final String DOUBLE_NEW_LINE = "\n\n";

    public String sing(int count, int repeat) {
        StringBuilder song = new StringBuilder(repeat * 250); // Pre-allocate StringBuilder size
        int currentCount = count;

        for (int i = 0; i < repeat; i++) {
            if (currentCount == 0) {
                song.append(NO_MORE_BOTTLES).append(OF_BEER_ON_THE_WALL).append(COMMA).append(NO_MORE_BOTTLES).append(OF_BEER).append(PERIOD).append(NEW_LINE)
                        .append(GO_TO_THE_STORE);
                currentCount = INITIAL_BOTTLES;
            } else {
                String bottleString = bottle(currentCount);
                song.append(bottleString).append(OF_BEER_ON_THE_WALL).append(COMMA).append(bottleString).append(OF_BEER).append(PERIOD).append(NEW_LINE)
                        .append(TAKE_DOWN).append(currentCount == 1 ? IT : ONE)
                        .append(DOWN_AND_PASS);
                currentCount--;
            }
            song.append(bottle(currentCount)).append(OF_BEER_ON_THE_WALL).append(PERIOD).append(DOUBLE_NEW_LINE);
        }
        return song.toString();
    }

    public String singSong() {
        return sing(INITIAL_BOTTLES, 100);
    }

    private String bottle(int count) {
        if (count == 0) {
            return NO_MORE_BOTTLES;
        } else if (count == 1) {
            return ONE_BOTTLE;
        } else {
            return count + " bottles";
        }
    }
}