public class BeerSong {

    public String sing(int beers, int amountTaken) {
        int finalVerse = Math.max(beers - amountTaken, 0);
        StringBuilder builder = new StringBuilder();

        while (beers > finalVerse) {
            if (beers == 1) {
                builder.append("1 bottle of beer on the wall, 1 bottle of beer.\n")
                       .append("Take it down and pass it around, no more bottles of beer on the wall.\n\n");
            } else {
                builder.append(beers).append(" bottles of beer on the wall, ").append(beers).append(" bottles of beer.\n")
                       .append("Take one down and pass it around, ").append(beers - 1)
                       .append(beers - 1 == 1 ? " bottle" : " bottles").append(" of beer on the wall.\n\n");
            }
            beers--;
        }

        if (finalVerse == 0) {
            builder.append("No more bottles of beer on the wall, no more bottles of beer.\n")
                   .append("Go to the store and buy some more, 99 bottles of beer on the wall.\n\n");
        }

        return builder.toString();
    }

    public String singSong() {
        return sing(99, 99);
    }
}