class BeerSong {

    private static final int INITIAL_BOTTLES = 99;
    private static final String NO_MORE_BOTTLES = "no more bottles";
    private static final String BOTTLE = " bottle";
    private static final String BOTTLES = " bottles";
    private static final String OF_BEER_ON_THE_WALL = " of beer on the wall";
    private static final String OF_BEER = " of beer";
    private static final String GO_TO_THE_STORE = "Go to the store and buy some more, ";
    private static final String TAKE_ONE_DOWN = "Take one down and pass it around, ";
    private static final String TAKE_IT_DOWN = "Take it down and pass it around, ";
    private static final String NEW_LINE = "\n";
    private static final String DOUBLE_NEW_LINE = "\n\n";

    public String sing(int count, int repeat) {
        StringBuilder song = new StringBuilder(repeat * 250); // Pre-allocate buffer size
        int currentCount = count;

        for (int i = 0; i < repeat; i++) {
            if (currentCount == 0) {
                song.append(NO_MORE_BOTTLES).append(OF_BEER_ON_THE_WALL).append(", ").append(NO_MORE_BOTTLES).append(OF_BEER).append(".").append(NEW_LINE);
                song.append(GO_TO_THE_STORE);
                currentCount = INITIAL_BOTTLES;
            } else {
                song.append(bottle(currentCount)).append(OF_BEER_ON_THE_WALL).append(", ").append(bottle(currentCount)).append(OF_BEER).append(".").append(NEW_LINE);
                song.append(currentCount == 1 ? TAKE_IT_DOWN : TAKE_ONE_DOWN);
                currentCount--;
            }
            song.append(bottle(currentCount)).append(OF_BEER_ON_THE_WALL).append(".").append(DOUBLE_NEW_LINE);
        }
        return song.toString();
    }

    public String singSong() {
        return sing(INITIAL_BOTTLES, 100);
    }

    private String bottle(int count) {
        if (count == 0) {
            return NO_MORE_BOTTLES;
        }
        if (count == 1) {
            return "1" + BOTTLE;
        }
        return count + BOTTLES;
    }
}