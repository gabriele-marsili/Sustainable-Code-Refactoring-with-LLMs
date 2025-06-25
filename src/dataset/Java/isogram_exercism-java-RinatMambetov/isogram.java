import java.util.HashSet;
import java.util.Set;

class IsogramChecker {
    private final Set<Character> letters;

    IsogramChecker() {
        this.letters = new HashSet<>();
    }

    boolean isIsogram(String phrase) {
        phrase = phrase.replaceAll("[ -]", "");
        phrase = phrase.toLowerCase();
        for (int i = 0; i < phrase.length(); i++) {
            letters.add(phrase.charAt(i));
        }
        return phrase.length() == letters.size();
    }
}
