class BeerSong {

    private static final int INITIAL_BOTTLES = 99;
    private static final String[] BOTTLE_CACHE = new String[101];
    private static final String NO_MORE_BOTTLES = "no more bottles";
    private static final String ONE_BOTTLE = "1 bottle";
    private static final String BOTTLES_SUFFIX = " bottles";
    private static final String BEER_ON_WALL = " of beer on the wall, ";
    private static final String BEER_NEWLINE = " of beer.\n";
    private static final String TAKE_ONE = "Take one down and pass it around, ";
    private static final String TAKE_IT = "Take it down and pass it around, ";
    private static final String BEER_ON_WALL_END = " of beer on the wall.\n\n";
    private static final String NO_MORE_START = "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, ";

    static {
        BOTTLE_CACHE[0] = NO_MORE_BOTTLES;
        BOTTLE_CACHE[1] = ONE_BOTTLE;
        for (int i = 2; i <= 100; i++) {
            BOTTLE_CACHE[i] = i + BOTTLES_SUFFIX;
        }
    }

    public String sing(int count, int repeat) {
        final var song = new StringBuilder(repeat * 150);
        while (repeat-- > 0) {
            if (count == 0) {
                song.append(NO_MORE_START);
                count = INITIAL_BOTTLES;
            } else {
                String currentBottle = BOTTLE_CACHE[count];
                song.append(currentBottle).append(BEER_ON_WALL)
                    .append(currentBottle).append(BEER_NEWLINE)
                    .append(count == 1 ? TAKE_IT : TAKE_ONE);
                --count;
            }
            song.append(BOTTLE_CACHE[count]).append(BEER_ON_WALL_END);
        }
        return song.toString();
    }

    public String singSong() {
        return sing(INITIAL_BOTTLES, 100);
    }

    private String bottle(int count) {
        return BOTTLE_CACHE[count];
    }
}