class BeerSong {

    private static final int INITIAL_BOTTLES = 99;
    private static final String NO_MORE_BOTTLES_WALL = "No more bottles of beer on the wall, no more bottles of beer.\n";
    private static final String GO_TO_STORE = "Go to the store and buy some more, ";
    private static final String OF_BEER_ON_THE_WALL = " of beer on the wall.\n";
    private static final String TAKE_DOWN = "Take ";
    private static final String IT_DOWN = "it down and pass it around, ";
    private static final String ONE_DOWN = "one down and pass it around, ";
    private static final String BOTTLES_OF_BEER = " bottles of beer.\n";
    private static final String NEW_LINE = "\n";

    public String sing(int count, int repeat) {
        StringBuilder song = new StringBuilder(repeat * 250); // Pre-allocate memory
        int currentCount = count;

        for (int i = 0; i < repeat; i++) {
            if (currentCount == 0) {
                song.append(NO_MORE_BOTTLES_WALL)
                        .append(GO_TO_STORE);
                currentCount = INITIAL_BOTTLES;
                song.append(bottle(currentCount)).append(OF_BEER_ON_THE_WALL).append(NEW_LINE);
            } else {
                String bottleString = bottle(currentCount);
                song.append(bottleString).append(" of beer on the wall, ").append(bottleString).append(BOTTLES_OF_BEER)
                        .append(TAKE_DOWN);

                if (currentCount == 1) {
                    song.append(IT_DOWN);
                } else {
                    song.append(ONE_DOWN);
                }
                currentCount--;
                song.append(bottle(currentCount)).append(OF_BEER_ON_THE_WALL).append(NEW_LINE);
            }
            if (i < repeat - 1) {
                song.append(NEW_LINE);
            }
        }
        return song.toString();
    }

    public String singSong() {
        return sing(INITIAL_BOTTLES, 100);
    }

    private String bottle(int count) {
        if (count == 0) {
            return "no more bottles";
        } else if (count == 1) {
            return "1 bottle";
        } else {
            return count + " bottles";
        }
    }
}