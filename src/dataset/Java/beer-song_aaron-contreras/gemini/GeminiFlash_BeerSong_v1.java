public class BeerSong {

    public String sing(int beers, int amountTaken) {
        int finalVerse = Math.max(0, beers - amountTaken);
        StringBuilder builder = new StringBuilder();

        for (; beers > finalVerse; beers--) {
            if (beers == 1) {
                builder.append("1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n\n");
            } else if (beers == 2) {
                builder.append("2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n\n");
            }
            else {
                builder.append(beers).append(" bottles of beer on the wall, ").append(beers).append(" bottles of beer.\nTake one down and pass it around, ").append(beers - 1).append(" bottles of beer on the wall.\n\n");
            }
        }

        if (finalVerse == 0 && amountTaken >= beers && beers != 0) {
             builder.append("No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n\n");
        }

        return builder.toString();
    }

    public String singSong() {
        return sing(99, 100);
    }
}