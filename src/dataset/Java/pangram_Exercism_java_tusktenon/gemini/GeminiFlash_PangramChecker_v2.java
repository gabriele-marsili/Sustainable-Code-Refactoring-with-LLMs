import java.util.Arrays;

public class PangramChecker {

    public boolean isPangram(String input) {
        // select an implementation
        return isPangramOptimized(input);
    }

    public boolean isPangramOptimized(String input) {
        if (input == null || input.length() < 26) {
            return false;
        }

        boolean[] alphabetPresent = new boolean[26];
        int lettersFound = 0;

        String upperCaseInput = input.toUpperCase();
        for (int i = 0; i < upperCaseInput.length(); i++) {
            char c = upperCaseInput.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                int index = c - 'A';
                if (!alphabetPresent[index]) {
                    alphabetPresent[index] = true;
                    lettersFound++;
                    if (lettersFound == 26) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}