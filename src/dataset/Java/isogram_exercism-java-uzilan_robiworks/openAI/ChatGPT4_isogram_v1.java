import java.util.HashSet;

class IsogramChecker {

    boolean isIsogram(String phrase) {
        phrase = phrase.toLowerCase();
        HashSet<Character> seen = new HashSet<>();
        for (char c : phrase.toCharArray()) {
            if (c != ' ' && c != '-') {
                if (!seen.add(c)) {
                    return false;
                }
            }
        }
        return true;
    }

}