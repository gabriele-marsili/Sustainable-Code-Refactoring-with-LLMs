class BeerSong {

    private static final int INITIAL_BOTTLES = 99;
    private static final String NO_MORE_BOTTLES = "no more bottles";
    private static final String ONE_BOTTLE = "1 bottle";
    private static final String BOTTLES = " bottles";
    private static final String ON_THE_WALL = " of beer on the wall";
    private static final String OF_BEER = " of beer";
    private static final String TAKE_ONE_DOWN = "Take one down and pass it around, ";
    private static final String TAKE_IT_DOWN = "Take it down and pass it around, ";
    private static final String GO_TO_STORE = "Go to the store and buy some more, ";

    public String sing(int count, int repeat) {
        StringBuilder song = new StringBuilder(repeat * 100); // Pre-allocate memory
        while (repeat-- > 0) {
            if (count == 0) {
                song.append(NO_MORE_BOTTLES).append(ON_THE_WALL).append(", ").append(NO_MORE_BOTTLES).append(OF_BEER).append(".\n")
                    .append(GO_TO_STORE).append(INITIAL_BOTTLES).append(BOTTLES).append(ON_THE_WALL).append(".\n\n");
                count = INITIAL_BOTTLES;
            } else {
                song.append(bottle(count)).append(ON_THE_WALL).append(", ").append(bottle(count)).append(OF_BEER).append(".\n")
                    .append(count == 1 ? TAKE_IT_DOWN : TAKE_ONE_DOWN)
                    .append(bottle(--count)).append(ON_THE_WALL).append(".\n\n");
            }
        }
        return song.toString();
    }

    public String singSong() {
        return sing(INITIAL_BOTTLES, 100);
    }

    private String bottle(int count) {
        return count == 0 ? NO_MORE_BOTTLES : (count == 1 ? ONE_BOTTLE : count + BOTTLES);
    }
}