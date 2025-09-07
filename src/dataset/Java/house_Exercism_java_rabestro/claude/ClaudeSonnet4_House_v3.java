import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

final class House {
    private static final String[] PHRASE = {
            "the house that Jack built",
            "the malt that lay in",
            "the rat that ate",
            "the cat that killed",
            "the dog that worried",
            "the cow with the crumpled horn that tossed",
            "the maiden all forlorn that milked",
            "the man all tattered and torn that kissed",
            "the priest all shaven and shorn that married",
            "the rooster that crowed in the morn that woke",
            "the farmer sowing his corn that kept",
            "the horse and the hound and the horn that belonged to"
    };

    private static final String[] CACHED_VERSES = new String[13];
    private static final String CACHED_FULL_SONG;

    static {
        for (int i = 1; i <= 12; i++) {
            StringBuilder sb = new StringBuilder("This is ");
            for (int j = i - 1; j >= 0; j--) {
                sb.append(PHRASE[j]);
                if (j > 0) sb.append(' ');
            }
            sb.append('.');
            CACHED_VERSES[i] = sb.toString();
        }

        StringBuilder fullSong = new StringBuilder();
        for (int i = 1; i <= 12; i++) {
            if (i > 1) fullSong.append(System.lineSeparator());
            fullSong.append(CACHED_VERSES[i]);
        }
        CACHED_FULL_SONG = fullSong.toString();
    }

    public String verse(int verseNumber) {
        return CACHED_VERSES[verseNumber];
    }

    public String verses(int startVerse, int endVerse) {
        if (startVerse == 1 && endVerse == 12) {
            return CACHED_FULL_SONG;
        }

        StringBuilder result = new StringBuilder();
        for (int i = startVerse; i <= endVerse; i++) {
            if (i > startVerse) result.append(System.lineSeparator());
            result.append(CACHED_VERSES[i]);
        }
        return result.toString();
    }

    public String sing() {
        return CACHED_FULL_SONG;
    }
}