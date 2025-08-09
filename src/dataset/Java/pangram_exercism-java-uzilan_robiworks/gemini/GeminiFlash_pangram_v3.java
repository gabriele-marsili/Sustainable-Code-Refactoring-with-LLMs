public class PangramChecker {

    public boolean isPangram(String input) {
        boolean[] alphabet = new boolean[26];
        int uniqueLettersFound = 0;

        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            int index = -1;

            if (c >= 'A' && c <= 'Z') {
                index = c - 'A';
            } else if (c >= 'a' && c <= 'z') {
                index = c - 'a';
            }

            if (index != -1) {
                if (!alphabet[index]) {
                    alphabet[index] = true;
                    uniqueLettersFound++;

                    if (uniqueLettersFound == 26) {
                        return true;
                    }
                }
            }
        }
        return uniqueLettersFound == 26;
    }
}