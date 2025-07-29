public class BeerSong {

    public String sing(int beers, int amountTaken) {

        int finalVerse = beers - amountTaken;
        StringBuilder builder = new StringBuilder();
        
        for (; beers > finalVerse; beers--) {
            
            if (beers == 0) {
                builder.append("No more bottles of beer on the wall, no more bottles of beer.\n" + "Go to the store and buy some more, 99 bottles of beer on the wall.\n\n");
                break;
            }

            if (beers == 1) {
                builder.append("1 bottle of beer on the wall, 1 bottle of beer.\n" + "Take it down and pass it around, no more bottles of beer on the wall.\n\n");
            } else {
                builder.append(beers + " bottles of beer on the wall, " + beers + " bottles of beer.\n" +
                            "Take one down and pass it around, " + (beers-1) + (beers - 1 == 1 ? " bottle" : " bottles") + " of beer on the wall.\n\n");
            }
        }
        return builder.toString();
    }

    public String singSong() {
        return sing(99,100);
    }
}