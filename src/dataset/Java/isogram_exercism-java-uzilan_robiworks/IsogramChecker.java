import java.util.Arrays;

class IsogramChecker {

    boolean isIsogram(String phrase) {
        phrase = phrase.toLowerCase();
        int len = phrase.length();
        char[] input = phrase.toCharArray();
        Arrays.sort(input);
        for (int i = 0; i < len - 1; i++) {
            if (input[i] == input[i + 1] && input[i] != ' ' && input[i] != '-') {
                return false;
            }
        }
        return true;
    }

}
