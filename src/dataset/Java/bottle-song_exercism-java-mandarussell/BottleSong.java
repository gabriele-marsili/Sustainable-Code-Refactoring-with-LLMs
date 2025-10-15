class BottleSong {
    private static final String[] intWordArray = {
            "Zero",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten"
        };

    String recite(int startBottles, int takeDown) {
        String bottleString = "bottles";
        StringBuilder song = new StringBuilder();

        if (startBottles > 10) startBottles = 10;
        if (takeDown > startBottles) takeDown = startBottles;

        // Append each verse to the song
        for (int i = startBottles; i > (startBottles-takeDown); i--) {
            if (i == 1) bottleString = "bottle";

            if (i != startBottles) song.append(System.lineSeparator());

            // Append verse lines 1 and 2
            for (int j=0; j<2; j++) {
                song.append(
                     String.format(
                        "%s green %s hanging on the wall,\n",
                        intWordArray[i],
                        bottleString
                        )
                    );
            }

            // Append verse line 3
            song.append("And if one green bottle should accidentally fall,\n");

            // Append final line of verse
            if (i == 1) {
                song.append("There'll be no green bottles hanging on the wall.\n");
            } else if (i == 2) {
                song.append("There'll be one green bottle hanging on the wall.\n");
            } else {
                song.append(
                    String.format(
                        "There'll be %s green bottles hanging on the wall.\n",
                        intWordArray[i-1].toLowerCase()
                        )
                    );
            }
        } 

        return song.toString();
    }
}