class BeerSong {

    private static final int INITIAL_BOTTLES = 99;

    public String sing(int count, int repeat) {
        StringBuilder song = new StringBuilder(repeat * 250); // Pre-allocate StringBuilder size

        for (int i = 0; i < repeat; i++) {
            if (count == 0) {
                song.append("No more bottles of beer on the wall, no more bottles of beer.\n")
                        .append("Go to the store and buy some more, ")
                        .append(INITIAL_BOTTLES).append(" bottles of beer on the wall.\n\n");
                count = INITIAL_BOTTLES;
            } else {
                song.append(bottleText(count))
                        .append(" of beer on the wall, ")
                        .append(bottleText(count))
                        .append(" of beer.\nTake ")
                        .append(count == 1 ? "it" : "one")
                        .append(" down and pass it around, ");
                count--;
                song.append(bottleText(count)).append(" of beer on the wall.\n\n");
            }
        }
        return song.toString();
    }

    public String singSong() {
        return sing(INITIAL_BOTTLES, 100);
    }

    private String bottleText(int count) {
        if (count == 0) {
            return "no more bottles";
        } else if (count == 1) {
            return "1 bottle";
        } else {
            return Integer.toString(count) + " bottles";
        }
    }
}