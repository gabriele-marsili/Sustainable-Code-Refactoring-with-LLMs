class BeerSong {

    private static final int INITIAL_BOTTLES = 99;
    private static final String[] BOTTLE_CACHE = new String[101];
    
    static {
        BOTTLE_CACHE[0] = "no more bottles";
        BOTTLE_CACHE[1] = "1 bottle";
        for (int i = 2; i <= 100; i++) {
            BOTTLE_CACHE[i] = i + " bottles";
        }
    }

    public String sing(int count, int repeat) {
        final var song = new StringBuilder(repeat * 150);
        while (repeat-- > 0) {
            if (count == 0) {
                song.append("No more bottles of beer on the wall, no more bottles of beer.\n")
                    .append("Go to the store and buy some more, ");
                count = INITIAL_BOTTLES;
            } else {
                final String bottleStr = bottle(count);
                song.append(bottleStr).append(" of beer on the wall, ")
                    .append(bottleStr).append(" of beer.\n")
                    .append("Take ").append(count == 1 ? "it" : "one")
                    .append(" down and pass it around, ");
                --count;
            }
            song.append(bottle(count)).append(" of beer on the wall.\n\n");
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