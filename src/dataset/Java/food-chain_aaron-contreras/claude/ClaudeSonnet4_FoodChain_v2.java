public class FoodChain {

    private static final String[] INTRO_ANIMALS = {
        "spider.\nIt wriggled and jiggled and tickled inside her.\n", 
        "bird.\nHow absurd to swallow a bird!\n", 
        "cat.\nImagine that, to swallow a cat!\n", 
        "dog.\nWhat a hog, to swallow a dog!\n", 
        "goat.\nJust opened her throat and swallowed a goat!\n", 
        "cow.\nI don't know how she swallowed a cow!\n"
    };
    
    private static final String[] ANIMALS = {
        "fly",
        "spider that wriggled and jiggled and tickled inside her", 
        "bird", 
        "cat", 
        "dog", 
        "goat", 
        "cow"
    };

    private static final String FIRST_VERSE = "I know an old lady who swallowed a fly.\nI don't know why she swallowed the fly. Perhaps she'll die.";
    private static final String SECOND_VERSE = "I know an old lady who swallowed a spider.\nIt wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.";
    private static final String DEAD_VERSE = "I know an old lady who swallowed a horse.\nShe's dead, of course!";
    private static final String LAST_VERSE = "I don't know why she swallowed the fly. Perhaps she'll die.";

    public String verse(int verseNumber) {
        switch (verseNumber) {
            case 1: return FIRST_VERSE;
            case 2: return SECOND_VERSE;
            case 8: return DEAD_VERSE;
        }

        StringBuilder builder = new StringBuilder(200);
        builder.append("I know an old lady who swallowed a ").append(INTRO_ANIMALS[verseNumber-3]);
        
        for (int i = verseNumber-1; i > 1; i--) {
            builder.append("She swallowed the ").append(ANIMALS[i]).append(" to catch the ").append(ANIMALS[i-1]).append(".\n");
        }
        
        builder.append("She swallowed the spider to catch the fly.\n").append(LAST_VERSE);
        return builder.toString();
    }

    public String verses(int verseA, int verseB) {
        StringBuilder builder = new StringBuilder((verseB - verseA + 1) * 150);
        for (int i = verseA; i <= verseB; i++) {
            builder.append(verse(i));
            if (i != verseB) {
                builder.append("\n\n");
            }
        }
        return builder.toString();
    }
}