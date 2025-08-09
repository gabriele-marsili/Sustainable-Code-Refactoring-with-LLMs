public class PangramChecker {

    public boolean isPangram(String input) {
        boolean[] alphabetPresent = new boolean[26];
        int uniqueLetterCount = 0;

        for (int i = 0; i < input.length(); i++) {
            char currentChar = input.charAt(i);
            int index = -1;

            if (currentChar >= 'A' && currentChar <= 'Z') {
                index = currentChar - 'A';
            } else if (currentChar >= 'a' && currentChar <= 'z') {
                index = currentChar - 'a';
            }

            if (index != -1) {
                if (!alphabetPresent[index]) {
                    alphabetPresent[index] = true;
                    uniqueLetterCount++;
                }
            }

            if (uniqueLetterCount == 26) {
                return true;
            }
        }

        return uniqueLetterCount == 26;
    }
}