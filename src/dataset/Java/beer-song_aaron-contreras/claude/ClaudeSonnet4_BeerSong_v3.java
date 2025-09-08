public class BeerSong {

    public String sing(int beers, int amountTaken) {
        int finalVerse = beers - amountTaken;
        if (beers <= finalVerse) {
            return "";
        }
        
        StringBuilder builder = new StringBuilder((beers - finalVerse) * 120);
        
        while (beers > finalVerse) {
            if (beers == 0) {
                builder.append("No more bottles of beer on the wall, no more bottles of beer.\n")
                       .append("Go to the store and buy some more, 99 bottles of beer on the wall.\n\n");
                break;
            }
            
            if (beers == 1) {
                builder.append("1 bottle of beer on the wall, 1 bottle of beer.\n")
                       .append("Take it down and pass it around, no more bottles of beer on the wall.\n\n");
            } else {
                int nextBeers = beers - 1;
                String bottleWord = nextBeers == 1 ? " bottle" : " bottles";
                builder.append(beers).append(" bottles of beer on the wall, ")
                       .append(beers).append(" bottles of beer.\n")
                       .append("Take one down and pass it around, ")
                       .append(nextBeers).append(bottleWord)
                       .append(" of beer on the wall.\n\n");
            }
            beers--;
        }
        
        return builder.toString();
    }

    public String singSong() {
        return sing(99, 100);
    }
}