class BeerSong {

    private static final int INITIAL_BOTTLES = 99;
    private static final String NO_MORE_BOTTLES = "no more bottles";
    private static final String ONE_BOTTLE = "1 bottle";

    public String sing(int count, int repeat) {
        StringBuilder song = new StringBuilder();
        while (repeat-- > 0) {
            if (count == 0) {
                song.append("No more bottles of beer on the wall, no more bottles of beer.\n")
                    .append("Go to the store and buy some more, ")
                    .append(INITIAL_BOTTLES).append(" bottles of beer on the wall.\n\n");
                count = INITIAL_BOTTLES;
            } else {
                String currentBottle = bottle(count);
                String nextBottle = bottle(count - 1);
                song.append(currentBottle).append(" of beer on the wall, ")
                    .append(currentBottle).append(" of beer.\n")
                    .append("Take ").append(count == 1 ? "it" : "one")
                    .append(" down and pass it around, ")
                    .append(nextBottle).append(" of beer on the wall.\n\n");
                count--;
            }
        }
        return song.toString();
    }

    public String singSong() {
        return sing(INITIAL_BOTTLES, 100);
    }

    private String bottle(int count) {
        if (count == 0) return NO_MORE_BOTTLES;
        if (count == 1) return ONE_BOTTLE;
        return count + " bottles";
    }
}