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
        StringBuilder verse = new StringBuilder("This is ");
        for (int i = verseNumber - 1; i >= 0; i--) {
            verse.append(PHRASE[i]).append(" ");
        }
        verse.deleteCharAt(verse.length() - 1); // Remove trailing space
        verse.append(".");
        return verse.toString();
    }

    public String verses(int startVerse, int endVerse) {
        StringBuilder verses = new StringBuilder();
        for (int i = startVerse; i <= endVerse; i++) {
            verses.append(verse(i));
            if (i < endVerse) {
                verses.append(System.lineSeparator());
            }
        }
        return verses.toString();
    }

    public String sing() {
        return verses(1, 12);
    }
}