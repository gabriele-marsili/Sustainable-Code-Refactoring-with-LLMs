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

    public String verse(int verseNumber) {
        StringBuilder verseBuilder = new StringBuilder("This is ");
        for (int i = verseNumber - 1; i >= 0; i--) {
            verseBuilder.append(PHRASE[i]);
            if (i > 0) {
                verseBuilder.append(" ");
            }
        }
        verseBuilder.append(".");
        return verseBuilder.toString();
    }

    public String verses(int startVerse, int endVerse) {
        StringBuilder versesBuilder = new StringBuilder();
        for (int i = startVerse; i <= endVerse; i++) {
            if (i > startVerse) {
                versesBuilder.append(System.lineSeparator());
            }
            versesBuilder.append(verse(i));
        }
        return versesBuilder.toString();
    }

    public String sing() {
        return verses(1, 12);
    }
}