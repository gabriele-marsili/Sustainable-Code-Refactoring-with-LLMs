public class FoodChain {

    private String intro = "I know an old lady who swallowed a %s";
    private String[] introAnimals = {"spider.\nIt wriggled and jiggled and tickled inside her.\n", "bird.\nHow absurd to swallow a bird!\n", "cat.\nImagine that, to swallow a cat!\n", "dog.\nWhat a hog, to swallow a dog!\n", "goat.\nJust opened her throat and swallowed a goat!\n", "cow.\nI don't know how she swallowed a cow!\n"};
    private String[] animals = {"fly","spider that wriggled and jiggled and tickled inside her", "bird", "cat", "dog", "goat", "cow"};

    private static final String FIRST_VERSE = "I know an old lady who swallowed a fly.\nI don't know why she swallowed the fly. Perhaps she'll die.";

    private static final String SECOND_VERSE = "I know an old lady who swallowed a spider.\n" +
                          "It wriggled and jiggled and tickled inside her.\n" +
                          "She swallowed the spider to catch the fly.\n" +
                          "I don't know why she swallowed the fly. Perhaps she'll die.";
    private static final String DEAD_VERSE = "I know an old lady who swallowed a horse.\nShe's dead, of course!";

    private static final String LAST_VERSE = "I don't know why she swallowed the fly. Perhaps she'll die.";

    public String verse(int verseNumber) {

        if (verseNumber == 1) return FIRST_VERSE;
        
        if (verseNumber == 2) return SECOND_VERSE;

        if (verseNumber == 8) return DEAD_VERSE;            

        StringBuilder builder = new StringBuilder();
        
        builder.append(String.format(intro, introAnimals[verseNumber-2]));
        
        for (int i = verseNumber-1; i > 0; i--) {            
            
            if (i != 1) {
                builder.append(String.format("She swallowed the %s to catch the %s.\n", animals[i], animals[i-1]));
                
            } else {
                builder.append(String.format("She swallowed the spider to catch the fly.\n"));
            }
        }
        builder.append(LAST_VERSE);
        return builder.toString();     
    }
    public String verses(int verseA, int verseB) {
        StringBuilder builder = new StringBuilder();
        for (int i = verseA; i <= verseB; i++) {
            if (i != verseB) {
                builder.append(verse(i)+"\n\n");
            } else {
                builder.append(verse(i));
            }
        }
        return builder.toString();
    }
}