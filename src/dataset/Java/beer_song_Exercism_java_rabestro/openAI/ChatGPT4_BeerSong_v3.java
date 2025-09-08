class BeerSong {

    private static final int INITIAL_BOTTLES = 99;
    private static final String NO_MORE_BOTTLES = "no more bottles";
    private static final String ONE_BOTTLE = "1 bottle";

    public String sing(int count, int repeat) {
        StringBuilder song = new StringBuilder(repeat * 100); // Pre-allocate capacity
        while (repeat-- > 0) {
            if (count == 0) {
                song.append("No more bottles of beer on the wall, no more bottles of beer.\n")
                    .append("Go to the store and buy some more, ")
                    .append(INITIAL_BOTTLES).append(" bottles of beer on the wall.\n\n");
                count = INITIAL_BOTTLES;
            } else {
                song.append(bottle(count)).append(" of beer on the wall, ")
                    .append(bottle(count)).append(" of beer.\n")
                    .append("Take ").append(count == 1 ? "it" : "one")
                    .append(" down and pass it around, ")
                    .append(bottle(--count)).append(" of beer on the wall.\n\n");
            }
        }
        return song.toString();
    }

    public String singSong() {
        return sing(INITIAL_BOTTLES, 100);
    }

    private String bottle(int count) {
        return count == 0 ? NO_MORE_BOTTLES : (count == 1 ? ONE_BOTTLE : count + " bottles");
    }
}